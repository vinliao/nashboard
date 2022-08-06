<script>
  import Tweet from "$lib/Tweet.svelte";
  // export let created_at
  // export let content
  // export let pubkey
  export let tweets;
  export let foundIn;
</script>

<div class="p-5 border-2 border-orange-200 bg-white xl:min-w-0 xl:basis-1/2">
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

  <!-- button -->
  <div class="flex">
    <div class="flex-1" />
    <div class="flex items-center space-x-1 cursor-not-allowed">
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
