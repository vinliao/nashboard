<script>
	import Tweet from "$lib/Tweet.svelte";
	import Reply from "$lib/Reply.svelte";
</script>

<section class="p-3">
	<p>this page is for prototyping ui</p>
	<div class="mb-5" />

	<!-- start here -->
	<div class="border w-1/3 p-5 mb-1 rounded-md">
		<div class="flex justify-between">
			<span class="font-bold">007b1...3dd56 (clickable)</span>
			<span class="text-slate-400">2 minutes ago</span>
		</div>
		<!-- <div class="my-1 pl-3 border-l-4 border-red-800">
			<div class="flex justify-between">
				<span>anon said:</span>
				<div></div>
			</div>
			<div class="font-light text-slate-600 break-words">{replied.message}</div>
		</div> -->
		<div class="mb-2 break-words">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus laboriosam nulla laborum
			numquam nobis reprehenderit debitis necessitatibus nihil facere! Beatae, rem nobis, sed
			nostrum impedit illum illo recusandae facere quia modi cumque. Libero id odit reprehenderit
			laborum vel saepe. Quo voluptatibus, dolorem repellat ut harum iure quisquam vitae corrupti
			ullam repellendus, eaque laborum eos, modi laudantium quod in sit quia! (both card and profile
			are clickable)
		</div>
	</div>
	<div class="border w-1/3 p-5 rounded-md">
		<div class="flex justify-between">
			<span class="font-bold">007b1...3dd56</span>
			<span class="text-slate-400">2 minutes ago</span>
		</div>
		<div class="my-1 pl-3 border-l-4 border-slate-800">
			<div class="flex justify-between">
				<span>3ca29...4faa3</span>
				<div />
			</div>
			<div class="text-slate-500 break-words">short replied message (entire reply clickable)</div>
		</div>
		<div class="mb-2 break-words">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus laboriosam nulla laborum
			numquam nobis reprehenderit debitis necessitatibus nihil facere! Beatae, rem nobis, sed
			nostrum impedit illum illo recusandae facere quia modi cumque. Libero id odit reprehenderit
			laborum vel saepe. Quo voluptatibus, dolorem repellat ut harum iure quisquam vitae corrupti
			ullam repellendus, eaque laborum eos, modi laudantium quod in sit quia!
		</div>
	</div>

	<p class="py-5">now another expeirment</p>
	<div class="w-1/5 rounded-md p-3 mb-5 shadow-lg border">
		<span class="text-center block mb-5">Total events</span>
		<div class="flex mb-5">
			<div class="flex-1 px-5">
				<span class="block text-right text-slate-500">1h</span>
				<span class="block text-right text-5xl font-bold">30</span>
			</div>
			<div class="flex-1 px-5">
				<span class="block text-slate-500">24h</span>
				<span class="block text-5xl font-bold">999</span>
			</div>
		</div>
		<div class="flex">
			<div class="flex-1 px-5">
				<span class="block text-right text-slate-500">3d</span>
				<span class="block text-right text-5xl font-bold">3038</span>
			</div>
			<div class="flex-1 px-5">
				<span class="block text-slate-500">1w</span>
				<span class="block text-5xl font-bold">12009</span>
			</div>
		</div>
	</div>

	<div class="border w-1/5 rounded-md p-5 mb-5">
		<span class="text-center block mb-5">Network activity (24h)</span>
		<div class="flex flex-col">
			<div class="flex p-2">
				<span class="flex-1 text-slate-400">Time (UTC)</span>
				<span class="flex-1 text-slate-400">Number of events</span>
			</div>
			{#each Array(5) as _}
				<div class="flex p-2 border-b">
					<span class="flex-1">16</span>
					<span class="flex-1">24</span>
				</div>
			{/each}
		</div>
	</div>

	<div class="border w-1/5 rounded-md bg-slate-50 shadow-lg">
		<span class="text-center block py-3 text-slate-600">Network activity (24h)</span>
		<div class="flex flex-col p-5 bg-white">
			<div class="flex p-2">
				<span class="flex-1 text-slate-400">Time (UTC)</span>
				<span class="flex-1 text-slate-400">Number of events</span>
			</div>
			{#each Array(5) as _}
				<div class="flex p-2">
					<span class="flex-1">16</span>
					<span class="flex-1">24</span>
				</div>
			{/each}
		</div>
	</div>

	<p class="p-5">another experiment</p>
	<div class="border w-1/3 p-5 mb-3 rounded-md">
		<div class="flex justify-between">
			<span class="font-bold">007b1...3dd56 (clickable)</span>
			<span class="text-slate-400">2 minutes ago</span>
		</div>
		<div class="mb-2 break-words">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus laboriosam nulla laborum
			numquam nobis reprehenderit debitis necessitatibus nihil facere! Beatae, rem nobis, sed
			nostrum impedit illum illo recusandae facere quia modi cumque. Libero id odit reprehenderit
			laborum vel saepe. Quo voluptatibus, dolorem repellat ut harum iure quisquam vitae corrupti
			ullam repellendus, eaque laborum eos, modi laudantium quod in sit quia! (both card and profile
			are clickable)
		</div>
	</div>
	
	<div class="border-l-4 border-slate-800 w-1/3 p-5 my-1 rounded-md">
		<div class="flex justify-between">
			<span class="font-bold">007b1...3dd56 (clickable)</span>
			<span class="text-slate-400">2 minutes ago</span>
		</div>
		<div class="mb-2 break-words">reply one this is the reply component, set padding left programmatically and add the color</div>
	</div>

	<div class="border-l-4 border-slate-800 ml-3 w-1/3 p-5 my-1 rounded-md">
		<div class="flex justify-between">
			<span class="font-bold">007b1...3dd56 (clickable)</span>
			<span class="text-slate-400">2 minutes ago</span>
		</div>
		<div class="mb-2 break-words">
			reply two Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt qui quas possimus
			consequuntur voluptas repellendus hic ipsum molestias veritatis voluptatem.
		</div>
	</div>

	<div class="border-l-4 border-slate-800 w-1/3 p-5 rounded-md">
		<div class="flex justify-between">
			<span class="font-bold">007b1...3dd56 (clickable)</span>
			<span class="text-slate-400">2 minutes ago</span>
		</div>
		<div class="mb-2 break-words">another parent reply</div>
	</div>
	<div class="border-l-4 border-slate-800 ml-3 w-1/3 p-5 rounded-md">
		<div class="flex justify-between">
			<span class="font-bold">007b1...3dd56 (clickable)</span>
			<span class="text-slate-400">2 minutes ago</span>
		</div>
		<div class="mb-2 break-words">
			reply two Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt qui quas possimus
			consequuntur voluptas repellendus hic ipsum molestias veritatis voluptatem.
		</div>
	</div>
	<div class="border-l-4 border-slate-800 ml-3 w-1/3 p-5 rounded-md">
		<div class="flex justify-between">
			<span class="font-bold">007b1...3dd56 (clickable)</span>
			<span class="text-slate-400">2 minutes ago</span>
		</div>
		<div class="mb-2 break-words">
			child reply child reply
		</div>
	</div>

	<p>from lib</p>
	<Tweet/>
	<Tweet/>
	<Tweet/>
	<Reply/>
	<Reply/>
	<Reply/>
</section>
