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
  import Tweet from "$lib/Tweet.svelte";
  import Title from "$lib/Title.svelte";
  import Unique from "$lib/Unique.svelte";

  const tweets = data.events;
</script>

<div class="p-2 max-w-3xl mx-auto sm:flex sm:space-x-4 space-y-2 sm:space-y-0">
  <div class="sm:w-1/2 space-y-2 sm:space-y-4">
    <Title />
    <Count count1h={data.count1h} count24h={data.count24h} />
    <Unique count1h={data.count1h} count24h={data.count24h} />

    <!-- pie kind component -->
    <!-- <Pie kinds={data.kinds} /> -->
    <Activity networkActivity={data.utc} />
  </div>

  <div class="p-3 sm:w-1/2 border-2 border-orange-200">
    <span class="block text-center pb-3 text-sm font-mono text-orange-400"
      >LATEST POSTS</span
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
