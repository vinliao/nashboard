<script>
  import Bar from "svelte-chartjs/src/Bar.svelte";
  import _ from "underscore";
  export let relayData;

  // note: it's 6 because beyond that it's too cramped
  const sortedCutoff = 6;
  const relays = Object.keys(relayData);

  let sorted = [];
  let relayList = [];
  let relayCount = [];
  let backgrounds = [];
  let allSortedRelays = [];

  // sort by event count
  relays.forEach((relay) => {
    // slice is for cutting "wss://"
    sorted.push([relay.slice(6), relayData[relay]]);
  });
  sorted.sort((a, b) => b[1] - a[1]);
  allSortedRelays = sorted;

  for (let i = 0; i < Math.min(sortedCutoff, sorted.length); i++) {
    relayList.push(sorted[i][0]); // cut the wss://
    relayCount.push(sorted[i][1]);
    if (i == 0) backgrounds.push("#fdba74");
    else if (i == 1) backgrounds.push("#FED7AA");
    else if (i == 2) backgrounds.push("#e7e5e4");
    else backgrounds.push("#F5F5F4");
  }

  const data = {
    labels: relayList,
    datasets: [
      {
        label: "Event count",
        data: relayCount,
        backgroundColor: backgrounds,
      },
    ],
  };

  const options = {
    aspectRatio: 0.75,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 16 }, color: "#a8a29e" },
      },
      y: {
        ticks: { font: { size: 12 }, color: "#57534e" },
        display: true,
        title: {
          display: true,
          text: "Event count",
          font: { size: 16 },
          color: "#a8a29e",
        },
      },
    },
  };

  let isExpanded = false;
  function toggleExpand() {
    if (isExpanded) isExpanded = !isExpanded;
    else isExpanded = !isExpanded;
  }
</script>

<div class="p-5 border-2 border-orange-200 bg-white">
  <span
    class="block text-center pb-3 text-lg text-orange-500 font-bold tracking-tighter"
    >MOST CROWDED RELAYS (24H)</span
  >
  <Bar {data} {options} />
  <!-- button -->
  {#if !isExpanded}
    <div class="flex mt-10">
      <div class="flex-1" />
      <div
        class="flex items-center space-x-1 hover:cursor-pointer"
        on:click={toggleExpand}
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

  {#if isExpanded}
    <div class="flex flex-col mt-10">
      <div class="flex justify-between text-stone-400 mb-2">
        <span>relay</span>
        <span>event count (24H)</span>
      </div>
      <div class="flex flex-col text-stone-500">
        {#each allSortedRelays as relay}
          <div class="flex justify-between">
            <span class="shrink-0">{relay[0]}</span>
            <!-- <div class="w-full border-b" /> -->
            <div class="w-full flex flex-col px-3">
              <div class="h-1/2 border-b" />
              <div class="h-1/2" />
            </div>

            <span>{relay[1]}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="flex mt-5">
      <div class="flex-1" />
      <div
        class="flex items-center space-x-1 hover:cursor-pointer"
        on:click={toggleExpand}
      >
        <span class="text-stone-500 font-mono tracking-widest">less</span>
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
            d="M5 15l7-7 7 7"
          />
        </svg>
      </div>
    </div>
  {/if}
</div>
