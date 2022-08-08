<script>
  import { format } from "timeago.js";
  export let time;
  export let message;
  export let pubkey;
  export let foundIn;

  // shuffle foundIn because why not
  // foundIn = _.shuffle(foundIn)
  // for (let i = 0; i < foundIn.length; i++) {
  //   foundIn[i] = _.shuffle(foundIn[i]);
  // }
</script>

<div class="mb-10">
  <div class="flex justify-between mb-2">
    <span class="text-stone-600 font-semibold"
      >{pubkey.slice(0, 5) + "..." + pubkey.slice(-5)}</span
    >
    <span class="text-stone-400">{format(time * 1000)}</span>
  </div>
  <p class="break-words text-stone-500  mb-2">
    {message}
  </p>
  <div class="flex text-sm flex-wrap">
    {#each foundIn as place}
      {#if place == "wellorder"}
        <span
          class="border mr-0.5 mb-0.5 border-cyan-200 rounded-md px-1 text-blue-400"
          >{place}</span
        >
      {:else if place == "minds"}
        <span
          class="border mr-0.5 mb-0.5 border-yellow-200 rounded-md px-1 text-yellow-600"
          >{place}</span
        >
      {:else if place == "damus"}
        <span
          class="border mr-0.5 mb-0.5 border-red-200 rounded-md px-1 text-red-400"
          >{place}</span
        >
      {:else}
        <span
          class="border mr-0.5 mb-0.5 border-stone-300 rounded-md px-1 text-stone-500"
          >{place}</span
        >
      {/if}
    {/each}
  </div>
</div>
