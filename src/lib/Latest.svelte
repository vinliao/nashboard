<script>
	import Tweet from "./Tweet.svelte";
	export let events;
	const latestEvents = [...new Set(events)].slice(-20).reverse();
	const replied = {message: "reply one", time: "2m", pubkey: "54f18...8f2a9"};
</script>

<div class="rounded-md shadow border p-3">
	<span class="block text-center pb-3 text-xs text-neutral-400">NOSTR NETWORK'S LATEST EVENTS</span>
	<div class="flex flex-col">
	{#each latestEvents as event}
		<Tweet
			message={event.content}
			time={event.created_at}
			pubkey={event.pubkey}
		/>
	{/each}
  </div>
</div>
