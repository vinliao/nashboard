<script>
	export let kind0;
	export let kind1;
	export let kind2;
	export let kind3;
	export let kind4;
	export let kindOther;
</script>

<div class="rounded-md shadow p-3 bg-white">
	<span class="block text-center pb-3 text-sm text-neutral-400 font-mono">EVENT TYPES (24H)</span>
	<div class="flex flex-col">
		<div class="flex items-baseline space-x-2">
			<span class="flex-1 text-right">{kind1}</span>
			<span class="flex-1 text-neutral-400">tweet</span>
		</div>
		<div class="flex items-baseline space-x-2">
			<span class="flex-1 text-right">{kind4}</span>
			<span class="flex-1 text-neutral-400">encrypted msg</span>
		</div>
		<div class="flex items-baseline space-x-2">
			<span class="flex-1 text-right">{kind0}</span>
			<span class="flex-1 text-neutral-400">metadata evt</span>
		</div>
		<div class="flex items-baseline space-x-2">
			<span class="flex-1 text-right">{kind2}</span>
			<span class="flex-1 text-neutral-400">relay share evt</span>
		</div>
		<div class="flex items-baseline space-x-2">
			<span class="flex-1 text-right">{kind3}</span>
			<span class="flex-1 text-neutral-400">contact list evt</span>
		</div>
		<div class="flex items-baseline space-x-2">
			<span class="flex-1  text-right">{kindOther}</span>
			<span class="flex-1 text-neutral-400">other</span>
		</div>
	</div>
</div>
