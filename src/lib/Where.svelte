<script>
  // format: [id, [relays1, relay2]]
  export let where;
  const totalWhere = 7; // how much data to display, default is 20

  let ids = [];
  let appearedIn = [];

  for (let i = 0; i < totalWhere; i++) {
    ids.push(where[i][0]);
    appearedIn.push(where[i][1]);
  }
</script>

<div class="p-5 border-2 border-orange-200 bg-white">
  <span
    class="block text-center pb-5 text-lg text-orange-500 font-bold tracking-tighter"
    >EVENT LIVES WHERE?</span
  >
  <div class="flex justify-between text-stone-500">
    <span>event id</span>
    <span>found in</span>
  </div>
  {#each ids as id, index}
    <div class="tracking-tighter flex justify-between mb-10">
      <span class="text-stone-700">{id.slice(0, 23) + "..."}</span>
      <div class="flex flex-col text-right text-stone-500 space-y-1 items-end">
        {#each appearedIn[index] as place}
          {#if place == "damus"}
            <span
              class="bg-purple-50 border-2 border-purple-200 rounded-md px-1 text-purple-600"
              >{place}</span
            >
          {:else if place == "wellorder pub"}
            <span
              class="bg-cyan-50 border-2 border-cyan-200 rounded-md px-1 text-cyan-500"
              >{place}</span
            >
          {:else if place == "minds"}
            <span
              class="bg-yellow-50 border-2 border-yellow-200 rounded-md px-1 text-yellow-600"
              >{place}</span
            >
          {:else if place == "oxtr"}
            <span
              class="bg-red-50 border-2 border-red-200 rounded-md px-1 text-red-400"
              >{place}</span
            >
          {:else}
            <span class="bg-stone-50 border-2 border-stone-200 rounded-md px-1"
              >{place}</span
            >
          {/if}
        {/each}
      </div>
    </div>
  {/each}

  <!-- active: text stone 800, arrow stone 500 -->
  <div class="flex cursor-not-allowed">
    <div class="flex-1" />
    <div class="flex items-center space-x-1">
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
