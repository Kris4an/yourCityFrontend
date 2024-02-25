<script lang="ts">
	import AdminSuggestionComponent from '$lib/AdminSuggestionComponent.svelte';
	import type { PageData } from './$types';
	
	import { PUBLIC_API_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import type AdminBan from '$lib/entities/AdminBan';
	import AdminBanComponent from '$lib/AdminBanComponent.svelte';

	export let data: PageData;

	let moreInfo: String;
	let bans: AdminBan[] = [];
	let banLength: number;
	let reason: String;
	async function approve() {
		if (moreInfo == undefined || moreInfo.length < 3) {
			alert('Допулнителната информация трябва да е поне 3 символа!');
			return;
		}
		const res = await fetch(PUBLIC_API_URL + '/admin/suggestion/approve', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				suggestionId: data.suggestion.suggestionId,
				moreInfo
			})
		});
		if (res.status >= 400) {
			alert('Нещо се обърка!');
		}
	}
	async function deleteSuggestion() {
		if (!confirm('Сигурен ли си, че искаш да изтриеш предложение №' + data.suggestion.suggestionId))
			return;
		const res = await fetch(PUBLIC_API_URL + '/admin/suggestion/' + data.suggestion.suggestionId, {
			method: 'DELETE',
			credentials: 'include'
		});
		if (res.status == 200) {
			alert('Успешно изтрито предложение!');
			goto('/admin/suggestion');
		} else if (res.status >= 400) {
			alert('Нещо се обърка');
		}
	}
	async function getBans() {
		if (data.suggestion.user == null) {
			alert('Потребителя е изтрит');
			return;
		}
		const res = await fetch(PUBLIC_API_URL + '/admin/bans/' + data.suggestion.user.userId, {
			method: 'GET',
			credentials: 'include'
		});
		if(res.status == 200){
			bans = await res.json();
		}
	}
	async function banUser() {
		if(banLength == undefined || reason == undefined || Number.isNaN(+banLength) || banLength<1){
			alert("Трябва да има причина за забраната на достъп и положителна продължителност")
			return;
		}
	}
	async function deleteBans() {
		
	}
</script>

<div id="wrapper">
	<h1>Предложение №{data.suggestion.suggestionId}</h1>
	<AdminSuggestionComponent suggestion={data.suggestion} moreOptions={false} />
	<div class="holder">
		<div>
			<input placeholder="Повече информация" bind:value={moreInfo} />
			<button on:click={approve}>Одобри</button>
		</div>
		<button on:click={deleteSuggestion}>Изтрий предложение</button>
		{#if data.suggestion.user != null}
			<button on:click={getBans}>Покажи предишни забрани за достъп (BAN)</button>
			{#if bans.length > 0}
				<div class="holder">
					{#each bans as ban}
						<AdminBanComponent ban={ban}/>
					{/each}
				</div>
			{/if}
			<div>
				<input placeholder="Причина за забраната на достъп" bind:value={reason} />
				<input placeholder="Продължителност" bind:value={banLength} />
				<button on:click={banUser}>Забрани достъп</button>
			</div>
			<button on:click={deleteBans}>Премахни забрани за достъп</button>
		{/if}
	</div>
</div>

<style>
	#wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.5rem 1rem;
		background-color: white;
		gap: 3rem;
	}
	h1 {
		font-family: 'Roboto';
		font-size: 30pt;
	}
	button {
		width: fit-content;
		color: var(--text);
		font-family: 'Roboto';
		font-size: 13pt;
		border-radius: 10px;
		background-color: var(--secondary);
		padding: 0.5rem 1rem;
		cursor: pointer;
		transition: all 300ms ease-in-out;
		border: 2px solid var(--primary);
	}
	input {
		background-color: var(--primary);
		border-radius: 10px;
		font-family: 'Roboto';
		color: var(--text);
		padding: 0.5rem 1rem;
		border: 2px solid var(--secondary);
		font-size: 13pt;
	}
	.holder {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-self: flex-start;
	}
</style>
