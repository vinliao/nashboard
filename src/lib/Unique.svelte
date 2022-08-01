<script>
  export let count1h;
  export let count24h;
</script>

<div class="p-5 border-2 border-orange-200 bg-white">
  <span class="block text-center pb-1 text-sm text-orange-400 font-mono"
    >ACTIVE USERS 24H</span
  >
  <div class="text-center">
    <span class="text-4xl">{Math.floor(count24h / 3)}</span>
  </div>
</div>
