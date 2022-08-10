<script>
  import { onMount, onDestroy } from "svelte";
  import { Chart } from "frappe-charts";
  import { heatmapData } from "$lib/heatmapData";

  let chartElem;
  let chart;

  const endDate = new Date("31 July 2022");
  let startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6);
  let data = {
    dataPoints: heatmapData,
    start: startDate,
    end: endDate,
  };

  onMount(() => {
    chart = new Chart(chartElem, {
      discreteDomains: 0,
      type: "heatmap",
      data: data,
      colors: ["#f5f5f4", "#FFF7ED", "#FED7AA", "#FB923C", "#EA580C"],
    });
  });

  onDestroy(() => {
    chart = null;
  });
</script>

<div class="p-5 border-2 border-orange-200 bg-white">
  <span
    class="block text-center text-lg text-orange-500 font-bold tracking-tighter xl:mb-2"
    >NOSTR EVENT COUNT</span
  >
  <div
    class="flex justify-center scale-[0.8] heatmap-xxs:scale-[1] heatmap-xs:scale-[1.2] heatmap-xs:pb-2 xl:scale-[1.3] xl:pb-4"
  >
    <div bind:this={chartElem} />
  </div>
</div>
