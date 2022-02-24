<script>
  export let time;
  export let message;
  export let pubkey;
  export let replied; // a reply object, containing another tweet
</script>

<div class="p-3 rounded-md">
  <div class="flex justify-between mb-2">
    <span class="font-bold">{pubkey}</span>
    <span class="text-slate-400">{time}</span>
  </div>
  {#if replied}
    <div class="my-1 pl-3 border-l-4 border-slate-800 rounded-md">
      <div class="flex justify-between">
        <span>anon said:</span>
        <div></div>
      </div>
      <div class="text-slate-500 break-words">{replied.message}</div>
    </div>
  {/if}
  <div class="mb-2 break-words">{message}</div>
</div>