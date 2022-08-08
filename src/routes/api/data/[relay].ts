import _, { where } from 'underscore';
import WebSocket from 'ws';
import { relays, relayAliases } from '$lib/relays';

const unixTime = Math.floor(Date.now() / 1000);
const unixTimeMinus24h = unixTime - 60 * 60 * 24;

/*
Note: if you'd like to add your relay, please add the alias too!
*/
// const relays = [
//   "wss://relay.minds.com/nostr/v1/ws",
// ];
// const relayAlias = [
//   "drss",
// ];

export async function get({ params }) {
  let relay: string;
  let relayAlias = params.relay;

  for (let i = 0; i < relayAliases.length; i++) {
    if (relayAliases[i] == relayAlias) relay = relays[i];
  }

  // if no such alias
  if (!relay) return { body: { events: [] } };

  let events = [];
  const ws = new WebSocket(relay);

  ws.on('error', (error) => {
    // do nothing
    // console.log(error);
  });

  ws.on('open', function open() {
    ws.send(JSON.stringify(["REQ", "foobar", { since: unixTimeMinus24h }]));
  });

  ws.on('message', function message(data) {
    if (data.toString() != 'PING') {
      const payload = JSON.parse(data.toString());

      // ["EVENT", <sub name>, event]
      let event = payload[2];

      // sometimes event returns undefined...
      if (event) {
        if (event.created_at < Date.now() / 1000 && event.content != "") {
          event.relay = relay;
          events.push(event);
        }
      }
    }
  });

  // // wait the events to collect first
  await new Promise(r => setTimeout(r, 2200));

  const uniqueEvents = _.uniq(events, (event) => event.id);
  const sortedEvents = _.sortBy(uniqueEvents, "created_at");
  const latestEvents = sortedEvents.reverse();
  const kindsList = _.countBy(events, "kind");
  const relayList = _.countBy(events, "relay");
  const pubkeyCount = _.countBy(events, "pubkey");
  const uniquePubkeys = Object.keys(pubkeyCount).length;

  let whereArray = [];
  for (let i = 0; i < latestEvents.length; i++) {
    whereArray.push([latestEvents[i].id, relayAlias]);
  }

  // count peak event in utc
  const eventsUTC = events.map(event => {
    const eventDate = new Date(event.created_at * 1000);
    return eventDate.getUTCHours();
  });

  const UTCList = _.countBy(eventsUTC);

  return { body: { utc: UTCList, uniquePubkeys: uniquePubkeys, kinds: kindsList, relays: relayList, eventCount: events.length, events: latestEvents, where: whereArray, relay: relay } };
}