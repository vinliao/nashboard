<script>
  import Pie from "svelte-chartjs/src/Pie.svelte";

  export let kindArr;

  let data = {
    labels: [
      "metadata",
      "tweet",
      "relay share",
      "contact list",
      "encrypted msg",
      "other",
    ],
    datasets: [
      {
        label: "Event types",
        data: kindArr,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
      },
    ],
  };
</script>

<div class="rounded-md shadow p-3 bg-white">
  <span class="block text-center pb-3 text-sm text-neutral-400 font-mono"
    >EVENT TYPES (24H)</span
  >
  <Pie {data} />
</div>
