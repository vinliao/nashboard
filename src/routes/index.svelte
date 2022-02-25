<script>
	import Count from '$lib/Count.svelte';
	import Activity from '$lib/Activity.svelte';
	import Relay from '$lib/Relay.svelte';
	import Dots from '$lib/Dots.svelte';
	import Tweet from '$lib/Tweet.svelte';

	import { onMount } from 'svelte';
	import _ from 'underscore';

	// initial dummy event object
	let events = [
		{
			message:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum suscipit dolores eos sequi. Repudiandae doloremque qui quo deserunt quidem, eum incidunt consequuntur numquam nostrum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum suscipit dolores eos sequi. Repudiandae doloremque qui quo deserunt quidem, eum incidunt consequuntur numquam nostrum!',
			time: 1,
			pubkey: '0000000000'
		}
	];

	let eventCount24h = 0;
	let eventCount1h = 0;
	let networkActivity = Array(24).fill(0); // array index is hour

	let kind1 = 0;
	let kind4 = 0;
	let kindOther = 0;

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
			let socket = new WebSocket(url);

			socket.onopen = function (event) {
				console.log(`Connected to ${url}`);

				// pull all event 24h
				socket.send(JSON.stringify(['REQ', 'foobar', { since: unixTimeMinus24h }]));
			};

			// // take data and parse here
			socket.onmessage = function (incomingPayload) {
				// spits out lots of error when parsing
				// Uncaught SyntaxError: Unexpected token P in JSON at position 0
				const payload = JSON.parse(incomingPayload.data);
				const event = payload[2];
				const eventDate = new Date(event.created_at * 1000);

				// count total event
				eventCount24h++;
				if (event.created_at > unixTimeMinus1h) eventCount1h++;

				// count kinds
				if (event.kind == '1') kind1++;
				else if (event.kind == '4') kind4++;
				else kindOther++;

				// count peak event
				const eventHour = eventDate.getUTCHours();
				networkActivity[eventHour]++;

				// count relay activity
				relayActivity[relayIndex]++;

				// show tweets
				let tweet = {
					message: event.content,
					time: parseInt(event.created_at),
					id: event.id,
					pubkey: event.pubkey
				};
				events.push(tweet);
				const uniqueEvents = _.uniq(events);
				const sortedEvents = _.sortBy(uniqueEvents, 'time');
				events = sortedEvents.reverse().slice(0, 20);
			};
		});
	});
</script>

<section class="bg-gradient-to-r from-pink-100 to-orange-200">
	<div class="p-2 max-w-3xl sm:flex sm:w-screen sm:mx-auto sm:space-x-2">
		<div class="flex-none space-y-2 sm:space-y-4">
			<Count {eventCount1h} {eventCount24h} />
			<Activity {networkActivity} />
			<Relay {relays} {relayActivity} />
		</div>

		<div class="sm:invisible">
			<Dots />
		</div>

		<div class="rounded-md shadow p-3 bg-white">
			<span class="block text-center pb-3 text-xs text-neutral-400"
				>NOSTR NETWORK'S LATEST EVENTS</span
			>
			<div class="flex flex-col">
				{#each events as tweet}
					<Tweet time={tweet.time} pubkey={tweet.pubkey} message={tweet.message} />
				{/each}
			</div>
		</div>
		<p />
	</div>
</section>
