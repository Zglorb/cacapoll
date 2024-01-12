<script>
</script>

<style>
	.caca {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100%;
		background-color: black;
	}

	.video-container {
		width: 50%;
	}

	.message {
		color: white;
		font-family: serif;
		font-size: 24px;
		text-align: center;
	}
</style>

<div class="caca">
	<div class="video-container">
		<!-- svelte-ignore a11y-media-has-caption -->
		<video autoplay loop width="100%">
			<source src="/logo.webm" type="video/webm" />
		</video>
	</div>
	<p class="message">Merci d'avoir voté, rendez-vous sur la chaine de Grimkujow pour les résultats</p>
</div>
