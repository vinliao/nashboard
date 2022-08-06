<script>
  import { format } from "timeago.js";
  export let time;
  export let message;
  export let pubkey;
</script>

<div class="mb-10">
  <div class="flex justify-between mb-2">
    <span class="text-stone-600 font-semibold">{pubkey.slice(0, 7) + "..." + pubkey.slice(-7)}</span>
    <span class="text-stone-400">{format(time * 1000)}</span>
  </div>
  <p class="break-words text-stone-500">
    {message}
  </p>
</div>
