import Redis from 'ioredis';
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

interface WhereInterface {
  id: string,
  existsIn: string[];
}

export async function get() {
  let events = [];

  relayList.forEach((relay) => {
    const ws = new WebSocket(relay.name);

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
  });

  // wait the events to collect first
  await new Promise(r => setTimeout(r, 5000));

  const uniqueEvents: EventInterface[] = _.uniq(events, (event) => event.id);
  const latestEvents: EventInterface[] = _.sortBy(uniqueEvents, "created_at").reverse().slice(0, 30); // 30 is longListAmount
  const kindsList: { [kind: string]: number; } = _.countBy(events, "kind");
  const relayCount: { [kind: string]: number; } = _.countBy(events, (event) => event.relay.name);
  const uniquePubkeys: number = _.uniq(events, (event) => event.pubkey).length;

  let whereArray: WhereInterface[] = [];
  latestEvents.forEach(latestEvent => {
    const currentId: EventInterface[] = _.filter(events, (event) => latestEvent.id == event.id);
    let currentRelays: string[] = [];

    for (let j = 0; j < currentId.length; j++) {
      const currentRelay: { name: string, alias: string; } = currentId[j].relay;
      currentRelays.push(currentRelay.alias);
    }

    whereArray.push({ id: latestEvent.id, existsIn: currentRelays });
  });

  const eventsUTC: number[] = events.map(event => {
    const eventDate = new Date(event.created_at * 1000);
    return eventDate.getUTCHours();
  });

  // key: utc, value: the count of event in that time
  const UTCList: { [utc: string]: number; } = _.countBy(eventsUTC);

  const body = { utc: UTCList, uniquePubkeys: uniquePubkeys, kinds: kindsList, relays: relayCount, eventCount: events.length, events: latestEvents, where: whereArray };
  const rawData = JSON.stringify(body);

  const upstashUrl = import.meta.env.VITE_UPSTASH_URL;
  let client = new Redis(upstashUrl);
  client.set('event_body', rawData);

  // returns the whole data so TweetList doesn't 
  // have to send get request to redis again
  return { body: { status: 200, body } };
}