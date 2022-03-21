<script context="module">
  export async function load({ fetch }) {
    const response = await fetch("/api/data");
    const data = await response.json();

    return {
      status: response.status,
      props: {
        data: data,
      },
    };
  }
</script>

<script>
  export let data = {};
  import Tweet from "$lib/Tweet.svelte";

  const tweets = data.events;

  console.log(tweets);
</script>

{#each tweets as tweet}
  <Tweet time={tweet.created_at} message={tweet.content} pubkey={tweet.pubkey}/>
{/each}
