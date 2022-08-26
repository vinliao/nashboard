<script>
  import Tweet from "$lib/Tweet.svelte";
  import { fly, slide } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  export let tweets;
  export let extendedTweets;
  export let foundIn = [];

  let extended = false;

  async function getRecentEvents() {
    tweets = [];
    extendedTweets = [];
    await fetch("/api/data/insert/events"); // fill redis cache
    const body = await (await fetch("/api/data/get/events")).json();

    tweets = body.events.slice(0, 8); // 8 is shortListAmount
    extendedTweets = body.events;
  }
</script>

<div class="p-5 border-2 border-orange-200 bg-white xl:min-w-0 xl:basis-1/2">
  <div class="flex items-center">
    <div class="flex-1" />
    <span
      class="block text-center text-lg text-orange-500 font-bold tracking-tighter"
      >LATEST EVENTS</span
    >
    <div class="flex-1 flex">
      <div class="flex-1" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 text-stone-500 hover:cursor-pointer hover:text-stone-700 transition"
        on:click={getRecentEvents}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.5 12c0-1.232.046-2.453.138-3.662a4.006 4.006 0 013.7-3.7 48.678 48.678 0 017.324 0 4.006 4.006 0 013.7 3.7c.017.22.032.441.046.662M4.5 12l-3-3m3 3l3-3m12 3c0 1.232-.046 2.453-.138 3.662a4.006 4.006 0 01-3.7 3.7 48.657 48.657 0 01-7.324 0 4.006 4.006 0 01-3.7-3.7c-.017-.22-.032-.441-.046-.662M19.5 12l-3 3m3-3l3 3"
        />
      </svg>
    </div>
  </div>

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
  {#if extended}
    <div
      class="flex flex-col"
      transition:fly={{ y: -10, duration: 200, easing: cubicOut }}
    >
      {#each extendedTweets as tweet, tweetIndex}
        <Tweet
          time={tweet.created_at}
          message={tweet.content}
          pubkey={tweet.pubkey}
          foundIn={foundIn[tweetIndex]}
        />
      {/each}
    </div>
  {/if}

  {#if !extended}
    <!-- button -->
    <div class="flex mt-5" in:fly={{ y: 10, duration: 200, easing: cubicOut }}>
      <div class="flex-1" />
      <div
        class="flex items-center space-x-1 hover:cursor-pointer"
        on:click={() => {
          extended = !extended;
        }}
      >
        <span class="text-stone-500 font-mono tracking-widest">more</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-stone-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  {/if}
</div>
