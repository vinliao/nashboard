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
  import Frequent from "$lib/Frequent.svelte";
  import SingleNumber from "$lib/SingleNumber.svelte";

  const tweets = data.events;

  let dummyMessage = true;
  function toggleDummyMessage() {
    dummyMessage = false;
  }
</script>

{#if dummyMessage}
  <div class="bg-cyan-700 p-2 text-cyan-50 font-bold flex items-start justify-between">
    <p class="">
      Event count, latest post, and relay activity are real data from Minds'
      relay. The rest is dummy data. Dummy data will be replaced with real ones
      when the Minds relay is crowded enough.
    </p>
    <button
      class="focus:outline-none focus:ring-0"
      on:click={toggleDummyMessage}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
{/if}

<div class="p-2 space-y-1 max-w-md mx-auto xl:hidden">
  <div class="space-y-1">
    <Title />
    <SingleNumber number={data.count1h} label={"EVENT COUNT 1H"} />
    <SingleNumber number={103} label={"ACTIVE USERS 1H"} />

    <Activity networkActivity={data.utc} />
    <Pie kinds={data.kinds} />
    <Frequent />
  </div>

  <div class="p-2 border-2 border-orange-200 bg-white">
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
</div>

<div class="hidden xl:flex xl:flex-col mx-auto space-x-2 max-w-6xl">
  <Title />
  <div class="flex space-x-1">
    <div class="space-y-1 flex-auto">
      <SingleNumber number={data.count1h} label={"EVENT COUNT 1H"} />
      <SingleNumber number={data.count24h} label={"EVENT COUNT 24H"} />

      <!-- dummy data -->
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
</div>
