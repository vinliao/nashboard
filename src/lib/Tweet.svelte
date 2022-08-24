<script>
  import { format } from "timeago.js";
  export let time;
  export let message;
  export let pubkey;
  export let foundIn;
</script>

<div class="mt-5">
  <div class="flex justify-between">
    <span class="text-stone-600 font-semibold"
      >{pubkey.slice(0, 5) + "..." + pubkey.slice(-5)}</span
    >
    <span class="text-stone-400">{format(time * 1000)}</span>
  </div>
  <p class="break-words text-stone-500 mb-1">
    {message}
  </p>
  {#if foundIn}
    <div class="flex text-sm flex-wrap">
      {#each foundIn as place}
        {#if place == "wellorder"}
          <span
            class="border mr-0.5 mb-0.5 border-cyan-200 rounded-full px-1.5 text-cyan-400"
            >{place}</span
          >
        {:else if place == "minds"}
          <span
            class="border mr-0.5 mb-0.5 border-yellow-200 rounded-full px-1.5 text-yellow-600"
            >{place}</span
          >
        {:else if place == "damus"}
          <span
            class="border mr-0.5 mb-0.5 border-red-200 rounded-full px-1.5 text-red-400"
            >{place}</span
          >
        {:else}
          <span
            class="border mr-0.5 mb-0.5 border-stone-300 rounded-full px-1.5 text-stone-500"
            >{place}</span
          >
        {/if}
      {/each}
    </div>
  {/if}
</div>
