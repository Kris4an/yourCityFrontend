<script lang="ts">
	import { goto } from '$app/navigation';
	import Suggestion from '$lib/Suggestion.svelte';
	import type OwnSuggestion from '$lib/entities/OwnSuggestion';
	import type { PageData } from '../$types';

	export let data: PageData;
	let role = '';
	let suggestions: OwnSuggestion[] = [];
	const extensionObj = {
		user: data.user,
		isLikedByUser: false
	}
	//@ts-ignore
	$: suggestions = data.suggestions
	$: switch (data.user.role) {
		case 'student': {
			role = 'Ученик';
			break;
		}
		case 'citizen': {
			role = 'Гражданин';
			break;
		}
		case 'admin': {
			role = 'Администратор';
			break;
		}
	}
	
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>

<div id="holder">
	<div id="userHolder">
		<div>
			<span style="font-size: 35pt;" class="spanText">{data.user.name}</span>
			<button on:click={() => {goto('/account/settings')}}>
				<span class="material-symbols-outlined"> settings </span>
			</button>
			<button on:click={() => {goto('/account/settings#logout')}}>
				<span class="material-symbols-outlined"> logout </span>
			</button>
			{#if data.user.role == 'admin'}
				<a href="/admin">Администрация</a>
			{/if}
		</div>
		<span style="font-size: 18pt;" class="spanText">{role}</span>
		{#if data.user.role == 'student' || data.user.school != null}<span class="spanText"
				>{data.user.school != null ? data.user.school : 'Неизвестно училище'}</span
			>{/if}
	</div>
	<span id="suggestionTxt">Моите предложения</span>
	<div id="sugestionsHolder">
		{#each suggestions as suggestion}
			<div>
				<Suggestion suggestion={Object.assign(suggestion, {user: data.user}, {isLikedByUser: false})} disableLike={true}/>
			</div>
		{/each}
	</div>
</div>

<style>
	#holder {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: var(--transparentBackground);
		padding: 5rem 10% 5rem 10%;
	}
	#userHolder {
		width: 100%;
		border-left: 5px var(--text) solid;
		height: 10rem;
        display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding: 0px 1rem 0px 1rem;
		align-items: flex-start;
	}
	#userHolder div {
        height: 4rem;
		display: flex;
		flex-direction: row;
        align-items: center;
        gap: 1rem
	}
	#userHolder .spanText {
		color: var(--text);
		font-family: 'Roboto';
	}
	#userHolder button {
		background-color: transparent;
		border-radius: 10px;
		border: 2px solid var(--text);
		width: 3rem;
		height: 3rem;
        cursor: pointer;
        transition: all 300ms ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
	}
    #userHolder button:hover {
        background-color: var(--text);
    }
    #userHolder button:active{
        background-color: #ffffffb0;
    }
    #userHolder button:hover .material-symbols-outlined {
        color: var(--transparentBackground);
    }
	#suggestionTxt {
		color: var(--text);
		font-family: 'Roboto';
		font-size: 20pt;
	}
	#sugestionsHolder{
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}
	.material-symbols-outlined {
		font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
		color: var(--text);
		user-select: none;
        transition: all 200ms ease-in;
	}
	a{
		color: var(--text);
		font-family: 'Roboto';
		font-size: 16pt;
		border: 2px solid var(--text);
		border-radius: 10px;
		padding: 5px;
	}
</style>
