<script>
  // export let number;

  let ids = [
    "8f96ca7990e9e3b069b0fa3341092b0b15b1ece54b5972647e563a2f9c79147f",
    "81dc9bdb52d04dc20036dbd8313ed055",
    "81dc9bdb52d04dc20036dbd8313ed055",
    "81dc9bdb52d04dc20036dbd8313ed055",
    "81dc9bdb52d04dc20036dbd8313ed055",
  ];
  let appearedIn = [
    ["relayer fiatjaf", "damus"],
    ["wellorder pub", "relayer fiatjaf"],
    ["private relay"],
    ["damus", "wellorder pub"],
    ["damus"],
  ];
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
    <div class="tracking-tighter flex justify-between pb-7">
      <!-- <span class="break-words shrink81dc9bdb52d04dc20036dbd8313ed055">{id}</span> -->
      <span class="text-stone-700"
        >{id.slice(0, 10) + "..." + id.slice(-10)}</span
      >
      <div class="flex flex-col text-right text-stone-500 space-y-1 items-end">
        {#each appearedIn[index] as place}
          <span class="bg-stone-50 border-2 border-stone-200 rounded-md px-1">{place}</span>
        {/each}
      </div>
    </div>
  {/each}

  <div class="flex">
    <div class="flex-1" />
    <div class="flex items-center space-x-1">
      <span class="text-stone-800 font-mono tracking-widest">more</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-stone-500"
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
