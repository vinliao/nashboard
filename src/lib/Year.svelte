<script>
  export let yearlyData;
  import Line from "svelte-chartjs/src/Line.svelte";

  let chartData = {
    datasets: [
      {
        data: yearlyData,
        borderColor: "#fdba74",
        backgroundColor: "#fff7ed",
        lineTension: 0.4,
        fill: true,
        pointBackgroundColor: '#FB923C'
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
          display: false,
        },
      },
    },
  };
</script>

<div class="p-5 border-2 border-orange-200 bg-white">
  <span
    class="block text-center pb-3 text-lg text-orange-500 font-bold tracking-tighter"
    >TOTAL UNIQUE EVENTS (1YR)</span
  >

  <Line data={chartData} {options} />
</div>
