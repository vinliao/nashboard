import _ from 'underscore';
import WebSocket from 'ws';

const unixTime = Math.floor(Date.now() / 1000);
const unixTimeMinus24h = unixTime - 60 * 60 * 24;
const unixTimeMinus1h = unixTime - 60 * 60;
const relays = [
  "wss://nostr-pub.wellorder.net",
  // "wss://relayer.fiatjaf.com",
  // "wss://nostr.rocks",
  // "wss://rsslay.fiatjaf.com",
  // "wss://freedom-relay.herokuapp.com/ws",
  // "wss://nostr-relay.freeberty.net",
  // "wss://nostr.bitcoiner.social",
  // "wss://nostr-relay.wlvs.space",
  // "wss://nostr.onsats.org",
  // "wss://nostr-relay.untethr.me",
  // "wss://nostr-verified.wellorder.net",
  // "wss://nostr.drss.io",
  // "wss://nostr.unknown.place",
  // "wss://relay.damus.io",
  // "wss://nostr.openchain.fr",
  "wss://nostr.delo.software",
  "wss://relay.minds.com/nostr/v1/ws"
];

export async function get() {
  let events = [];

  relays.forEach((relay, relayIndex) => {
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
            event.relay = relays[relayIndex];
            events.push(event);
          }
        }
      }
    });

  });

  // wait the events to collect first
  await new Promise(r => setTimeout(r, 2000));

  const uniqueEvents = _.uniq(events, (event) => event.created_at);
  const sortedEvents = _.sortBy(uniqueEvents, "created_at");
  const latestEvents = sortedEvents.reverse().slice(0, 20);
  const events1h = events.filter(event => event.created_at > unixTimeMinus1h);
  const kindsList = _.countBy(events, "kind");
  const relayList = _.countBy(events, "relay");

  // count peak event in utc
  const eventsUTC = events.map(event => {
    const eventDate = new Date(event.created_at * 1000);
    return eventDate.getUTCHours();
  });

  const UTCList = _.countBy(eventsUTC);

  return { body: { utc: UTCList, kinds: kindsList, relays: relayList, count24h: events.length, count1h: events1h.length, events: latestEvents } };
}