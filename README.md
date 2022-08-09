# Nashboard: a Nostr network dashboard
![nashboard screenshot](./nashboard.png)

gm

Nostr, as described on its docs: "The simplest open protocol that is able to create a censorship-resistant global 'social' network once and for all." nashboard attemps to provide statistics of the entire Nostr network.

nashboard can be accessed at [https://nashboard.space](https://nashboard.space). For more information on Nostr: [https://github.com/nostr-protocol/nostr](https://github.com/nostr-protocol/nostr).

If you'd like to add your relay, add a line on `src/lib/relays.ts`, then submit a PR. Relay must have an alias. Alias is useful for for per-relay stats, which can be accessed at nashboard.space/${relayAlias}. Here's an example of per-relay stats: [nashboard.space/damus](https://nashboard.space/damus). It provides statistics of a single individual relay - in this case, the Damus relay - instead of the entire Nostr network.

The aliases include `wellorder`, `damus`, `minds`, `oxtr`, `wlvs.space`, and many more. To view stats of wellorder, head to [nashboard.space/wellorder](https://nashboard.space/wellorder), to view stats of wlvs.space, head to [nashboard.space/wlvs.space](https://nashboard.space/wlvs.space), to view stats of minds... you get the idea. To view all the aliases, check out `src/lib/relays.ts`.

A note on the "heatmap" - the 6 month event count, the GitHub-like commit squares. Yes, that's real data. The data is hardcoded on `src/lib/heatmapData.ts`, the data is created with `src/routes/api/data/heatmap.ts`. The current plan is to update that hardcoded data once a month. I know this is not the optimal solution, I'm still figuring out a better way to do it.

![nostr meme](./meme.jpg)