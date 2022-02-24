<script>
	import Count from '$lib/Count.svelte';
	import Activity from '$lib/Activity.svelte';
	import Relay from '$lib/Relay.svelte';
	import Data from '$lib/Data.svelte';
	import Latest from '$lib/Latest.svelte';
	import Average from '$lib/Average.svelte';
	import Unique from '$lib/Unique.svelte';
</script>

<section>
	<div class="m-2">
		<Count/>
		<div class="mb-3"></div>
		<Average/>
		<div class="mb-3"></div>
		<Data/>
		<div class="mb-3"></div>
		<Relay/>
		<div class="mb-3"></div>
		<Activity/>
		<div class="mb-3"></div>
		<Latest/>
		<div class="mb-3"></div>
		<Unique/>
	</div>
</section>
