<script lang='ts'>
	import { goto } from '$app/navigation';
	//@ts-ignore
	import { PUBLIC_API_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import type { LayoutData } from '../../$types';

	let email = ""
	let password = ""
	let succsefulLogin = true;

	export let data: LayoutData
	onMount(() => {
		if(data.user != null) goto('/account');
	})

	async function login() {
		if(email.length < 3 || password.length < 8){
			succsefulLogin = false;
			return;
		}
		const formData  = new FormData();
		formData.append("email", email);
		formData.append("password", password);
		const res = await fetch(PUBLIC_API_URL+'/account/login', {
			method: 'POST',
			body: formData,
			credentials: 'include'
		})
		if(res.status == 200){
			goto('/', { replaceState: true, invalidateAll: true })
		}
		if(res.status == 401){
			succsefulLogin = false
		}
	}
</script>
<div id="holder">
	<div id="loginHolder">
		<div id="content">
			<div>
				<h2>Влез в профила си</h2>
				<span id='quote'>Направи твоят град по-добър</span>
			</div>
			
			<input name="email" type="email" placeholder="Имейл" bind:value={email} on:input={()=>{succsefulLogin=true}} maxlength="35"/>
			<input name="password" type="password" placeholder="Парола" bind:value={password} on:input={()=>{succsefulLogin=true}} maxlength="256"/>
			<div>
				<button on:click={login} style="border-color: {succsefulLogin? '':'red'};">Влез</button>
				<span id='failedLogin'>{succsefulLogin? '':'Грешни имейл или парола'}</span>
			</div>
			<a href="/account/create">Нямаш профил? Създай тук!</a>
		</div>
	</div>
</div>

<style>
	#holder {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	#loginHolder {
		width: 60rem;
		height: 40rem;
		border: 0.5rem solid var(--primary);
		border-radius: 1rem;
		background-image: url('/images/loginBackground.jpg');
		background-repeat: no-repeat;
		background-size: 60rem 40rem;
		display: flex;
		justify-content: end;
	}
	#content {
		width: 50%;
		height: 100%;
		background-color: var(--transparentBackground);
		border-radius: 0.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
	}
	input{
		width: 70%;
		height: 3rem;
		background-color: var(--primary);
		border-radius: 1rem;
		color: var(--text);
		font-size: 16pt;
		font-family: 'Roboto';
		border: 3px solid var(--text);
		padding: 0px 8px 0px 8px;
	}
	::placeholder {
  		color: var(--text);
  		opacity: 0.8;
	}
	button{
		width: 60%;
		height: 3rem;
		background-color: var(--text);
		border-radius: 1rem;
		color: var(--secondary);
		font-size: 16pt;
		font-family: 'Roboto';
		border: 3px solid var(--primary);
		transition: all 300ms ease-in-out;
		cursor: pointer;
	}
	button:hover{
		border-color: var(--vibrantPrimary);
	}
	button:active{
		background-color: var(--vibrantPrimary);
		color: var(--text);
	}
	#failedLogin{
		color: red;
		font-family: 'Roboto';
		font-size: 14pt;
		height: 1.5rem;
	}
	#content div{
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 0.5rem;
	}
	a{
		font-family: 'Roboto';
		color: var(--text);
		font-size: 14pt;
		text-decoration: none;
	}
	a:hover{
		text-decoration: underline;
	}
	h2, #quote{
		color: var(--text);
		font-family: 'Roboto';
	}
	#quote{
		font-size: 14pt;
	}
	h2{
		font-size: 22pt;
		margin: 1rem 0px 1rem 0px;
	}
</style>
