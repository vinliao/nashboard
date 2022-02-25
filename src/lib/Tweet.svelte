<script>
  export let time;
  export let message;
  export let pubkey;
  export let replied; // a reply object, containing another tweet
</script>

<div class="p-3 rounded-md">
  <div class="flex justify-between mb-2">
    <span>{pubkey}</span>
    <span class="text-neutral-400">{time}</span>
  </div>
  {#if replied}
    <div class="my-1 pl-3 border-l-4 border-slate-800 rounded-md">
      <div class="flex justify-between">
        <span class="text-sm">{replied.pubkey}</span>
        <div></div>
      </div>
      <div class="text-neutral-400 text-sm break-words">{replied.message}</div>
    </div>
  {/if}
  <div class="mb-2 break-words text-neutral-600">{message}</div>
</div>