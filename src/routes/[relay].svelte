<script context="module">
  export async function load({ fetch, params }) {
    const response = await fetch(`/api/data/${params.relay}`);
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
  import { setContext } from "svelte";

  const allTweets = data.events;
  const shortListAmount = 8;
  const longListAmount = Math.min(50, allTweets.length);

  let tweets = allTweets.slice(0, shortListAmount);

  let allFoundIn = [];
  for (let i = 0; i < allTweets.length; i++) {
    // shuffle the foundIn array just for the aesthetic

    // array of length 1 because child component
    // expects an array, not a string
    allFoundIn.push([data.where[i][1]]);
  }
  let foundIn = allFoundIn.slice(0, shortListAmount);

  let tweetsExpanded = false;
  function toggleTweetLength() {
    if (!tweetsExpanded) {
      tweets = allTweets.slice(0, longListAmount);
      foundIn = allFoundIn.slice(0, longListAmount);
    } else {
      tweets = allTweets.slice(0, shortListAmount);
      foundIn = allFoundIn.slice(0, shortListAmount);
    }

    tweetsExpanded = !tweetsExpanded;
  }

  setContext("expander", { toggleTweetLength });
</script>

<!-- if fetch error -->
{#if data.events.length == 0}
  <MiddleText
    message={"oops, something went wrong while fetching the data, refresh page, the url might be incorrect"}
  />
{:else}
  <div class="p-2 space-y-1 max-w-lg mx-auto xl:hidden py-7">
    <div class="space-y-1">
      <span
        class="block text-center text-amber-400 font-bold font-sartoshi tracking-wider text-4xl sm:text-5xl break-words"
        >{data.relay}
      </span>
      <Title />
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

    <TweetList {tweets} {foundIn} {shortListAmount} />

    <div class="space-y-1">
      <Pie kinds={data.kinds} />
    </div>
  </div>

  <div class="hidden xl:flex xl:flex-col mx-auto max-w-7xl py-7">
    <span
      class="block text-center text-amber-400 font-bold font-sartoshi tracking-wider text-6xl"
      >{data.relay}
    </span>
    <Title />
    <div class="flex space-x-1 items-start">
      <div class="space-y-1 shrink-0">
        <SingleNumber number={data.eventCount} label={"EVENT COUNT 24H"} />
        <SingleNumber
          number={data.uniquePubkeys}
          label={"UNIQUE PUBKEYS 24H"}
        />
      </div>

      <TweetList {tweets} {foundIn} {shortListAmount} />

      <div class="space-y-1 basis-1/2">
        <Activity networkActivity={data.utc} />
        <Pie kinds={data.kinds} />
      </div>
    </div>
  </div>
{/if}
