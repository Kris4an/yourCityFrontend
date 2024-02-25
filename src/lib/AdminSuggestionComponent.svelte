<script lang="ts">
	import Dropdown from './Dropdown.svelte';
	import type AdminSuggestion from './entities/AdminSuggestion';
	
	import { PUBLIC_API_URL } from '$env/static/public';

	export let suggestion: AdminSuggestion;
	export let moreOptions = true;
	let status = suggestion.status;
	let unsavedChange = false;

	$: if (status != suggestion.status) unsavedChange = true;
	else unsavedChange = false;

	async function saveChanges() {
		const res = await fetch(PUBLIC_API_URL + '/admin/suggestion/status', {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				suggestionId: suggestion.suggestionId,
				status
			})
		});
		if (res.status == 200) {
			unsavedChange = false;
			suggestion.status = status;
		} else if (res.status >= 400) {
			alert('Нещо се обърка!');
		}
	}
</script>

<div id="wrapper">
	<div id="suggestionHolder">
		<div>
			<b>{suggestion.category}</b>
			<span>№{suggestion.suggestionId}</span>
			<span>{suggestion.title}</span>
		</div>
		<span>{suggestion.content}</span>
		<div>
			<span>{new Date(suggestion.postDate.toString()).toLocaleDateString()}</span>
			<span>Статус: {suggestion.status}</span>
			<span>Харесвания: {suggestion.likes}</span>
			{#if suggestion.isAnon}
				<span>Анонимно предложение</span>
			{/if}
		</div>
	</div>
	<div id="userAndActionWrapper">
		<div id="userHolder">
			{#if suggestion.user != null}
				<span>{suggestion.user?.userName}</span>
				<span>{suggestion.user?.email}</span>
				<span>{suggestion.user?.role}</span>
				{#if suggestion.user?.role != 'citizen'}
					<span>Училище: {suggestion.user?.school}</span>
				{/if}
				{#if suggestion.user?.phone != null}
					<span>тел.: {suggestion.user?.phone}</span>
				{/if}
			{:else}
				<span>Изтрит потребител</span>
			{/if}
		</div>
		<div id="actionHolder">
			<Dropdown options={['waiting', 'accepted', 'denied', 'hidden']} bind:value={status} />
			<button on:click={saveChanges}>Запази промени</button>
			{#if moreOptions}
				<button on:click={() => window.open('/admin/suggestion/'+suggestion.suggestionId, "_blank")}>Още опции</button>
			{/if}
		</div>
		{#if unsavedChange}
			<span style="color: red;">Имате незапазени промени!</span>
		{/if}
	</div>
</div>

<style>
	span,
	b {
		font-family: 'Roboto';
		font-size: 16pt;
		color: var(--secondary);
	}
	#wrapper {
		width: 100%;
		display: flex;
		gap: 1rem;
		min-height: 10rem;
	}
	#suggestionHolder {
		width: 58%;
		border: 2px solid var(--secondary);
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		gap: 1rem;
	}
	#suggestionHolder div {
		display: flex;
		gap: 1rem;
	}
	#userAndActionWrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 40%;
	}
	#userHolder {
		width: 100%;
		background-color: var(--transparentBackground);
		display: flex;
		flex-wrap: wrap;
		border-radius: 1rem;
		gap: 1rem;
		padding: 0.5rem;
	}
	#userHolder span {
		color: var(--text) !important;
	}
	#actionHolder {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	#actionHolder button {
		min-width: 20%;
		color: var(--text);
		font-family: 'Roboto';
		font-size: 13pt;
		border-radius: 10px;
		background-color: var(--secondary);
		height: 3rem;
		cursor: pointer;
		transition: all 300ms ease-in-out;
		border: 2px solid var(--secondary);
	}
	#actionHolder button:hover {
		background-color: var(--transparentBackground);
	}
</style>
