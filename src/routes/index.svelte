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
  import Activity from "$lib/Activity.svelte";
  import Relay from "$lib/Relay.svelte";
  import Tweet from "$lib/Tweet.svelte";

  const tweets = data.events;

  console.log(data);
</script>

<Relay relayData={data.relays} />
<Activity networkActivity={data.utc} />

{#each tweets as tweet}
  <Tweet
    time={tweet.created_at}
    message={tweet.content}
    pubkey={tweet.pubkey}
  />
{/each}
