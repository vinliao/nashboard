<script>
	export let count1h;
	export let count24h;
</script>

<div class="rounded-md shadow p-3 bg-white">
	<span class="block text-center pb-3 text-sm text-neutral-400 font-mono"
		>NOSTR NETWORK'S EVENT COUNT</span
	>
	<div class="flex">
		<div class="flex-1 text-center">
			<span class="text-2xl">{count1h}</span>
			<span class="text-neutral-400">last 1h</span>
		</div>
		<div class="flex-1 text-center">
			<span class="text-2xl">{count24h}</span>
			<span class="text-neutral-400">last 24h</span>
		</div>
	</div>
</div>