<script>
  // this component can be refactored
  export let networkActivity;
  import Line from "svelte-chartjs/src/Line.svelte";

  let timeArrAM = {};
  for (let i = 0; i < 12; i++) {
    const timeString = i.toString();
    const timeStringPlusOne = (i + 1).toString();
    if (networkActivity[timeString]) {
      timeArrAM[timeStringPlusOne] = networkActivity[timeString];
    } else timeArrAM[timeStringPlusOne] = 0;
  }

  let timeArrPM = {};
  for (let i = 12; i < 24; i++) {
    const timeStringOriginal = i.toString();
    const timeString = (i - 12).toString();
    const timeStringPlusOne = (i - 12 + 1).toString();
    if (networkActivity[timeString]) {
      timeArrPM[timeStringPlusOne] = networkActivity[timeStringOriginal];
    } else timeArrPM[timeStringPlusOne] = 0;
  }

  // uncomment in case it's useful
  // replace timeArrAM with dummyData
  // replace timeArrPM with dummyData2
  // timeArrAM = {
  //   "1": 10,
  //   "2": 6,
  //   "3": 5,
  //   "4": 12,
  //   "5": 3,
  //   "6": 5,
  //   "7": 7,
  //   "8": 9,
  //   "9": 1,
  //   "10": 2,
  //   "11": 1,
  //   "12": 3,
  // };

  // timeArrPM = {
  //   "1": 7,
  //   "2": 9,
  //   "3": 5,
  //   "4": 10,
  //   "5": 3,
  //   "6": 8,
  //   "7": 5,
  //   "8": 9,
  //   "9": 5,
  //   "10": 7,
  //   "11": 16,
  //   "12": 18,
  // };

  let data = {
    datasets: [
      {
        label: "AM",
        data: timeArrAM,
        borderColor: "#fdba74",
        backgroundColor: "#fff7ed",
        lineTension: 0.4,
      },
      {
        label: "PM",
        data: timeArrPM,
        borderColor: "#67e8f9",
        backgroundColor: "#ecfeff",
        lineTension: 0.4,
      },
    ],
  };

  const options = {
    aspectRatio: 1,
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
    scales: {
      x: {
        ticks: { font: { size: 12 }, color: "#57534e" },
        display: true,
        title: {
          display: true,
          text: "Hours",
          font: { size: 16 },
          color: "#a8a29e",
        },
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
  <span class="block text-center pb-3 text-lg text-orange-500 font-bold tracking-tighter"
    >NETWORK ACTIVITY (24H, UTC)</span
  >

  <Line {data} {options} />
</div>
