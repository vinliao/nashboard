<script>
  import Pie from "svelte-chartjs/src/Pie.svelte";
  export let kinds = {};
  const kindArr = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < kindArr.length; i++) {
    kindArr[i] = kinds[i] || 0;
  }

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
          "hsl(326, 85%, 90%)",
          "hsl(267, 85%, 90%)",
          "hsl(207, 85%, 90%)",
          "hsl(147, 85%, 90%)",
          "hsl(87, 85%, 90%)",
          "hsl(27, 85%, 90%)",
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
