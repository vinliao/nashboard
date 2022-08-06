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
  import Pie from "$lib/Pie.svelte";
  import Tweet from "$lib/Tweet.svelte";
  import Title from "$lib/Title.svelte";
  import Where from "$lib/Where.svelte";
  import SingleNumber from "$lib/SingleNumber.svelte";
  import Relay from "$lib/Relay.svelte";
  import MiddleText from "$lib/MiddleText.svelte";

  const totalTweets = 7;
  const allTweets = data.events;
  const fewTweets = data.events.slice(0, totalTweets);
  let tweets = fewTweets;

  let foundIn = [];
  for (let i = 0; i < totalTweets; i++) {
    foundIn.push(data.where[i][1]);
  }

  console.log(foundIn);
</script>

<!-- if fetch error -->
{#if allTweets.length == 0}
  <MiddleText
    message={"oops, something went wrong while fetching the data, refresh page"}
  />
{:else}
  <div class="p-2 space-y-1 max-w-md mx-auto xl:hidden">
    <div class="space-y-1">
      <Title />
      <SingleNumber number={data.count24h} label={"EVENT COUNT 24H"} />
      <SingleNumber number={data.uniquePubkeys} label={"UNIQUE PUBKEYS 24H"} />
      <Activity networkActivity={data.utc} />
    </div>

    <!-- recent events -->
    <!-- this isn't its own component because it's buggy as hell! -->
    <div class="p-5 border-2 border-orange-200 bg-white">
      <span
        class="block text-center pb-3 text-lg text-orange-500 font-bold tracking-tighter"
        >LATEST EVENTS</span
      >
      <div class="flex flex-col">
        {#each tweets as tweet, tweetIndex}
          <Tweet
            time={tweet.created_at}
            message={tweet.content}
            pubkey={tweet.pubkey}
            foundIn={foundIn[tweetIndex]}
          />
        {/each}
      </div>

      <!-- active: text stone 800, arrow stone 500 -->
      <div class="flex cursor-not-allowed">
        <div class="flex-1" />
        <div class="flex items-center space-x-1">
          <span class="text-stone-300 font-mono tracking-widest">more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-stone-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </div>
    <!-- end of recent events -->

    <div class="space-y-1">
      <Pie kinds={data.kinds} />
      <Relay relayData={data.relays} />
    </div>
  </div>
  <!-- 
<div class="hidden xl:flex xl:flex-col mx-auto space-x-2 max-w-6xl">
  <Title />
  <div class="flex space-x-1">
    <div class="space-y-1 flex-auto">
      <SingleNumber number={data.count1h} label={"EVENT COUNT 1H"} />
      <SingleNumber number={data.count24h} label={"EVENT COUNT 24H"} />

      <SingleNumber number={103} label={"ACTIVE USERS 1H"} />
      <SingleNumber number={9999} label={"ACTIVE USERS 24H"} />
    </div>
    <div class="p-2 border-2 border-orange-200 bg-white w-1/2">
      <span class="block text-center pb-3 text-lg  text-orange-500 font-bold"
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
      <Pie kinds={data.kinds}/>
    </div>
  </div>
</div> -->
{/if}
