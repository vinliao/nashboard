<script>
  // this component can be refactored
  export let networkActivity;

  let timeArrFirst = [];
  let timeArrSecond = [];
  for (let i = 0; i < 12; i++) {
    const stringUtc = "000" + i;
    const hour = stringUtc.slice(-2);
    timeArrFirst.push(hour + ":00—");
  }
  for (let i = 12; i < 24; i++) {
    const stringUtc = "000" + i;
    const hour = stringUtc.slice(-2);
    timeArrSecond.push(hour + ":00—");
  }
</script>

<div class="rounded-md shadow p-3 bg-white">
  <span class="block text-center pb-3 text-sm text-neutral-400 font-mono"
    >NETWORK ACTIVITY (24H, UTC)</span
  >
  <div class="flex px-4">
    <div class="flex flex-col flex-1">
      {#each timeArrFirst as time, i}
        <div class="flex p-2">
          <span class="text-neutral-400">{time}</span>
          <span class="text-neutral-500 self-start"
            >{networkActivity[i] || 0} evt</span
          >
        </div>
      {/each}
    </div>
    <div class="flex flex-col flex-1">
      {#each timeArrSecond as time, i}
        <div class="flex p-2">
          <span class="text-neutral-400">{time}</span>
          <span class="text-neutral-500"
            >{networkActivity[i + 12] || 0} evt</span
          >
        </div>
      {/each}
    </div>
  </div>
</div>
