<script>
	import Count from '$lib/Count.svelte';
	import Activity from '$lib/Activity.svelte';
	import Relay from '$lib/Relay.svelte';
	import Data from '$lib/Data.svelte';
	import Latest from '$lib/Latest.svelte';
	import Average from '$lib/Average.svelte';
	import Unique from '$lib/Unique.svelte';
	import Dots from '$lib/Dots.svelte';

	import { onMount } from "svelte";

	let eventCount24h = 0;
	let eventCount1h = 0;
	let networkActivity = Array(24).fill(0); // array index is hour

	const unixTime = Math.floor(Date.now() / 1000);
	const unixTimeMinus24h = unixTime - (60 * 60 * 24);
	const unixTimeMinus1h = unixTime - (60 * 60);

	// only do it on front end
	onMount(() => {
		let url = "wss://nostr-pub.wellorder.net";
		let socket = new WebSocket(url);

		socket.onopen = function (event) {
			console.log(`Connected to ${url}`);
			
			// pull all event 24h
			socket.send(JSON.stringify(["REQ", "foobar", {"since": unixTimeMinus24h}]));
		};

		// // take data and parse here
		socket.onmessage = function (incomingPayload) {
			const payload = JSON.parse(incomingPayload.data);
			const event = payload[2];
			const eventDate = new Date(event.created_at * 1000);

			// count total event
			eventCount24h++;
			if(event.created_at > unixTimeMinus1h) eventCount1h++;

			// count peak event
			const eventHour = eventDate.getUTCHours();
			networkActivity[eventHour]++;
		}
	})
</script>

<section>
	<div class="m-2">
		<Count eventCount1h={eventCount1h} eventCount24h={eventCount24h}/>
		<div class="mb-3"></div>
		<!-- <Average/>
		<div class="mb-3"></div> -->
		<Activity networkActivity={networkActivity}/>
		<div class="mb-3"></div>
		<Relay/>
		<Dots/>
		<Latest/>
		<div class="mb-3"></div>
		<Unique/>
	</div>
</section>
