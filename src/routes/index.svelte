<script>
	import Count from '$lib/Count.svelte';
	import Activity from '$lib/Activity.svelte';
	import Relay from '$lib/Relay.svelte';
	import Data from '$lib/Data.svelte';
	import Latest from '$lib/Latest.svelte';
	import Average from '$lib/Average.svelte';
	import Unique from '$lib/Unique.svelte';
	import Dots from '$lib/Dots.svelte';

	import { onMount } from 'svelte';

	let eventCount24h = 0;
	let eventCount1h = 0;
	let networkActivity = Array(24).fill(0); // array index is hour

	const unixTime = Math.floor(Date.now() / 1000);
	const unixTimeMinus24h = unixTime - 60 * 60 * 24;
	const unixTimeMinus1h = unixTime - 60 * 60;

	// taken from github.com/fiatjaf/nostr-relay-registry
	const relays = [
		'wss://nostr-pub.wellorder.net',
		'wss://relayer.fiatjaf.com',
		'wss://nostr.rocks',
		'wss://rsslay.fiatjaf.com',
		'wss://freedom-relay.herokuapp.com/ws',
		'wss://nostr-relay.freeberty.net',
		'wss://nostr.bitcoiner.social',
		'wss://nostr-relay.wlvs.space',
		'wss://nostr.onsats.org',
		'wss://nostr-relay.untethr.me',
		'wss://nostr-verified.wellorder.net',
		'wss://nostr.drss.io',
		'wss://nostr.unknown.place'
	];
	let relayActivity = Array(relays.length).fill(0);

	// only do it on front end
	onMount(() => {
		relays.forEach((url, relayIndex) => {
		// let url = 'wss://nostr-pub.wellorder.net';
			let socket = new WebSocket(url);

			socket.onopen = function (event) {
				console.log(`Connected to ${url}`);

				// pull all event 24h
				socket.send(JSON.stringify(['REQ', 'foobar', { since: unixTimeMinus24h }]));
			};

			// // take data and parse here
			socket.onmessage = function (incomingPayload) {
				const payload = JSON.parse(incomingPayload.data);
				const event = payload[2];
				const eventDate = new Date(event.created_at * 1000);

				// count total event
				eventCount24h++;
				if (event.created_at > unixTimeMinus1h) eventCount1h++;

				// count peak event
				const eventHour = eventDate.getUTCHours();
				networkActivity[eventHour]++;

				// count relay activity
				relayActivity[relayIndex]++;
			};
		})
	});
</script>

<section>
	<div class="m-2">
		<Count {eventCount1h} {eventCount24h} />
		<div class="mb-3" />
		<!-- <Average/>
		<div class="mb-3"></div> -->
		<Activity {networkActivity} />
		<div class="mb-3" />
		<Relay {relays} {relayActivity}/>
		<Dots />
		<Latest />
		<div class="mb-3" />
		<Unique />
	</div>
</section>
