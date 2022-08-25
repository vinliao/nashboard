<script>
  export let number;
  export let label;
  import { tweened } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";

  const progress = tweened(0, {
    duration: 1500,
    easing: cubicInOut,
  });

  progress.set(number);
</script>

<div class="p-5 border-2 border-orange-200 bg-white">
  <span
    class="block text-center pb-1 text-lg text-orange-500 font-bold tracking-tighter"
    >{label}</span
  >
  <div class="text-center">
    <span class="text-4xl text-stone-700 tracking-[-0.075em]"
      >{Math.floor($progress)}</span
    >
  </div>
</div>
