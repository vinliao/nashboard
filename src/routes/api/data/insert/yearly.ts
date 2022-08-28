import _ from 'underscore';
import WebSocket from 'ws';
import { relayList } from '$lib/relays';

const unixTime = Math.floor(Date.now() / 1000);
const unixTimeMinux1yr = Math.floor(unixTime - 60 * 60 * 24 * 30 * 12);

export async function get() {
  let events = [];
  relayList.forEach((relay, relayIndex) => {
    const ws = new WebSocket(relay.name);

    ws.on('error', (error) => {
      // do nothing
      // console.log(error);
    });

    ws.on('open', function open() {
      ws.send(JSON.stringify(["REQ", "foobar", { since: unixTimeMinux1yr }]));
    });

    ws.on('message', function message(data) {
      if (data.toString() != 'PING') {
        const payload = JSON.parse(data.toString());

        // ["EVENT", <sub name>, event]
        let event = payload[2];

        // sometimes event returns undefined...
        if (event) {
          if (event.created_at < Date.now() / 1000 && event.content != "") {
            events.push({ id: event.id, created_at: event.created_at });
          }
        }
      }
    });
  });

  await new Promise(r => setTimeout(r, 120000));

  // duplicate events don't count
  events = _.uniq(events, (event) => event.id);
  events = events.filter(event => event.created_at > unixTimeMinux1yr && event.created_at < unixTime);

  for (let i = 0; i < 12; i++) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const fromTimestamp = Math.floor(currentTimestamp - 60 * 60 * 24 * 30 * (i + 1));
    const toTimestamp = Math.floor(currentTimestamp - 60 * 60 * 24 * 30 * i);

    // if timestamp is in a range of a particular day,
    // squash it to the timestamp at the start of the day
    for (let j = 0; j < events.length; j++) {
      if (events[j].created_at > fromTimestamp && events[j].created_at < toTimestamp) {
        events[j].created_at = fromTimestamp;
      }
    }
  }

  const yearlyData = _.countBy(events, "created_at");
  const yearlyDataRaw = JSON.stringify(yearlyData);
  const upstashBearer = import.meta.env.VITE_UPSTASH_BEARER;
  await fetch("https://global-fond-mastiff-31218.upstash.io/set/yearly_data", {
    headers: {
      Authorization: `Bearer ${upstashBearer}`
    },
    body: yearlyDataRaw,
    method: 'POST',
  });

  return { body: { status: 200 } };
}