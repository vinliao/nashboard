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
  import SingleNumber from "$lib/SingleNumber.svelte";
  import Relay from "$lib/Relay.svelte";
  import MiddleText from "$lib/MiddleText.svelte";
  import TweetList from "$lib/TweetList.svelte";

  const totalTweets = 7;
  const allTweets = data.events;
  const fewTweets = data.events.slice(0, totalTweets);
  let tweets = fewTweets;

  let foundIn = [];
  for (let i = 0; i < totalTweets; i++) {
    foundIn.push(data.where[i][1]);
  }
</script>

<!-- if fetch error -->
{#if allTweets.length == 0}
  <MiddleText
    message={"oops, something went wrong while fetching the data, refresh page"}
  />
{:else}
  <div class="p-2 space-y-1 max-w-lg mx-auto xl:hidden py-7">
    <div class="space-y-1">
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

    <TweetList {tweets} {foundIn} />

    <div class="space-y-1">
      <Pie kinds={data.kinds} />
      <Relay relayData={data.relays} />
    </div>
  </div>

  <div class="hidden xl:flex xl:flex-col mx-auto space-x-2 max-w-7xl py-7">
    <Title />
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
        <Relay relayData={data.relays} />
      </div>
    </div>
  </div>
{/if}
