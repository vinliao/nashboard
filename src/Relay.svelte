<script>
	export let relays;
	export let relayActivity;
</script>

<div class="rounded-md shadow p-3 bg-white">
	<span class="block text-center pb-3 text-sm text-neutral-400 font-mono"
		>EVENTS RECEIVED BY RELAY LAST 24H</span
	>
	<div class="flex flex-col">
		{#each relays as relay, i}
			<div class="flex p-2 break-words">
				<span class="flex-1 mr-3 text-neutral-500">{relay}</span>
				<span class="shrink text-neutral-400">{relayActivity[i]}</span>
			</div>
		{/each}
		<a href="https://github.com/vinliao/nashboard" class="p-2 text-center block text-orange-700 underline"
			>Add your relay?</a
		>
	</div>
</div>
