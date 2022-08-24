// /*
// Note: if you'd like to add your relay, please add the alias too!
// use short alias, replace space with a dot `.`
// */

interface RelayInterface {
  name: string,
  alias: string,
}

export const relayList: RelayInterface[] = [
  { name: "wss://nostr-pub.wellorder.net", alias: 'wellorder' },
  { name: "wss://relayer.fiatjaf.com", alias: 'fiatjaf' },
  { name: "wss://nostr.rocks", alias: 'nostr.rocks' },
  { name: "wss://rsslay.fiatjaf.com", alias: 'rsslay' },
  { name: "wss://freedom-relay.herokuapp.com/ws", alias: 'freedom.relay' },
  { name: "wss://nostr-relay.freeberty.net", alias: 'freeberty' },
  { name: "wss://nostr.bitcoiner.social", alias: 'bitcoiner.social' },
  { name: "wss://nostr-relay.wlvs.space", alias: 'wlvs.space' },
  { name: "wss://nostr.onsats.org", alias: 'onsats' },
  { name: "wss://nostr-relay.untethr.me", alias: 'untethr' },
  { name: "wss://nostr.drss.io", alias: 'drss' },
  { name: "wss://nostr.unknown.place", alias: 'unknown.place' },
  { name: "wss://relay.damus.io", alias: 'damus' },
  { name: "wss://nostr.openchain.fr", alias: 'openchain' },
  { name: "wss://nostr.delo.software", alias: 'delo' },
  { name: "wss://relay.minds.com/nostr/v1/ws", alias: 'minds' },
  { name: "wss://nostr.oxtr.dev", alias: 'oxtr' },
  { name: "wss://moonbreeze.richardbondi.net/ws", alias: 'richardbondi' },
  { name: "wss://nostr.semisol.dev", alias: 'semisol' },
  { name: "wss://nostr-pub.semisol.dev", alias: 'semisol.pub' },
  { name: "wss://nostr.ddns.net", alias: 'nostr.ddns.net' }
];
