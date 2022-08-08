<script>
  import { onMount, onDestroy } from "svelte";
  import { Chart } from "frappe-charts";

  let chartElem;
  let chart;

  /*

  if timestamp > day || timestamp < day+1
  timestamp = day
  unique events, not total events
  */

  const endDate = new Date("31 July 2022");
  let startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6);
  let data = {
    dataPoints: genData(),
    start: startDate, // a JS date object
    end: endDate,
  };

  function genData() {
    let tempDate = new Date(startDate);
    let output = {};
    for (var i = 0; i <= 365; i++) {
      // note that the outputdata must be in seconds, not the JS standard miliseconds.
      output[Math.floor(tempDate.getTime() / 1000)] = Math.floor(
        Math.random() * 100
      );
      tempDate.setDate(tempDate.getDate() + 1);
    }
    return output;
  }

  onMount(() => {
    chart = new Chart(chartElem, {
      discreteDomains: 0,
      type: "heatmap",
      data: data,
      colors: ["#f5f5f4", "#FED7AA", "#FB923C", "#EA580C", "#9A3412"],
    });
  });

  onDestroy(() => {
    chart = null;
  });
</script>

<div class="p-5 border-2 border-orange-200 bg-white">
  <span
    class="block text-center text-lg text-orange-500 font-bold tracking-tighter xl:mb-2"
    >NOSTR EVENTS (6MO)</span
  >
  <div class="flex justify-center scale-[0.8] heatmap-xxs:scale-[1] heatmap-xs:scale-[1.2] heatmap-xs:pb-2 xl:scale-[1.3] xl:pb-4">
    <div bind:this={chartElem} />
  </div>
</div>