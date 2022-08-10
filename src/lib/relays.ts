// /*
// Note: if you'd like to add your relay, please add the alias too!
// use short alias, replace space with a dot `.`
// */

const relayList = [
  ["wss://nostr-pub.wellorder.net", 'wellorder'],
  ["wss://relayer.fiatjaf.com", 'fiatjaf'],
  ["wss://nostr.rocks", 'nostr.rocks'],
  ["wss://rsslay.fiatjaf.com", 'rsslay'],
  ["wss://freedom-relay.herokuapp.com/ws", 'freedom.relay'],
  ["wss://nostr-relay.freeberty.net", 'freeberty'],
  ["wss://nostr.bitcoiner.social", 'bitcoiner.social'],
  ["wss://nostr-relay.wlvs.space", 'wlvs.space'],
  ["wss://nostr.onsats.org", 'onsats'],
  ["wss://nostr-relay.untethr.me", 'untethr'],
  ["wss://nostr.drss.io", 'drss'],
  ["wss://nostr.unknown.place", 'unknown.place'],
  ["wss://relay.damus.io", 'damus'],
  ["wss://nostr.openchain.fr", 'openchain'],
  ["wss://nostr.delo.software", 'delo'],
  ["wss://relay.minds.com/nostr/v1/ws", 'minds'],
  ["wss://nostr.oxtr.dev", 'oxtr'],
  ["wss://moonbreeze.richardbondi.net/ws", 'richardbondi'],
  ["wss://nostr.semisol.dev", 'semisol'],
  ["wss://nostr-pub.semisol.dev", 'semisol.pub']
];

export let relays = [];
export let relayAliases = [];

for (let i = 0; i < relayList.length; i++) {
  relays.push(relayList[i][0]);
  relayAliases.push(relayList[i][1]);
}