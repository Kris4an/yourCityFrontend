<script lang="ts">
	import Dropdown from '$lib/Dropdown.svelte';
	import type { PageData } from './$types';
	import type School from '$lib/entities/School';
	
	import { PUBLIC_API_URL } from '$env/static/public';
	import { goto } from '$app/navigation';

	export let data: PageData;

	const allowedCharacters = ['а','б','в','г','д','е','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ь','ю','я','-',' '];

	let passwordsMatch = true;
	let validName = true;
	let validEmail = true;
	let validPhone = true;
	let validPassword = true;
	let showErrorMessage = false;

	let role: string | null = null;
	let school: string;
	let password = '';
	let repeatPassword = '';
	let phone: string | null = null;
	let name = '';
	let email = '';
	let schoolNames: string[];

	$: schoolNames = data.allSchools.map((s: School) => s.name)
	$: if (repeatPassword != password) passwordsMatch = false;
	else passwordsMatch = true;

	function validatePhone(phoneV: string | null): boolean {
		if(phoneV == null) return true;
		if(phoneV == '') {
			phone = null;
			return true;
		}
		if(phoneV.charAt(0) != '0' || phoneV.length < 8) return false;
		for(let i = 0; i < phoneV.length; i++){
			if(phoneV.charAt(i) < '0' || phoneV.charAt(i) > '9') return false;
		}
		return true;
	}
	function validateName(name: string): boolean{
		if(name.length < 3) return false;
		const lowercaseName = name.toLowerCase();
		for(let i = 0; i < name.length; i++){
			if(!allowedCharacters.includes(lowercaseName.charAt(i))) return false;
		}
		return true;
	}
	function validatePassword(pass: string):boolean {
		if(pass.length < 8 || pass.length > 256) return false;
		let hasUppercase = false, hasLowercase = false, hasNumber  = false;
		for(let i = 0; i < pass.length; i++){
			if(pass.charAt(i) >= 'a' && pass.charAt(i) <= 'z') hasLowercase = true;
			if(pass.charAt(i) >= 'A' && pass.charAt(i) <= 'Z') hasUppercase = true;
			if(pass.charAt(i) >= '0' && pass.charAt(i) <= '9') hasNumber = true;
		}
		return hasLowercase
	}
    function validateEmail(email: string):boolean{
		return email.includes('@') && email.length >= 3;
	}
</script>

<div id="wrapper">
	<div id="holder">
		<h2>Създай профил</h2>
		<div id="fieldHolder">
			<div class="field">
				<span>Име и фамилия*</span>
				<input placeholder="Име и фамилия" maxlength="35" bind:value={name}/>
				{#if !validName}
					<span class="error">Името и фамилията трябва да са поне 3 символа, да са изцяло на кирилица и да започват с главна буква</span
					>
				{/if}
			</div>
			<div class="field">
				<span>Имейл*</span>
				<input placeholder="Имейл" maxlength="35" bind:value={email}/>
				{#if !validEmail}
					<span class="error">Имейла трябва да съдържа '@'</span>
				{/if}
			</div>
			<div class="field">
				<span>Парола*</span>
				<input placeholder="Парола" type="text" bind:value={password} maxlength="256"/>
				{#if !validPassword}
					<span class="error">Паролата трябва да е поне 8 символа и да включва поне една малка, една главна латинска буква и една цифра</span>
				{/if}
			</div>
			<div class="field">
				<span>Повтори паролата*</span>
				<input placeholder="Повтори паролата" type="password" bind:value={repeatPassword} maxlength="256"/>
				{#if !passwordsMatch && password != ''}
					<span class="error">Паролите не съвпадат</span>
				{/if}
			</div>
			<div id="dropdownHolder">
				<div class="field">
					<span>Роля*</span>
					<Dropdown
						options={['Ученик', 'Гражданин']}
						bind:value={role}
						placeholder="Избери роля"
						class="dropdown"
					/>
				</div>
				
				{#if role == 'Ученик'}
					<div class="field">
						<span>Училище</span>
					
					<Dropdown
						options={schoolNames}
						bind:value={school}
						placeholder="Избери училище"
						isNullable={true}
						nullableMessage="Друго училище"
						class="dropdown"
					/>
				</div>
				{/if}
			</div>
			<div class="field">
				<span>Телефонен номер</span>
				<input placeholder="Телефонен номер" bind:value={phone} maxlength="10"/>
				{#if !validPhone}
					<span class="error">Невалиден телефонен номер</span
					>
				{/if}
			</div>
			<span>* - задължително поле</span>
			<span style="font-size: 12pt;">Със създаването на профил се съгласявам се с <a href="/terms-of-service">Условията за ползване</a> и <a href="/privacy-policy">Политиката на поверителност</a></span>
			{#if showErrorMessage}
				<span class="error">Имаше грешка при въвежадане не данните<br/>
				Уверете се, че имейла, който ползвате не зает</span>
			{/if}
		</div>
		<button
			on:click={async () => {
				validPhone = validatePhone(phone);
				validName = validateName(name);
				validPassword = validatePassword(password);
				validEmail = validateEmail(email)
                if(!validEmail || !validName || !passwordsMatch || !validPassword) return;
				let roleE = ''
				switch(role){
					case 'Ученик': {
						roleE = 'student';
						break;
					}
					default: roleE = 'citizen';
				}
				let schoolId = null;
				if(school != null) data.allSchools.forEach(e => {
					if(e.name == school){
						schoolId = e.id;
					}
				});
				const res = await fetch(PUBLIC_API_URL + '/account/create', {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
                        name,
						email,
						password,
						role: roleE,
						phone,
						schoolId
					})
				});
				if(res.status == 201){
					alert("Успешно създаден акаунт!")
					goto('/account/login')
				}
				if(res.status == 400){
					showErrorMessage = true;
				}
			}}>Създай профил</button
		>
	</div>
</div>

<style>
	#wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 3rem 0rem;
	}
	#holder {
		background-color: var(--primary);
		border-radius: 1rem;
		border: 2px solid var(--secondary);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 0rem 3rem 1rem 3rem;
		gap: 2rem;
	}
	h2 {
		font-family: 'Roboto';
		color: var(--text);
		font-size: 28pt;
	}
	#fieldHolder {
		width: 30rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
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
		transition: all 300ms ease-in-out;
	}
	button:hover {
		background-color: var(--transparentBackground);
	}
	button:active {
		background-color: transparent;
	}
	.field {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 5px;
	}
	#fieldHolder span {
		font-family: 'Roboto';
		color: var(--text);
		font-size: 14pt;
	}
	.error {
		color: red !important;
	}
	input {
		font-family: 'Roboto';
		color: var(--text);
		font-size: 16pt;
		background-color: var(--secondary);
		border-radius: 10px;
		border: none;
		padding: 5px 10px;
	}
	#dropdownHolder {
		display: flex;
		justify-content: space-between;
	}
	#dropdownHolder :global(.dropdown) {
		background-color: var(--transparentBackground);
		max-width: 12rem;
	}
	a{
		color: var(--text);
	}
	@media only screen and (max-width: 800px) {
		#wrapper{
			max-width: 100vw;
		}
		#holder{
			max-width: 100%;
			padding: 0px 0px 10px 0px;
		}
		#fieldHolder{
			max-width: 95%;
		}
	}
</style>
