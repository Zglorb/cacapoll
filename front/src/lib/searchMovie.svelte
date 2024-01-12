<script lang="ts">
    import { createEventDispatcher } from "svelte";

	export let thisYear = false;
	export let movie = true;
	let searchTerm = '';
	let results: string | any[] = [];
	const dispatch = createEventDispatcher();
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmZjZjUwMWZkODk1YmE3YzRkZDA5OTAzMDMzOTNkNiIsInN1YiI6IjY1OWQ0YWY2YzQ5MDQ4MDFmZTQ4OTkyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zsDWPS4kYXRec1N1mkvH8HxxTNHF2OvT2Z1Ibakkwto'
		}
	};

	async function searchMovies() {
		// Make API request to TMDB with searchTerm
		const response = await fetch(`https://api.themoviedb.org/3/search/${movie ? 'movie' : 'tv'}?query=${searchTerm}&language=fr-FR&page=1${thisYear? movie ? '&primary_release_year=2023' :'&first_air_date_year=2023' : ''}`, options);
		const data = await response.json();

		// Handle the response data
		console.log(data);
		results = data.results.slice(0, 6);
	}
	searchMovies();
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			searchMovies();
		}
	}

	function selectMovie(movie: {title: string, poster_path: string, name?: string}) {
		console.log(movie);
		if (movie.name) movie.title = movie.name;
		dispatch('selectMovie', movie);
	}
</script>

<div class="w-full">
	<div class="flex justify-center h-10">
		<input class="w-full" type="text" bind:value={searchTerm} placeholder="Search movies..." on:keydown={handleKeyDown} />
		<button class="bg-gray-400 px-2" on:click={searchMovies}>Rechercher</button>
	</div>
	<div class="flex flex-wrap w-full">
		{#if results.length > 0}
			{#each results as result}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div style="aspect-ratio: 2/3;" class="movie-card w-1/3 flex flex-col items-center cursor-pointer justify-between relative" on:click={() => {selectMovie(result)}}>
					<img class="h-full w-full absolute" src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} alt={result.title} />
					<div class="absolute text-white bottom-0 bg-black/75 w-full text-center">
						<h2>{movie ? result.title: result.name}</h2>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
.movie-card:hover{
	background-color: #353535;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
	transition: transform 0.3s ease-in-out;
}
</style>
