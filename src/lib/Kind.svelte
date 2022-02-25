<script>
	export let kind1;
	export let kind4;
	export let kindOther;
</script>

<div class="rounded-md shadow border p-3">
	<span class="block text-center pb-3 text-xs text-neutral-400">TYPES OF KIND (24H)</span>
	<div class="flex mb-3">
		<div class="flex-1 text-center">
			<span class="text-2xl">{kind1}</span>
			<span class="text-neutral-400">kind "1"</span>
		</div>
		<div class="flex-1 text-center">
			<span class="text-2xl">{kind4}</span>
			<span class="text-neutral-400">kind "4"</span>
		</div>
	</div>
	<div class="block text-center">
		<span class="text-2xl">{kindOther}</span>
		<span class="text-neutral-400">other</span>
	</div>
</div>
