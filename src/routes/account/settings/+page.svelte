<script lang="ts">
	import type { PageData } from './$types';
	
	import { PUBLIC_API_URL } from '$env/static/public';
	import { goto, invalidateAll } from '$app/navigation';
	import Dropdown from '$lib/Dropdown.svelte';
	import { onMount } from 'svelte';
	import type School from '$lib/entities/School';

	export let data: PageData;
	let name = data.user.name;
	let phone = data.user.phone;
	let role = '';
	let schoolName: string | null = data.user.school;

	$: schoolNames = data.allSchools.map((s: School) => s.name);
	onMount(() => {
		switch (data.user.role) {
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
	});
</script>

<div id="firstHolder">
	<div id="holder">
		<h2>Настройки</h2>
		<div class="settingHolder">
			<span>Име и фамилия</span>
			<div>
				<input type="input" name="name" placeholder="Име и фамилия" bind:value={name} />
				<button
					on:click={async () => {
						if (name === data.user.name || name.length < 3) {
							return;
						}
						const res = await fetch(PUBLIC_API_URL + '/account/settings/name', {
							method: 'PUT',
							credentials: 'include',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								name
							})
						});
						if (res.status == 200) {
							alert('Името е обновено');
							invalidateAll();
						} else if (res.status == 400) {
							alert(
								'Некоректно име, името трябва да е между 3 и 35 символа, включвайки само букви на кирилица!'
							);
						}
					}}>Запази</button
				>
			</div>
		</div>
		<div class="settingHolder">
			<span>Телефонен номер</span>
			<div>
				<input
					type="input"
					name="phone"
					placeholder="Телефонен номер"
					bind:value={phone}
					maxlength="10"
				/>
				<button
					on:click={async () => {
						if (phone.length < 10 || data.user.phone == phone) {
							return;
						}
						if (phone == '') phone = null;
						const res = await fetch(PUBLIC_API_URL + '/account/settings/phone', {
							method: 'PUT',
							credentials: 'include',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								phone
							})
						});
						if (res.status == 200) {
							alert('Телефонният номет е обновен');
							invalidateAll();
						} else if (res.status >= 400) {
							alert('Телефонния номер трябва да започва с 0 и да съдържа само цифри');
						}
					}}>Запази</button
				>
			</div>
		</div>
		<div id="roleHolder">
			<div class="settingHolder">
				<span>Роля</span>
				<div>
					<Dropdown options={['Ученик', 'Гражданин']} placeholder="Роля" bind:value={role} />
					<button
						on:click={async () => {
							let roleS = '';
							switch (role) {
								case 'Ученик': {
									roleS = 'student';
									break;
								}
								case 'Гражданин': {
									roleS = 'citizen';
									break;
								}
								default:
									roleS = 'citizen';
							}
							if (roleS == data.user.role) return;
							const res = await fetch(PUBLIC_API_URL + '/account/settings/role', {
								method: 'PUT',
								credentials: 'include',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({
									role: roleS,
									schoolId: null
								})
							});
							if (res.status == 200) {
								invalidateAll();
							}
						}}>Запази</button
					>
				</div>
			</div>
			{#if data.user.role != 'citizen' && role != 'Гражданин'}
				<div class="settingHolder">
					<span>Училище</span>
					<div>
						<Dropdown
							options={schoolNames}
							placeholder="Училище"
							bind:value={schoolName}
							isNullable={true}
							nullableMessage="Друго училище"
						/>
						<button
							on:click={async () => {
								let schoolId = null;
								
								if (schoolName != null)
									data.allSchools.forEach((element) => {
										if (element.name == schoolName) {
											schoolId = element.id;
											return;
										}
									});
								const res = await fetch(PUBLIC_API_URL+"/account/settings/school",{
									method: 'PUT',
									credentials: 'include',
									headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({
									schoolId
								})
								})
								if(res.status == 200){
									alert("Успешно променено училище")
									invalidateAll();
								}
								else if(res.status >=  400){
									alert("Нещо се обърка")
								}
							}}>Запази</button
						>
					</div>
				</div>
			{/if}
		</div>

		<button
			class="criticalButton"
			id="logout"
			on:click={async () => {
				const res = await fetch(PUBLIC_API_URL + '/account/logout', {
					method: 'POST',
					credentials: 'include'
				});
				if (res.status == 200) {
					goto('/account/login', { invalidateAll: true });
				}
			}}>Излез от профила</button
		>
		<!-- <button class="criticalButton">Изтрий профил</button> -->
	</div>
</div>

<style>
	#firstHolder {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 3rem 0px;
	}
	#holder {
		width: 80%;
		background-color: var(--primary);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		border-radius: 2rem;
		align-items: center;
		gap: 2rem;
		padding: 2rem;
	}
	h2 {
		color: var(--text);
		font-family: 'Roboto';
		font-size: 28pt;
	}
	.settingHolder {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.settingHolder span {
		color: var(--text);
		font-family: 'Roboto';
		font-size: 18pt;
	}
	.settingHolder div {
		display: flex;
		gap: 2rem;
	}
	.settingHolder input {
		border-radius: 1rem;
		background-color: var(--secondary);
		font-family: 'Roboto';
		font-size: 16pt;
		color: var(--text);
		padding: 0.5rem 1rem 0.5rem 1rem;
		border: 2px solid var(--text);
		width: 20rem;
	}
	.settingHolder button {
		font-family: 'Roboto';
		font-size: 16pt;
		border-radius: 1rem;
		background-color: transparent;
		border: 2px solid var(--text);
		color: var(--text);
		padding: 0.5rem;
		cursor: pointer;
		transition: all 300ms ease-in-out;
	}
	.settingHolder button:hover {
		background-color: var(--vibrantPrimary);
	}
	.settingHolder button:active {
		background-color: var(--transparentBackground);
	}
	.criticalButton {
		background-color: red;
		color: var(--text);
		font-family: 'Roboto';
		font-size: 16pt;
		border: 2px solid var(--text);
		border-radius: 1rem;
		padding: 0.5rem 1rem 0.5rem 1rem;
		width: 28rem;
		cursor: pointer;
		transition: all 300ms ease-in-out;
	}
	.criticalButton:hover {
		background-color: darkred;
	}
	.criticalButton:active {
		background-color: rgb(100, 0, 0);
	}
	#roleHolder {
		display: flex;
		gap: 3rem;
	}
	@media only screen and (max-width: 800px) {
		#firstHolder{
			max-width: 100vw;
		}
		#holder{
			width: 95%;
			padding: 1rem 0px;
		}
		.settingHolder{
			max-width: 100%;
		}
		.settingHolder div{
			flex-direction: column;
		}
		.criticalButton{
			max-width: 95%;
		}
		#roleHolder{
			max-width: 100%;
			flex-direction: column;
		}
	}
</style>
