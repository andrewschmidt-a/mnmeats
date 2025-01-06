<script lang=ts>
    import Poster from '$lib/assets/cowrun.png'
    import { assets } from '$app/paths';

    let {farm} = $props()
</script>

<div class="card bg-base-100 shadow-xl w-full">
    <figure>
      <img
        class="farmImg"
        src={`${assets}${farm.imageUrl}`}
        alt="cow" />
    </figure>
    <div class="card-body ">
      <h2 class="card-title">{farm.name}</h2>
      <p>{farm.city}, {farm.state}</p>
      <div>
        {#if farm.badges != null}
            {#each farm.badges as badge}
              <div class="badge badge-secondary mr-2 text-neutral badge-lg">{badge}</div>
            {/each}
        {/if}</div>
      <div class="card-actions justify-end">
        <!-- <button class="btn btn-primary">Buy a cow now!</button> -->
      </div>
    </div>
  </div>
  <style>
    .farmImg{
      height: 342px;
      width: 100%;
      object-fit: cover;
    }
  </style>