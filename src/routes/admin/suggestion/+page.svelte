<script lang="ts">
	import Checkbox from '$lib/Checkbox.svelte';
	import Dropdown from '$lib/Dropdown.svelte';
	import AdminSuggestionComponent from '$lib/AdminSuggestionComponent.svelte';
	import type AdminSuggestion from '$lib/entities/AdminSuggestion';
	import type { PageData } from './$types';
	
	import { PUBLIC_API_URL } from '$env/static/public';

	const sortOptionsBG = [
		'По дата намаляващо',
		'По дата увеличаващо',
		'По харесвания намаляващо',
		'По харесвания увеличаващо'
	];
	const sortOptions = ['dateDesc', 'dateAsc', 'likesDesc', 'likesAsc'];
	let sort = 'По дата намаляващо';
	let page = 1;
	let statusFilter = {
		waiting: true,
		accepted: true,
		denied: true,
		hidden: true
	};
	let refetch = false;
	let suggestions: AdminSuggestion[] = [];

	$: statusFilter, sort, (refetch = true);

	async function getSuggestions() {
		page = Math.floor(suggestions.length / 10) + 1;
		if (refetch) {
			suggestions = [];
			page = 1;
			refetch = false;
		}
		const sortR = sortOptions[sortOptionsBG.indexOf(sort)];
		let statusF = '';
		if (statusFilter.waiting) statusF += '&filter=waiting';
		if (statusFilter.accepted) statusF += '&filter=accepted';
		if (statusFilter.denied) statusF += '&filter=denied';
		if (statusFilter.hidden) statusF += '&filter=hidden';
		const res = await fetch(
			PUBLIC_API_URL + '/admin/suggestion/all?page=' + page + '&sort=' + sortR + statusF,
			{
				method: 'GET',
				credentials: 'include'
			}
		);
		if (res.status == 200) {
			const s = await res.json();
			const temp = suggestions.concat(s);
			suggestions = temp.filter(
				(obj, index, self) => index === self.findIndex((o) => o.suggestionId === obj.suggestionId)
			);
		}
	}
</script>

<div id="holder">
	<h1>Управление на предложенията</h1>
	<div id="filterHolder">
		<Dropdown placeholder="Наредени по" bind:value={sort} options={sortOptionsBG} />
		<span>Филтър за статуса</span>
		<Checkbox bind:isChecked={statusFilter.waiting} text="Изчакващи" />
		<Checkbox bind:isChecked={statusFilter.accepted} text="Одобрени" />
		<Checkbox bind:isChecked={statusFilter.denied} text="Отхвърлени" />
		<Checkbox bind:isChecked={statusFilter.hidden} text="Скрити" />
		<button on:click={getSuggestions}>Зареди предложения</button>
	</div>

	<div id="suggestionHolder">
		{#each suggestions as suggestion (suggestion.suggestionId)}
			<AdminSuggestionComponent {suggestion} />
		{/each}
		<button on:click={getSuggestions}>Зареди предложения</button>
	</div>
</div>

<style>
	#holder {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: white;
		padding: 0px 1rem;
		gap: 1rem;
	}
	#filterHolder {
		width: 100%;
		display: flex;
		flex-direction: row;
		gap: 1rem;
		flex-wrap: wrap;
		align-items: center;
	}
	#filterHolder span {
		font-family: 'Roboto';
		font-size: 14pt;
		color: var(--secondary);
	}
	h1 {
		color: var(--secondary);
		font-family: 'Roboto';
	}
	#suggestionHolder {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		width: 100%;
		padding-bottom: 3rem;
	}
	button {
		background-color: var(--secondary);
		color: var(--text);
		font-family: 'Roboto';
		font-size: 16pt;
		width: fit-content;
		border-radius: 10px;
		border: 2px solid var(--secondary);
		padding: 5px;
		cursor: pointer;
		align-self: center;
	}
</style>
