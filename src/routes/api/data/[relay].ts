import _ from 'underscore';
import WebSocket from 'ws';
import { relayList } from '$lib/relays';

const unixTime = Math.floor(Date.now() / 1000);
const unixTimeMinus24h = unixTime - 60 * 60 * 24;

interface EventInterface {
  id: string,
  pubkey: string,
  created_at: number,
  kind: number,
  tags: [[string, string]?],
  content: string,
  sig: string;
  relay: { name: string, alias: string; },
}

export async function get({ params }) {
  let relayName: string;
  let relayAlias: string = params.relay;

  // for (let i = 0; i < relayList.length; i++) {
  //   if (relayAliases[i] == relayAlias) relay = relays[i];
  // }

  relayList.forEach(relay => {
    if (relay.alias == relayAlias) relayName = relay.name;
  });

  // if alias doesn't exist, return error page (empty array)
  if (!relayName) return { body: { events: [] } };

  let events = [];
  const ws = new WebSocket(relayName);

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
          event.relay = { name: relayName, alias: relayAlias };
          events.push(event);
        }
      }
    }
  });

  // wait the events to collect first
  await new Promise(r => setTimeout(r, 2200));

  const uniqueEvents: EventInterface[] = _.uniq(events, (event) => event.id);
  const latestEvents: EventInterface[] = _.sortBy(uniqueEvents, "created_at").reverse();
  const kindsList: { [kind: string]: number; } = _.countBy(events, "kind");
  const uniquePubkeys: number = _.uniq(events, (event) => event.pubkey).length;

  const eventsUTC: number[] = events.map(event => {
    const eventDate = new Date(event.created_at * 1000);
    return eventDate.getUTCHours();
  });

  // key: utc, value: the count of event in that time
  const UTCList: { [utc: string]: number; } = _.countBy(eventsUTC);

  return { body: { utc: UTCList, uniquePubkeys: uniquePubkeys, kinds: kindsList, eventCount: events.length, events: latestEvents, where: [], relayName: relayName } };
}