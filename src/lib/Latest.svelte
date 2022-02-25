<script>
	import Tweet from "./Tweet.svelte";
	export let events; // events are still actually very messy
	const uniqueEvents = [...new Set(events)];
	const sortedEvents = uniqueEvents.sort((a, b) => {
		return b.created_at - a.created_at
	}).slice(0, 20);
</script>

<div class="rounded-md shadow border p-3">
	<span class="block text-center pb-3 text-xs text-neutral-400">NOSTR NETWORK'S LATEST EVENTS</span>
	<div class="flex flex-col">
		<!-- <p>{events.length}</p> -->
	{#each sortedEvents as event}
		<Tweet
			message={event.content}
			time={event.created_at}
			pubkey={event.pubkey}
		/>
	{/each}
  </div>
</div>
