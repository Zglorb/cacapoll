<script lang="ts">
    import { goto } from "$app/navigation";
	import CategoryCard from "$lib/categoryCard.svelte";
	import axios from "axios";
	import { browser } from '$app/environment'
	let chosenMovies : {title: string, poster_path: string}[] = [];
	let hasChosen = false
	let waiting = false

	let categories = [
		{
			title:"Coup de Coeur",
			thisYear: false,
			movie: true
		},
		{
			title:"Flop Film",
			thisYear: false,
			movie: true
		},
		{
			title:"Top Film",
			thisYear: false,
			movie: true
		}
	]
		
		async function vote() {
			if (isVoteEmpty()) return
			if (waiting) return
			waiting = true;
			(window as any).grecaptcha.ready(function() {
				(window as any).grecaptcha.execute('6LeYSU8pAAAAAAu26b2PxzggAFetHQxbQ3zXVYqr', {action: 'submit'}).then(async (token: string) => {
					axios.post("/api/vote", {chosenMovies, token})
					waiting = false
					window.localStorage.setItem("voted", "true")
					goto("/voted")
				});
			});
		}
		if (browser) {
			if (window.localStorage.getItem("voted") === "true") {
				goto("/voted")
			}
		}
		function isVoteEmpty() {
			for (let i = 0; i < chosenMovies.length; i++) {
				if (chosenMovies[i].title !== "") {
					return false
				}
			}
			return true
		}
		$: {
			console.log(chosenMovies);
			hasChosen = isVoteEmpty()
		}

</script>
<!-- svelte-ignore a11y-media-has-caption -->
<video class="h-24 absolute top-5 left-5" src="/logo.webm" autoplay/>
<div class="flex w-full justify-center items-center h-24">
	<h1 class="text-white text-4xl font-serif font-bold">CACA D'OR 2023</h1>
</div>
<div class="flex flex-wrap w-1/2 justify-center items-center mx-auto">
	{#each categories as category, index}
		<CategoryCard title={category.title} thisYear={category.thisYear} movie={category.movie} bind:selectedMovie={chosenMovies[index]} />
	{/each}
</div>

<div class="flex w-full justify-center items-center">
	{#if !hasChosen}
		<button data-sitekey="6LeYSU8pAAAAAAu26b2PxzggAFetHQxbQ3zXVYqr" data-callback='onSubmit' data-action='submit' class="g-recaptcha transition ease-in-out bg-black border text-amber-200 border-amber-200 rounded mt-5 h-10 w-20 hover:text-black hover:bg-amber-200" on:click={vote}>VOTER</button>
	{:else}
		<button class="bg-black border text-amber-200 border-amber-200 rounded mt-5 h-10 w-20" disabled={chosenMovies.length != 0} >VOTER</button>
	{/if}
</div>
