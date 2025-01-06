<script>
    import MeatCalculator from "$lib/components/MeatCalculator.svelte";
</script>

<div class="grid grid-cols-12">
    <div class="col-span-2 hidden md:block"></div>
    <div class="col-span-12 md:col-span-8">
        <div class="card bg-base-100 mt-24  shadow-xl">
            <div class="card-body">
                <MeatCalculator></MeatCalculator>
            </div>
          </div>
    </div>
</div>