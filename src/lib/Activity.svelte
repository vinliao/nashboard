<script>
  let timeArr = [];

  for(let i = 0; i < 24; i++) {
    const stringUtc = "000" + i;
    const hour = stringUtc.slice(-2);
    timeArr.push(hour + ":00");
  }

</script>

<div class="rounded-md shadow border p-3">
	<span class="block text-center pb-3 text-xs text-neutral-400">NETWORK ACTIVITY (24H, UTC)</span>
	<div class="flex flex-col">
    {#each timeArr as time}
      <div class="flex p-2">
        <span class="flex-1 text-center text-neutral-500">{time}</span>
        <span class="flex-1 text-center text-neutral-500">24 events</span>
      </div>
    {/each}
  </div>
</div>