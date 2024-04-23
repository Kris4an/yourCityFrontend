<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_API_URL } from '$env/static/public';
	import Suggestion from '$lib/Suggestion.svelte';
	import type OwnSuggestion from '$lib/entities/OwnSuggestion';
	import statusMap  from '$lib/nameMap';

	export let data: any;
	let role = '';
	let suggestions: OwnSuggestion[] = [];

	
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
	
	async function deleteSuggestion(suggestion: OwnSuggestion){
		if(confirm("Сигурен ли си, че искаш да изтриеш предложение №"+suggestion.id)){
			const res = await fetch(PUBLIC_API_URL+"/suggestion/"+suggestion.id, {
				method: 'DELETE',
				credentials: 'include'
			})
			if(res.status == 200){
				location.reload();
			}
			if(res.status == 403){
				alert("Не може да се изтрие предложението, защото то е одобрено")
			}
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
		{#each suggestions as suggestion(suggestion.id)}
			<div class="suggestionWrapper">
				<Suggestion suggestion={Object.assign(suggestion, {user: data.user}, {isLikedByUser: false})} disableLike={true}/>
				<div>
					<span>Статус: {suggestion.status}</span>
					<!-- <button on:click={() => deleteSuggestion(suggestion)}>Изтрий преложение</button> -->
				</div>
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
		min-height: 10rem;
        display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding: 0px 1rem 0px 1rem;
		align-items: flex-start;
	}
	#userHolder div {
        min-height: 4rem;
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
	.suggestionWrapper{
		background-color: var(--transparentBackground);
		display: flex;
		flex-direction: column;
		width: fit-content;
		border-radius: 1rem;
	}
	.suggestionWrapper div{
		padding: 5px 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.suggestionWrapper span{
		font-size: 14pt;
		font-family: 'Roboto';
		color: var(--text);
	}
	/* .suggestionWrapper button{
		font-size: 14pt;
		font-family: 'Roboto';
		color: var(--text);
		background-color: var(--primary);
		border-radius: 10px;
		padding: 5px 10px;
		border: 2px solid var(--secondary);
		cursor: pointer;
	} */
	@media only screen and (max-width: 800px) {
		#userHolder{
			border: none;
			padding: 0px;
		}
  		#userHolder div{
    		flex-direction: column;
			align-items: flex-start;
  		}
		#holder{
			width: 100vw;
			padding: 5px 0px;
		}
	}
</style>
