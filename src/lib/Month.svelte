<script>
  import Line from "svelte-chartjs/src/Line.svelte";
  import { monthlyData } from "$lib/monthlyData";

  let data = {
    datasets: [
      {
        label: "AM",
        data: monthlyData,
        borderColor: "#fdba74",
        backgroundColor: "#fff7ed",
        lineTension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    aspectRatio: 1,
    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        display: false,
      },
      y: {
        ticks: { font: { size: 12 }, color: "#57534e", precision: 0 },
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
</script>

<div class="p-5 border-2 border-orange-200 bg-white">
  <span
    class="block text-center pb-3 text-lg text-orange-500 font-bold tracking-tighter"
    >MONTHLY NETWORK ACTIVITY</span
  >

  <Line {data} {options} />
</div>
