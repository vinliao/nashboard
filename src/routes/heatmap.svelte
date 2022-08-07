<script>
  import { onMount, onDestroy } from "svelte";
  import { Chart } from "frappe-charts";

  let chartElem;
  let chart;

  const endDate = new Date("31 July 2022");
  let startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6);
  let data = {
    dataPoints: {
      "1426744959": 20,
      "1463673055": 113,
      "1476892421": 57,
    },
    start: startDate, // a JS date object
    end: endDate,
  };

  onMount(() => {
    chart = new Chart(chartElem, {
      discreteDomains: 0,
      type: "heatmap",
      data: data,
      colors: ["#ffedd5", "#fdba74", "#f97316", "#c2410c", "#7c2d12"],
    });
  });

  onDestroy(() => {
    chart = null;
  });
</script>

<div bind:this={chartElem} />
