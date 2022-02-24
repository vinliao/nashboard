<script>
</script>

<div class="rounded-md shadow border p-3">
	<span class="block text-center pb-3 text-xs text-neutral-400">EVENTS PER RELAY (24H)</span>
	<div class="flex flex-col">
		{#each Array(5) as _}
			<div class="flex p-2">
				<span class="flex-1 mr-10 break-words text-neutral-500">wss://relay-name.com</span>
				<span class="flex-initial">999 events</span>
			</div>
		{/each}
  </div>
</div>
