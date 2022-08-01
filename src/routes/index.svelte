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

<div class="p-2 space-y-2 max-w-md mx-auto lg:max-w-none lg:flex">
  <div class="space-y-2 lg:hidden">
    <Title />
    <Count count1h={data.count1h} count24h={data.count24h} />
    <Unique count1h={data.count1h} count24h={data.count24h} />

    <Activity networkActivity={data.utc} />
    <Pie kinds={data.kinds} />
  </div>

  <!-- this is where to make the left and right side -->
  <p class="hidden lg:flex">hello world</p>

  <div class="p-2 border-2 border-orange-200 bg-white lg:w-1/2 xl:w-2/5 mx-auto">
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
