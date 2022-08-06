<script>
  import Pie from "svelte-chartjs/src/Pie.svelte";

  export let kinds = {};
  let kind1 = 0;
  let kind4 = 0;
  let kindOthers = 0;

  const kindNumbers = Object.keys(kinds);
  kindNumbers.forEach((key) => {
    if (key == "1") kind1 = kinds[key];
    else if (key == "4") kind4 = kinds[key];
    else kindOthers = kindOthers + kinds[key];
  });

  let data = {
    labels: ["kind 1", "kind 4", "others"],
    datasets: [
      {
        label: "Event types",
        data: [kind1, kind4, kindOthers],
        backgroundColor: ["#FED7AA", "#A5F3FC", "#d6d3d1"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
          },
          color: '#57534e'
        },
      },
    },
  };
</script>

<div class="p-5 border-2 border-orange-200 bg-white">
  <span class="block text-center mb-3 text-lg text-orange-500 font-bold tracking-tighter"
    >EVENT KINDS (24H)</span
  >
  <Pie {data} {options} />
</div>
