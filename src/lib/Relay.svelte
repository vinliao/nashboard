<script>
</script>

<div class="rounded-md shadow border p-3">
	<span class="block text-center pb-3 text-xs text-neutral-400">EVENTS RECEIVED BY RELAY LAST 24H</span>
	<div class="flex flex-col">
		{#each Array(5) as _}
			<div class="flex p-2 break-words">
				<span class="flex-1 mr-3 text-neutral-500">wss://your-relay-name.com</span>
				<span class="shrink text-neutral-400">999 evt</span>
			</div>
		{/each}
  </div>
</div>
