<script>
  import Bar from "svelte-chartjs/src/Bar.svelte";
  import _ from "underscore";
  import { slide, fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
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
    animation: false,
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
  {#if isExpanded}
    <div class="flex flex-col mt-5">
      <div
        class="flex justify-between text-stone-400 mb-2"
        transition:fly={{ y: -10, duration: 200, easing: cubicOut }}
      >
        <span>relay</span>
        <span>event count (24H)</span>
      </div>
      <div class="flex flex-col text-stone-500">
        {#each allSortedRelays as relay, i}
          <div
            class="flex justify-between"
            transition:fly={{
              y: -10,
              duration: 200,
              delay: i * 20,
              easing: cubicOut,
            }}
          >
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
  {/if}

  <!-- button -->
  {#if !isExpanded}
    <div class="flex mt-5">
      <div class="flex-1" />
      <div
        class="flex items-center space-x-1 hover:cursor-pointer"
        on:click={toggleExpand}
      >
        <span class="text-stone-500 font-mono tracking-widest">more</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5 text-stone-600"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  {/if}
</div>
