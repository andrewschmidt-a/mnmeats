<script lang="ts">
	import { i18n } from "$lib/i18n";
	import { ParaglideJS } from "@inlang/paraglide-sveltekit";
	import '../app.css';
	import TopBar from "$lib/components/TopBar.svelte";
	let { children, data } = $props();
</script>

<ParaglideJS {i18n}>
	<div class="fixedEl"><TopBar session={data.session} baseUrl={data.baseUrl}></TopBar></div>
	{@render children()}
	<footer class="footer footer-center bg-accent text-base-100 p-4">
		<aside>
		  <p>Copyright © {new Date().getFullYear()} - All right reserved by Nemcrunchers LLC</p>
		</aside>
	  </footer>
</ParaglideJS>

<style>
	:global(body){
		min-height:100vh !important;
	}
	.fixedEl {
		position:fixed;
		top:0;
		width:100%;
		z-index:100;
	}
</style>