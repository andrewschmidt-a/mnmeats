<script lang=ts>
    import FarmCard from '$lib/components/FarmCard.svelte'

    let {farmList} = $props()
    
	let width = $state(0);
	let numPerSlide = $derived.by(() => {
		if(width > 992)
		{
			return 4
		}else if (width > 768){
			return 3
		} else if (width > 640)
		{
			return 2
		}else {
			return 1
		}
	})
	let allSlides = $derived(Array.from({ length: Math.ceil(farmList.length/numPerSlide) }, (_, i) => i + 1))
</script>

<div class="carousel w-full" bind:clientWidth={width}>
	{#each allSlides as slideNum}
	<div id="slide{slideNum}" class="carousel-item relative w-full">
	  
	<div class="grid grid-cols-1 m-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
		{#each farmList.slice((slideNum-1)*numPerSlide,numPerSlide*slideNum) as farm}
		  <FarmCard farm={farm} />
		{/each}
	  </div>
	  <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
		<div>{#if slideNum != 1}<a href="#slide{slideNum-1}" class="btn ml-2 btn-circle">❮</a>{:else}{/if}</div>
		<div>{#if slideNum != allSlides.length}<a href="#slide{slideNum+1}" class="btn mr-2 btn-circle">❯</a>{:else}{/if}</div>
	  </div>
	</div>
	{/each}
  </div>