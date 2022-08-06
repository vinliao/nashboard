<script context="module">
  export async function load({ fetch }) {
    const response = await fetch("/api/data/minds");
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
  import Title from "$lib/Title.svelte";
  import SingleNumber from "$lib/SingleNumber.svelte";
  import MiddleText from "$lib/MiddleText.svelte";
  import TweetList from "$lib/TweetList.svelte";

  let tweets = data.events;

  let foundIn = [];
  for (let i = 0; i < tweets.length; i++) {
    foundIn.push(data.where[i][1]);
  }
</script>

<!-- if fetch error -->
{#if tweets.length == 0}
  <MiddleText
    message={"oops, something went wrong while fetching the data, refresh page"}
  />
{:else}
  <div class="p-2 space-y-1 max-w-lg mx-auto xl:hidden py-7">
    <div class="space-y-1">
      <Title />
      <span
        class="block text-center text-stone-800 font-bold font-sartoshi tracking-wider text-5xl sm:text-6xl pb-7 sm:pb-9"
        >for <span class="text-amber-400">minds</span>
      </span>
      <div class="sm:flex space-y-1 sm:space-y-0 sm:space-x-1">
        <div class="flex-1">
          <SingleNumber number={data.eventCount} label={"EVENT COUNT 24H"} />
        </div>
        <div class="flex-1">
          <SingleNumber
            number={data.uniquePubkeys}
            label={"UNIQUE PUBKEYS 24H"}
          />
        </div>
      </div>
      <Activity networkActivity={data.utc} />
    </div>

    <TweetList {tweets} {foundIn} />

    <div class="space-y-1">
      <Pie kinds={data.kinds} />
    </div>
  </div>

  <div class="hidden xl:flex xl:flex-col mx-auto space-x-2 max-w-7xl py-7">
    <Title />
    <span
      class="block text-center text-stone-800 font-bold font-sartoshi tracking-wider text-7xl mb-12"
      >for <span class="text-amber-400">minds</span>
    </span>
    <div class="flex space-x-1 items-start">
      <div class="space-y-1 shrink-0">
        <SingleNumber number={data.eventCount} label={"EVENT COUNT 24H"} />
        <SingleNumber
          number={data.uniquePubkeys}
          label={"UNIQUE PUBKEYS 24H"}
        />
      </div>

      <TweetList {tweets} {foundIn} />

      <div class="space-y-1 basis-1/2">
        <Activity networkActivity={data.utc} />
        <Pie kinds={data.kinds} />
      </div>
    </div>
  </div>
{/if}
