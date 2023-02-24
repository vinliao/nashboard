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
  { name: "wss://offchain.pub", alias: 'offchain.pub' },
  { name: "wss://nostr-relay.wlvs.space", alias: 'wlvs.space' },
  { name: "wss://nostr.onsats.org", alias: 'onsats' },
  { name: "wss://nostr-relay.untethr.me", alias: 'untethr' },
  { name: "wss://nostr.drss.io", alias: 'drss' },
  { name: "wss://nostr.unknown.place", alias: 'unknown.place' },
  { name: "wss://relay.damus.io", alias: 'damus' },
  { name: "wss://nostr.openchain.fr", alias: 'openchain' },
  { name: "wss://nostr.inosta.cc", alias: 'inosta' },
  { name: "wss://nostr.delo.software", alias: 'delo' },
  { name: "wss://relay.minds.com/nostr/v1/ws", alias: 'minds' },
  { name: "wss://nostr.oxtr.dev", alias: 'oxtr' },
  { name: "wss://moonbreeze.richardbondi.net/ws", alias: 'richardbondi' },
  { name: "wss://nostr.semisol.dev", alias: 'semisol' },
  { name: "wss://atlas.nostr.land", alias: 'atlas.nostr.land' },
  { name: "wss://puravida.nostr.land", alias: 'puravida.nostr.land' },
  { name: "wss://eden.nostr.land", alias: 'eden.nostr.land' },
  { name: "wss://nostr.ddns.net", alias: 'nostr.ddns.net' },
  { name: "wss://nostr.ono.re", alias: 'nostr.ono.re' },
  { name: "wss://nostr-relay.nonce.academy", alias: 'nonce.academy' },
  { name: "wss://relay.realsearch.cc", alias: 'realsearch.cc' },
  { name: "wss://nostr.developer.li", alias: 'developer.li' },
  { name: "wss://nostr.chaker.net", alias: 'chaker' },
  { name: "wss://relay.nostr.scot", alias: 'nostr.scot' }
];
