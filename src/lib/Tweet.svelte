<script>
  import { format } from "timeago.js";
  export let time;
  export let message;
  export let pubkey;
  export let foundIn;
</script>

<div class="mb-10">
  <div class="flex justify-between mb-2">
    <span class="text-stone-600 font-semibold"
      >{pubkey.slice(0, 7) + "..." + pubkey.slice(-7)}</span
    >
    <span class="text-stone-400">{format(time * 1000)}</span>
  </div>
  <p class="break-words text-stone-500 mb-2">
    {message}
  </p>
  <div class="flex text-sm flex-wrap">
    {#each foundIn as place}
      {#if place == "damus"}
        <span
          class="bg-purple-50 border-2 mr-0.5 mb-0.5 border-purple-200 rounded-md px-1 text-purple-500"
          >{place}</span
        >
      {:else if place == "wellorder pub"}
        <span
          class="bg-cyan-50 border-2 mr-0.5 mb-0.5 border-cyan-200 rounded-md px-1 text-cyan-500"
          >{place}</span
        >
      {:else if place == "minds"}
        <span
          class="bg-yellow-50 border-2 mr-0.5 mb-0.5 border-yellow-200 rounded-md px-1 text-yellow-600"
          >{place}</span
        >
      {:else if place == "oxtr"}
        <span
          class="bg-red-50 border-2 mr-0.5 mb-0.5 border-red-200 rounded-md px-1 text-red-400"
          >{place}</span
        >
      {:else}
        <span
          class="bg-stone-50 border-2 mr-0.5 mb-0.5 border-stone-200 rounded-md px-1 text-stone-500"
          >{place}</span
        >
      {/if}
    {/each}
  </div>
</div>
