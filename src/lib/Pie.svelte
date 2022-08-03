<script>
  import Pie from "svelte-chartjs/src/Pie.svelte";
  export let kinds = {};
  const kindArr = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < kindArr.length; i++) {
    kindArr[i] = kinds[i] || 0;
  }
  const newKindArr = [kindArr[1], kindArr[4]];

  let data = {
    labels: ["post", "DM"],
    datasets: [
      {
        label: "Event types",
        data: newKindArr,
        backgroundColor: ["#FED7AA", "#A5F3FC"],
      },
    ],
  };
</script>

<div class="p-3 border-2 border-orange-200 bg-white">
  <span class="block text-center pb-3 text-lg text-orange-500 font-bold "
    >EVENT TYPES (24H)</span
  >
  <Pie {data} />
</div>
