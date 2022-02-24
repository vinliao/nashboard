<script>
	import Tweet from '$lib/Tweet.svelte';
	const replied = {message: "reply one", time: "2m", pubkey: "54f18...8f2a9"};
	// link.com/p/<pubkey>
	// link.com/e/<eventid>
</script>

<div class="mb-5"></div>
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
