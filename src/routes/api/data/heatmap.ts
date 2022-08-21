import _ from 'underscore';
import WebSocket from 'ws';
import { relayList } from '$lib/relays';

const unixTime = Math.floor(Date.now() / 1000);
const unixTimeMinus6mo = Math.floor(unixTime - 60 * 60 * 24 * 365 / 2);

export async function get() {

  // tl;dr
  // 1. take all events from the past six months
  // 2. "squash" the timestamp
  // 3. use _.countBy to count the timestamps

  // there may be implementation error in this (i think it's likely)
  // take the data with a grain of salt

  let events = [];
  relayList.forEach((relay, relayIndex) => {
    const ws = new WebSocket(relay.name);

    ws.on('error', (error) => {
      // do nothing
      // console.log(error);
    });

    ws.on('open', function open() {
      ws.send(JSON.stringify(["REQ", "foobar", { since: unixTimeMinus6mo }]));
    });

    ws.on('message', function message(data) {
      if (data.toString() != 'PING') {
        const payload = JSON.parse(data.toString());

        // ["EVENT", <sub name>, event]
        let event = payload[2];

        // sometimes event returns undefined...
        if (event) {
          if (event.created_at < Date.now() / 1000 && event.content != "") {
            event.relay = relay
            events.push(event);
          }
        }
      }
    });
  });

  await new Promise(r => setTimeout(r, 10000));

  // duplicate events don't count
  events = _.uniq(events, (event) => event.id);

  for (let i = 0; i < Math.floor(365 / 2); i++) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const fromTimestamp = Math.floor(currentTimestamp - 60 * 60 * 24 * (i + 1));
    const toTimestamp = Math.floor(currentTimestamp - 60 * 60 * 24 * i);

    // if timestamp is in a range of a particular day,
    // squash it to the timestamp at the start of the day
    for (let j = 0; j < events.length; j++) {
      if (events[j].created_at > fromTimestamp && events[j].created_at < toTimestamp) {
        events[j].created_at = fromTimestamp;
      }
    }
  }

  const heatmapData = _.countBy(events, "created_at");

  // to get heatmap data, send a GET request to /api/data/heatmap
  return { body: { "length": events.length, 'heatmap': heatmapData } };
}