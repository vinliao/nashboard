import WebSocket from 'ws';
const ws = new WebSocket('wss://nostr-pub.wellorder.net');

const unixTime = Math.floor(Date.now() / 1000);
const unixTimeMinus24h = unixTime - 60 * 60 * 24;
const unixTimeMinus1h = unixTime - 60 * 60;
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
];

export async function get() {
  let events = [];

  // index of array represents "kind"
  // last index is kind "others"
  let kindArr = [0, 0, 0, 0, 0, 0];

  relays.forEach(relay => {
    const ws = new WebSocket(relay);

    ws.on('open', function open() {
      ws.send(JSON.stringify(["REQ", "foobar", { since: unixTimeMinus24h }]));
    });

    ws.on('message', function message(data) {
      if (data.toString() != 'PING') {
        const payload = JSON.parse(data.toString());

        // ["EVENT", <sub name>, event]
        const event = payload[2];

        events.push(event);

        // count kinds
        // also use filter() to do this
        if (event.kind == "0") kindArr[0]++;
        else if (event.kind == "1") kindArr[1]++;
        else if (event.kind == "2") kindArr[2]++;
        else if (event.kind == "3") kindArr[3]++;
        else if (event.kind == "4") kindArr[4]++;
        else kindArr[5]++;
      }
    });

  });

  // wait the events to collect first
  await new Promise(r => setTimeout(r, 2000));

  const latestEvents = events.reverse().slice(0, 20);
  const events1h = events.filter(event => event.created_at > unixTimeMinus1h)

  return { body: { hello: 'world', count24h: events.length, count1h: events1h.length, kinds: kindArr, events: latestEvents } }
}