<script>
  export let time;
  export let message;
  export let pubkey;
  export let depth = 0;
  // TODO: set border color depending on depth
</script>

<div class="" style:padding-left={depth * 0.75 + "rem"}>
  <div class="border-l-4 border-slate-800 p-3 my-1 ml-3 rounded-md">
    <div class="flex justify-between mb-2">
      <span class="font-bold">{pubkey}</span>
      <span class="text-slate-400">{time}</span>
    </div>
    <div class="mb-2 break-words">{message}</div>
  </div>
</div>