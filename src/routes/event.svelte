<script>
	import Tweet from '$lib/Tweet.svelte';
	import Reply from '$lib/Reply.svelte';
</script>

<div class="mb-5"></div>
<Tweet
	message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur harum suscipit perferendis inventore dolorum numquam voluptatem aperiam reiciendis nostrum vitae!"
	time="3m"
	pubkey="c3765...cd0076"
/>

<Reply 
	message="first to reply"
	time="1m"
	pubkey="c3765...cd0076"
/>

<Reply 
	message="first to reply"
	time="1m"
	pubkey="c3765...cd0076"
	depth=1
/>

<Reply 
	message="first to reply"
	time="1m"
	pubkey="c3765...cd0076"
	depth=2
/>