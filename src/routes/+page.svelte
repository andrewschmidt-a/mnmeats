<script lang="ts">
	import Farms from '$lib/components/Farms.svelte';
    import FarmBackground from '$lib/assets/wisconsin-1826836.jpg'
	import MeatCalculator from '$lib/components/MeatCalculator.svelte';
	let { data } = $props();
  </script>
  <div
  class="hero min-h-96"
  style="background-image: url({FarmBackground});">
  <div class="hero-overlay bg-opacity-40"></div>
  <div class="hero-content text-neutral-content text-center">
    <div class="max-w-lg">
      <h1 class="mb-5 text-5xl text-base-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Tired of meat with added junk?</h1>
      <p class="mb-5 text-6xl font-bold text-base-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        Eat local!
      </p>
      <!-- <button class="btn btn-primary">Get Started</button> -->
    </div>
  </div>
</div>
<div class="col-span-2 hidden md:block"></div>
<div class="col-span-12 md:col-span-8 bg-secondary p-5 sm:p-12">
	<div class="card bg-base-100  shadow-xl">
		<div class="card-body">
			<div class="card-title">Cost Calculator</div>
			<MeatCalculator></MeatCalculator>
		</div>
	</div>
</div>
<div class="grid grid-cols-12 pb-5 pl-5 pr-5 bg-secondary">
	<div class="col-span-4 hidden md:block"></div>
<div class="col-span-12 md:col-span-4">
	<button class="btn w-full">Lets go!</button>
</div>
</div>
<div>
<Farms farmList={data.farmList} />
</div>