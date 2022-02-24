<script>
	import Tweet from "./Tweet.svelte";
	const replied = {message: "reply one", time: "2m", pubkey: "54f18...8f2a9"};
</script>

<div class="rounded-md shadow border p-3">
	<span class="block text-center pb-3 text-xs text-neutral-400">NOSTR NETWORK'S LATEST EVENTS</span>
	<div class="flex flex-col">
	<Tweet
		message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur harum suscipit perferendis inventore dolorum numquam voluptatem aperiam reiciendis nostrum vitae!"
		time="3m"
		pubkey="c3765...cd0076"
		replied={replied}
	/>

	<Tweet
		message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur harum suscipit perferendis inventore dolorum numquam voluptatem aperiam reiciendis nostrum vitae!"
		time="3m"
		pubkey="c3765...cd0076"
	/>

	<Tweet
		message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur harum suscipit perferendis inventore dolorum numquam voluptatem aperiam reiciendis nostrum vitae!"
		time="3m"
		pubkey="c3765...cd0076"
		replied={replied}
	/>

	<Tweet
		message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur harum suscipit perferendis inventore dolorum numquam voluptatem aperiam reiciendis nostrum vitae!"
		time="3m"
		pubkey="c3765...cd0076"
		replied={replied}
	/>

  </div>
</div>
