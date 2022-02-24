<script>
	import Count from '$lib/Count.svelte';
	import Activity from '$lib/Activity.svelte';
	import Relay from '$lib/Relay.svelte';
	import Data from '$lib/Data.svelte';
	import Latest from '$lib/Latest.svelte';
</script>

<section>
	<div class="m-2">
		<Count/>
		<div class="mb-3"></div>
		<Data/>
		<div class="mb-3"></div>
		<Relay/>
		<div class="mb-3"></div>
		<Activity/>
		<div class="mb-3"></div>
		<Latest/>
	</div>
</section>
