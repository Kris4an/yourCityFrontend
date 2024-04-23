<script lang="ts">
	import Suggestion from '$lib/Suggestion.svelte';
	import type PublicSuggestion from '$lib/entities/PublicSuggestion';
	import { onMount } from 'svelte';

	import { PUBLIC_API_URL } from '$env/static/public';
	import Dropdown from '$lib/Dropdown.svelte';

	export let data: any;

	const orderOptionsBG = [
		'По дата (намаляващо)',
		'По дата (увеличаващо)',
		'По харесвания (намаляващо)',
		'По харесвания (увеличаващо)'
	];
	const orderOptions = ['dateDesc', 'dateAsc', 'likesDesc', 'likesAsc'];
	let refetch = false;
	let suggestions: PublicSuggestion[] = [];
	let page: number = 1;
	let order: string = 'По харесвания (намаляващо)';
	onMount(async () => {
		suggestions = data.suggestions;
	});
	$: order, (refetch = true), loadSuggestions();

	async function loadSuggestions() {
		if (refetch) {
			page = 1;
			suggestions = [];
			refetch = false;
			if (order === 'По харесвания (намаляващо)') {
				suggestions = data.suggestions;
				return;
			}
		}
		page = Math.floor(suggestions.length / 10) + 1;
		const orderR = orderOptions[orderOptionsBG.indexOf(order)];
		const res = await fetch(PUBLIC_API_URL + '/suggestion/all?page=' + page + '&order=' + orderR, {
			method: 'GET',
			credentials: 'include'
		});
		if (res.status == 200) {
			const s = await res.json();
			const temp = suggestions.concat(s);
			suggestions = temp.filter(
				(obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
			);
		}
	}
</script>

<div id="wrapper">
	<div id="title">
		ГЛАСУВАЙ ЗА<br />
		<b>НАЙ-ДОБРИТЕ</b> ИДЕИ
	</div>
	<Dropdown options={orderOptionsBG} bind:value={order} class="dropdown" />
	{#each suggestions as suggestion (suggestion.id)}
		<Suggestion {suggestion} />
	{/each}

	<button id="loadButton" on:click={loadSuggestions}>Още предложения, моля!</button>
</div>

<style>
	#wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4rem;
		padding-bottom: 4rem;
	}
	#title {
		background-color: var(--transparentBackground);
		width: 100%;
		text-align: center;
		font-family: 'Roboto';
		font-size: 50pt;
		color: var(--text);
		padding: 2rem 0px;
		user-select: none;
	}
	#title b {
		font-family: 'Roboto';
		font-size: 50pt;
		color: var(--vibrantPrimary);
	}
	#loadButton {
		font-family: 'Roboto';
		color: var(--text);
		background-color: var(--secondary);
		border: 5px solid var(--primary);
		border-radius: 10px;
		cursor: pointer;
		font-size: 16pt;
		padding: 1rem;
		transition: all 300ms ease-in-out;
	}
	#loadButton:hover {
		background-color: var(--transparentBackground);
	}
	#loadButton:active {
		background-color: var(--transparentBackground);
		scale: 95%;
	}
	#wrapper :global(.dropdown) {
		width: 20rem;
	}
	@media only screen and (max-width: 700px) {
		#title {
			font-size: 40pt;
		}
		#title b{
			font-size: 40pt;
		}
	}
</style>
