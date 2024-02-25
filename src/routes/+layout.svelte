<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

	<nav>
		<a href="/">Начало</a>
		<a href="/suggestion">Предложения</a>
		<a href="/suggestion/create">Направи предложение</a>
		<a href="/suggestion/approved">Одобрени предложения</a>
		{#await data}
			<span />
		{:then data}
			{#if data.user == null}
				<a href="/account/login">Влез</a>
			{:else}
				<a href="/account">Профил</a>
			{/if}
		{:catch}
			<a href="/login">Влез</a>
		{/await}
	</nav>
<slot />
<Footer />

<style>
	nav {
		position: sticky;
		top: 0;
		width: 100%;
		height: 4rem;
		background-color: var(--primary);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		z-index: 5;
		justify-self: end;
	}
	a {
		color: var(--text);
		text-decoration: none;
		font-family: 'Roboto';
		font-weight: 500;
		font-size: 16pt;
		transition: all ease-in-out 300ms;
		user-select: none;
		width: 100%;
		text-align: center;
	}
	a:hover {
		font-size: 18pt;
		font-weight: 700;
	}
	@media only screen and (max-width: 800px) {
		a{
			font-size: 14pt;
		}
		a:hover {
			font-size: 14pt;
		}
		nav{
			position: relative;
			height: auto;
			max-width: 100vw;
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
