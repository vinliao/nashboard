export const unixTime = Math.floor(Date.now() / 1000);
export const unixTimeMinus24h = unixTime - 60 * 60 * 24;
export const unixTimeMinus1h = unixTime - 60 * 60;

// taken from github.com/fiatjaf/nostr-relay-registry
export const relays = [
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