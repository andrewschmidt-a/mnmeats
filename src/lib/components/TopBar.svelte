<script lang=ts>
	import { signIn, signOut } from "@auth/sveltekit/client";
  	import Icon from "$lib/assets/mnmeats.jpg"

let { session, baseUrl } = $props();
</script>


<div class="navbar bg-secondary text-base-100 shadow-lg">
    <div class="flex-1">
      <a class="btn btn-ghost hover:bg-transparent" href="/"><img class="w-16" src={Icon} alt="logo"/><span class="text-xl md:text-2xl">Minnesota Meat Market</span></a>
    </div>
    <div class="flex-none">
      {#if session?.user}
      <div class="dropdown dropdown-end dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <!-- svelte-ignore a11y_img_redundant_alt -->
            <img
              alt="Profile image"
              src={session.user.image} />
          </div>
        </div>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content bg-secondary rounded-box z-[1] mt-3 w-52 p-1 shadow">
          <li>
            <button class="btn-sm btn btn-secondary hover:bg-transparent hover:border-none hover:shadow-none no-animation" onclick={()=>{signOut({callbackUrl: `${baseUrl}/logout`, redirect: true})}}>Log out</button>
          </li>
        </ul>
      </div>
      {:else}
      <button onclick={()=>signIn('auth0')} class="btn btn-primary">Sign In</button>
      {/if}
    </div>
  </div>