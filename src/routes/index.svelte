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
  import Count from "$lib/Count.svelte";
  import Pie from "$lib/Pie.svelte";
  import Relay from "$lib/Relay.svelte";
  import Tweet from "$lib/Tweet.svelte";

  const tweets = data.events;

  console.log(data);
</script>

<div class="p-2 max-w-3xl mx-auto sm:flex sm:space-x-4 space-y-2 sm:space-y-0">
  <div class="sm:w-1/2 space-y-2 sm:space-y-4">
    <Count count1h={data.count1h} count24h={data.count24h} />

    <!-- pie kind component -->
    <div class="rounded-md shadow p-3 bg-white">
      <Pie kinds={data.kinds} />
    </div>

    <Activity networkActivity={data.utc} />
    <Relay relayData={data.relays} />
  </div>

  <div class="rounded-md shadow p-3 bg-white sm:w-1/2">
    <span class="block text-center pb-3 text-sm text-neutral-400 font-mono"
      >NOSTR NETWORK'S LATEST EVENTS</span
    >
    <div class="flex flex-col">
      {#each tweets as tweet}
        <Tweet
          time={tweet.created_at}
          message={tweet.content}
          pubkey={tweet.pubkey}
        />
      {/each}
    </div>
  </div>
</div>
