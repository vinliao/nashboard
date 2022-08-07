<script context="module">
  export async function load({ fetch }) {
    // to prevent the constant loading, store data in
    // svelte store, then only fetch if svelte store is empty
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
  import _ from "underscore";
  import Activity from "$lib/Activity.svelte";
  import Pie from "$lib/Pie.svelte";
  import Title from "$lib/Title.svelte";
  import SingleNumber from "$lib/SingleNumber.svelte";
  import Relay from "$lib/Relay.svelte";
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
    allFoundIn.push(_.shuffle(data.where[i][1]));
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
{#if tweets.length == 0}
  <MiddleText
    message={"oops, something went wrong while fetching the data, refresh page"}
  />
{:else}
  <div class="p-2 space-y-1 max-w-lg mx-auto xl:hidden py-7">
    <div class="space-y-1">
      <Title />
      <div class="flex">
        <div class="flex-1" />
        <a
          href="https://github.com/vinliao/nashboard"
          class="font-mono tracking-widest text-stone-500 flex space-x-1 items-center"
          >github
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-stone-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
            />
            <path
              d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
            />
          </svg>
        </a>
      </div>
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
      <Relay relayData={data.relays} />
    </div>
  </div>

  <div class="hidden xl:flex xl:flex-col mx-auto max-w-7xl py-7">
    <Title />

    <div class="flex">
      <div class="flex-1" />
      <a
        href="https://github.com/vinliao/nashboard"
        class="font-mono tracking-widest text-stone-500 flex space-x-1 items-center"
        >github
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-stone-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
          />
          <path
            d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
          />
        </svg>
      </a>
    </div>

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
        <Relay relayData={data.relays} />
      </div>
    </div>
  </div>
{/if}
