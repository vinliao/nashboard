<script>
  import Bar from "svelte-chartjs/src/Bar.svelte";
  export let kinds = {};
  const kindArr = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < kindArr.length; i++) {
    kindArr[i] = kinds[i] || 0;
  }
  const newKindArr = [kindArr[1], kindArr[4]];

  let data = {
    labels: ["@ottoman", "@minds", "@superfan1", "@somename", "@david"],
    datasets: [
      {
        label: "Total post",
        data: [20, 19, 16, 14, 11],
        backgroundColor: [
          "#FED7AA",
          "#FED7AA",
          "#FED7AA",
          "#FED7AA",
          "#FED7AA",
        ],
        indexAxis: 'y',
      },
    ],
  };
</script>

<div class="p-3 border-2 border-orange-200 bg-white">
  <span class="block text-center pb-3 text-lg text-orange-400 font-anton"
    >FREQUENT POSTERS (24H)</span
  >
  <Bar {data} />
</div>
