<script lang="ts">
	import SearchMovie from "$lib/searchMovie.svelte";
	export let title : string;
	export let thisYear = false;
	export let movie = true;
	let toggle = false;
	export let selectedMovie = {title: "", poster_path: ""};
	function selectMovie(event: CustomEvent<{title: string, poster_path: string }>) {
		console.log(event.detail);
		selectedMovie = event.detail;
		toggle = false;
	}
</script>

<div class="flex flex-col items-center mx-5">
	<h1 class="title text-white">{title}</h1>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="card" on:click={() => toggle = !toggle}>
		{#if selectedMovie.poster_path}
		<div style="width: 200px;height: 300px; border-radius: 10px;" class="relative">
			<img style="width: 200px;height: 296px;border-radius: 10px;top:2px" class="absolute w-10" src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} />
			<div class="absolute bottom-0 text-white w-full bg-black/75 text-center">
				<p>{selectedMovie.title}</p>
			</div>
		</div>
		{:else}
			<span class="plus">+</span>
		{/if}
	</div>
</div>


{#if toggle}
	<div class="fixed top-0 w-screen h-screen flex justify-center items-center z-10">
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="absolute w-full h-full bg-black/75 z-10" on:click={() => toggle = !toggle}></div>
		<div style="background-color: black; border: 2px solid white;"
			class="
				w-1/3
				min-w-80
				flex
				justify-center
				align-center
				rounded
				z-10">
			<SearchMovie on:selectMovie={selectMovie} thisYear={thisYear} movie={movie}/>
		</div>
	</div>
{/if}

<style>
	.card {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 200px;
		height: 300px;
		border-radius: 10px;
		background-color: black;
		transition: transform 0.3s ease-in-out;
		border: 2px solid white;
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
	}

	.card:hover {
		transform: scale(1.05);
		cursor: pointer;
	}

	.plus {
		font-size: 48px;
		color: white;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
	}
</style>
