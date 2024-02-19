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

<div>
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
</div>
<slot />
<Footer />

<style>
	div {
		position: sticky;
		top: 0;
		width: 100%;
		height: 4rem;
		background-color: var(--primary);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		z-index: 5;
		justify-self: end;
	}
	nav {
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 100%;
	}
	a {
		color: var(--text);
		text-decoration: none;
		font-family: 'Roboto';
		font-weight: 500;
		font-size: 20px;
		transition: all ease-in-out 300ms;
		user-select: none;
		width: 100%;
		text-align: center;
	}
	a:hover {
		font-size: 24px;
		font-weight: 700;
	}
</style>
