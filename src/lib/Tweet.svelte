<script>
  import { format } from "timeago.js";
  export let time;
  export let message;
  export let pubkey;
</script>

<div class="p-3 mb-2">
  <div class="flex justify-between mb-2">
    <span>{pubkey.slice(0, 5) + "..." + pubkey.slice(-5)}</span>
    <span class="text-neutral-400">{format(time * 1000)}</span>
  </div>
  <p class="break-words text-neutral-600">
    {message}
  </p>
</div>
