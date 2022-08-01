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
  import Count1 from "$lib/Count1.svelte";
  import Count24 from "$lib/Count24.svelte";
  import Pie from "$lib/Pie.svelte";
  import Tweet from "$lib/Tweet.svelte";
  import Title from "$lib/Title.svelte";
  import Unique1 from "$lib/Unique1.svelte";
  import Unique24 from "$lib/Unique24.svelte";
  import Frequent from "$lib/Frequent.svelte";

  const tweets = data.events;
</script>

<div class="p-2 space-y-2 max-w-md mx-auto xl:hidden">
  <div class="space-y-2">
    <Title />
    <Count1 count1h={data.count1h} />
    <Unique1 unique1h={103} />

    <Activity networkActivity={data.utc} />
    <Pie kinds={data.kinds} />
    <Frequent/>
  </div>

  <div class="p-2 border-2 border-orange-200 bg-white">
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

<div class="hidden xl:flex xl:flex-col mx-auto space-x-2 max-w-6xl">
  <Title />
  <div class="flex space-x-1">
    <div class="space-y-1 flex-none">
      <Count1 count1h={data.count1h} />
      <Count24 count24h={data.count24h} />

      <!-- dummy data -->
      <Unique1 unique1h={103} />
      <Unique24 unique24h={318} />
    </div>
    <div class="p-2 border-2 border-orange-200 bg-white w-1/2">
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
    <div class="space-y-1 flex-auto">
      <Activity networkActivity={data.utc} />
      <Frequent />
      <Pie kinds={data.kinds} />
    </div>
  </div>
</div>
