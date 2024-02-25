<script lang="ts">
	import Dropdown from '$lib/Dropdown.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Checkbox from '$lib/Checkbox.svelte';

	import { PUBLIC_API_URL } from '$env/static/public';

	export let data: PageData;

	let title = '';
	let isAnon = false;
	let content = '';
	let correctInput = true;
	let categoryName = null;
	let categoryNames: string[] = [];
	onMount(() => {
		categoryNames = data.categories.map((e) => e.name);
	});

	async function createSuggestion() {
		if (title.length < 3 || content.length < 50 || categoryName == null) {
			correctInput = false;
			return;
		}
		let categoryId: number = -1;
		data.categories.forEach((category) => {
			if (category.name == categoryName) {
				categoryId = category.id;
			}
		});
		if (categoryId == -1) return;
		const res = await fetch(PUBLIC_API_URL + '/suggestion/new', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title,
				content,
				isAnon,
				categoryId
			})
		});
		if (res.status == 201) {
			alert('Успешно предложено предложение!');
			content = '';
			title = '';
			isAnon = false;
			categoryName = null;
		} else {
			correctInput = false;
		}
	}
</script>

<div id="holder">
	<p>
		КАК ДА ПОДОБРИМ<br />
		<b>СТАРА ЗАГОРА</b>?
	</p>
	<div id="inputHolder">
		<input placeholder="Заглавие" bind:value={title} maxlength="50" />
		<div>
			<Dropdown
				options={categoryNames}
				placeholder="Категория"
				bind:value={categoryName}
				class="dropdown"
			/>
			<Checkbox
				bind:isChecked={isAnon}
				text="Анонимност"
				title="При анонимно предложение името ти няма да бъде показвано"
			/>
		</div>
		<textarea bind:value={content} placeholder="Предложиение" rows="12" maxlength="1500" />
		{#if !correctInput}
			<span id="error"
				>Уверете се, че всички полета са попълнени. Заглавието трябва да е поне 3 символа, а самото
				предложение поне 50</span
			>
		{/if}
		<button on:click={createSuggestion}>Изпрати</button>
	</div>
	<div id="descHolder">
		<h2>Предложи</h2>
		<span>
			След като направиш предложение по една от дадедните категории, то ще трябва да бъде одобрено
			от администратор. След това ще бъде достъпно за всички потребители, които ще могат да го
			харесат. Периодично предложенията ще се преглеждат и обсъждат от младите кметове и техните
			колеги от Младежки общински съвет. Ако идеята ти е одобрена ще бъде поставена на страницата за
			одобрени идеи, където ще се публикува и допълнителна информация за развитиети на проекта по
			предложението. Ако избереш публикацията ти да е анонимна, то името и училището ти няма да
			могат да бъдат виждани от никого, освен от администраторите.
		</span>
	</div>
</div>

<style>
	#holder {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
	}
	p {
		color: var(--text);
		font-family: 'Roboto';
		font-size: 40pt;
		background-color: var(--transparentBackground);
		width: 100%;
		text-align: center;
		margin: 0px;
		padding: 3rem 0px;
	}
	p b {
		color: var(--vibrantPrimary);
	}
	#inputHolder {
		width: 55%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	#inputHolder input {
		font-size: 16pt;
	}
	#inputHolder textarea {
		font-size: 14pt;
	}
	#inputHolder textarea,
	input {
		background-color: var(--primary);
		border-radius: 10px;
		font-family: 'Roboto';
		color: var(--text);
		padding: 0.5rem 1rem;
		border: 2px solid var(--secondary);
	}
	#inputHolder div {
		display: flex;
		justify-content: space-between;
	}
	button {
		font-size: 18pt;
		padding: 0.5rem 1rem 0.5rem 1rem;
		font-family: 'Roboto';
		color: var(--text);
		border-radius: 10px;
		border: 2px solid var(--secondary);
		background-color: var(--secondary);
		cursor: pointer;
		width: fit-content;
		align-self: center;
		min-width: 25%;
		transition: all 300ms ease-in-out;
	}
	button:hover {
		background-color: var(--transparentBackground);
	}
	button:active {
		background-color: transparent;
	}
	#inputHolder :global(.dropdown) {
		max-width: 50%;
	}
	#descHolder {
		width: 100%;
		padding: 2rem 0px;
		display: flex;
		align-items: center;
		flex-direction: column;
		background-color: var(--transparentBackground);
		gap: 2rem;
		margin-bottom: 5rem;
	}
	#descHolder span {
		color: var(--text);
		font-family: 'Roboto';
		font-size: 16pt;
		max-width: 50%;
		text-align: justify;
	}
	#descHolder h2 {
		color: var(--text);
		font-family: 'Roboto';
		font-size: 25pt;
		margin: 0px;
	}
	#error {
		color: red;
		font-family: 'Roboto';
		font-size: 16pt;
	}
	@media only screen and (max-width: 600px) {
		p {
			font-size: 30pt;
		}
		#inputHolder{
			width: 95%;
		}
		#holder{
			max-width: 100vw;
		}
		#descHolder span{
			max-width: 95%;
		}
	}
</style>
