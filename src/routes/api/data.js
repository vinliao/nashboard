import _ from 'underscore';
import WebSocket from 'ws';

const unixTime = Math.floor(Date.now() / 1000);
const unixTimeMinus24h = unixTime - 60 * 60 * 24;

/*
Note: if you'd like to add your relay, please add the alias too!
*/
const relays = [
  "wss://nostr-pub.wellorder.net",
  "wss://relayer.fiatjaf.com",
  "wss://nostr.rocks",
  "wss://rsslay.fiatjaf.com",
  "wss://freedom-relay.herokuapp.com/ws",
  "wss://nostr-relay.freeberty.net",
  "wss://nostr.bitcoiner.social",
  "wss://nostr-relay.wlvs.space",
  "wss://nostr.onsats.org",
  "wss://nostr-relay.untethr.me",
  "wss://nostr-verified.wellorder.net",
  "wss://nostr.drss.io",
  "wss://nostr.unknown.place",
  "wss://relay.damus.io",
  "wss://nostr.openchain.fr",
  "wss://nostr.delo.software",
  "wss://relay.minds.com/nostr/v1/ws",
  "wss://nostr.oxtr.dev",
  "wss://moonbreeze.richardbondi.net/ws"
];
const relayAlias = [
  "wellorder pub",
  "fiatjaf relay",
  "nostr rocks",
  "rsslay fiatjaf",
  "freedom relay",
  "freeberty",
  "bitcoiner social",
  "wlvs space",
  "onsats",
  "untethr",
  "wellorder verified",
  "drrs",
  "unknown place",
  "damus",
  "openchain",
  "delo",
  "minds",
  "oxtr",
  "richardbondi"
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
  await new Promise(r => setTimeout(r, 2200));

  const uniqueEvents = _.uniq(events, (event) => event.id);
  const sortedEvents = _.sortBy(uniqueEvents, "created_at");
  const latestEvents = sortedEvents.reverse().slice(0, 20);
  const kindsList = _.countBy(events, "kind");
  const relayList = _.countBy(events, "relay");
  const pubkeyCount = _.countBy(events, "pubkey");
  const uniquePubkeys = Object.keys(pubkeyCount).length;

  let whereArray = [];
  for (let i = 0; i < latestEvents.length; i++) {
    const currentId = _.filter(events, (event) => event.id == latestEvents[i].id);
    let currentRelays = [];
    for (let j = 0; j < currentId.length; j++) {
      for (let k = 0; k < relays.length; k++) {
        const currentRelay = currentId[j].relay;
        if (currentRelay == relays[k]) currentRelays.push(relayAlias[k]);
      }
    }
    whereArray.push([latestEvents[i].id, currentRelays]);
  }

  // count peak event in utc
  const eventsUTC = events.map(event => {
    const eventDate = new Date(event.created_at * 1000);
    return eventDate.getUTCHours();
  });

  const UTCList = _.countBy(eventsUTC);

  return { body: { utc: UTCList, uniquePubkeys: uniquePubkeys, kinds: kindsList, relays: relayList, eventCount: events.length, events: latestEvents, where: whereArray } };
}