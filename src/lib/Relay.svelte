<script>
  import Bar from "svelte-chartjs/src/Bar.svelte";
  import _ from "underscore";
  export let relayData;

  // note: it's 6 because beyond that it's too cramped
  const sortedCutoff = 6
  const relays = Object.keys(relayData);

  let sorted = [];
  let relayList = [];
  let relayCount = [];
  let backgrounds = [];

  // sort by event count
  relays.forEach((relay) => {
    sorted.push([relay, relayData[relay]]);
  });
  sorted.sort((a, b) => b[1] - a[1]);

  for (let i = 0; i < Math.min(sortedCutoff, sorted.length); i++) {
    relayList.push(sorted[i][0].slice(6)); // cut the wss://
    relayCount.push(sorted[i][1]);
    if (i == 0) backgrounds.push("#a5f3fc");
    else if (i == 1) backgrounds.push("#fdba74");
    else if (i == 2) backgrounds.push("#d6d3d1");
    else backgrounds.push("#e7e5e4");
  }

  const data = {
    labels: relayList,
    datasets: [
      {
        label: "Event count",
        data: relayCount,
        backgroundColor: backgrounds,
      },
    ],
  };

  const options = {
    aspectRatio: 0.75,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 16 }, color: "#a8a29e" },
      },
      y: {
        ticks: { font: { size: 16 }, color: "#57534e" },
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

<div class="p-3 border-2 border-orange-200 bg-white">
  <span
    class="block text-center pb-3 text-lg text-orange-500 font-bold tracking-tighter"
    >MOST CROWDED RELAYS (24H)</span
  >
  <Bar {data} {options} />
</div>
