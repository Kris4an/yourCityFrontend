<script lang="ts">
	import type { PageData } from '../other/$types';
	//@ts-ignore
	import { PUBLIC_API_URL } from '$env/static/public';
	import type Category from '$lib/entities/Category';
	import type School from '$lib/entities/School';

	let newCategoryName: String;
	let categories: Category[] = [];

	let newSchoolName: String;
	let schools: School[] = [];

	async function newCategory() {
		if (newCategoryName.length < 3) {
			alert('Името на категорията трябва да е поне 3 символа');
			return;
		}
		const res = await fetch(PUBLIC_API_URL + '/admin/category/new', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: newCategoryName
			})
		});
		if (res.status == 201) {
			alert('Успешно добавена категория');
			newCategoryName = '';
			getCategories();
		} else if (res.status >= 400) {
			alert('Нещо се обърка');
		}
	}
	async function getCategories() {
		const res = await fetch(PUBLIC_API_URL + '/suggestion/category', {
			method: 'GET'
		});
		if (res.status == 200) {
			categories = await res.json();
		} else if (res.status >= 400) {
			alert('Нещо се обърка');
		}
	}
	async function getSchools() {
		const res = await fetch(PUBLIC_API_URL + '/school/all', {
			method: 'GET'
		});
		if (res.status == 200) {
			schools = await res.json();
		} else if (res.status >= 400) {
			alert('Нещо се обърка');
		}
	}
	async function newSchool() {
		console.log(newSchoolName);
		if (newSchoolName.length < 3) {
			alert('Името на училището трябва да е поне 3 символа');
			return;
		}
		const res = await fetch(PUBLIC_API_URL + '/admin/school/new', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: newSchoolName
			})
		});
		if (res.status == 201) {
			alert('Успешно добавено училище');
			newSchoolName = '';
			getSchools();
		} else if (res.status >= 400) {
			alert('Нещо се обърка');
		}
	}
	async function deleteSchool(school: School) {
		if (!confirm('Сигурен ли си, че искаш да изтриеш училище №' + school.id + ', ' + school.name)) {
			return;
		}
		const res = await fetch(PUBLIC_API_URL + '/admin/school/' + school.id, {
			method: 'DELETE',
			credentials: 'include'
		});
		if (res.status == 200) {
			getSchools();
		} else if (res.status >= 400) {
			alert('Нещо се обърка!');
		}
	}
	async function editSchool(school: School) {
		let name = prompt('Ново име за училище №' + school.id + ', ' + school.name);
		if (name != null) {
			const res = await fetch(PUBLIC_API_URL + '/admin/school', {
				method: 'PUT',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: school.id,
					name
				})
			});
			if(res.status == 200){
				alert("Успешно редактиране на училище!")
				getSchools();
			}
		}
	}
	async function editCategory(category: Category) {
		let name = prompt('Ново име за категория №' + category.id + ', ' + category.name);
		if (name != null) {
			const res = await fetch(PUBLIC_API_URL + '/admin/category/'+category.id, {
				method: 'PUT',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name
				})
			});
			if(res.status == 200){
				alert("Успешно редактиране на категория!")
				getCategories();
			}
		}
	}
	async function deleteCategory(category: Category) {
		let newCategoryId = prompt('№(id) на категорията, с която да се замени категория №'+category.id+", "+category.name)
		if(newCategoryId != null && !isNaN(+newCategoryId)){
			const res = fetch(PUBLIC_API_URL+"/admin/category",{
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: category.id,
					newCategoryId
				})
			})
		}
	}
</script>

<div id="wrapper">
	<h2>Управление на категории</h2>
	<div class="holder">
		<div class="holder2">
			<p>Добави категории</p>
			<input placeholder="Име на категория" bind:value={newCategoryName} />
			<button on:click={newCategory}>Добави категория</button>
		</div>
		<div class="holder2">
			<p>Категории</p>
			<button on:click={getCategories}>Покажи всички Категории</button>
			{#if categories.length != 0}
				<table>
					<tr>
						<th>№</th>
						<th>Име на категория</th>
						<th>Редактирай</th>
						<th>Изтрий</th>
					</tr>
					{#each categories as category (category.id)}
						<tr>
							<td>{category.id}</td>
							<td>{category.name}</td>
							<td>
								<button on:click={() => editCategory(category)}>Редактирай</button>
							</td>
							<td>
								<button on:click={() => deleteCategory(category)}>Изтрий</button>
							</td>
						</tr>
					{/each}
				</table>
			{/if}
		</div>
	</div>
	<h2>Управление на училища</h2>
	<div class="holder">
		<div class="holder2">
			<p>Добави училища</p>
			<input placeholder="Име на училище" bind:value={newSchoolName} />
			<button on:click={newSchool}>Добави училище</button>
		</div>
		<div class="holder2">
			<p>Училища</p>
			<button on:click={getSchools}>Покажи всички училища</button>
			{#if schools.length != 0}
				<table>
					<tr>
						<th>№</th>
						<th>Име на училище</th>
						<th>Редактирай</th>
						<th>Изтрий</th>
					</tr>
					{#each schools as school}
						<tr>
							<td>{school.id}</td>
							<td>{school.name}</td>
							<td>
								<button on:click={() => editSchool(school)}>Редактирай</button>
							</td>
							<td>
								<button on:click={() => deleteSchool(school)}>Изтрий</button>
							</td>
						</tr>
					{/each}
				</table>
			{/if}
		</div>
	</div>
</div>

<style>
	#wrapper {
		display: flex;
		flex-direction: column;
		background-color: white;
	}
	.holder {
		flex-grow: 1;
		display: flex;
	}
	h2 {
		font-family: 'Roboto';
	}
	.holder2 {
		width: 100%;
		padding-left: 1rem;
	}
	p {
		font-size: 18px;
		font-family: 'Roboto';
	}
	input {
		background-color: var(--primary);
		border-radius: 10px;
		font-family: 'Roboto';
		color: var(--text);
		padding: 0.5rem 1rem;
		border: 2px solid var(--secondary);
		font-size: 16px;
	}
	button {
		color: var(--text);
		font-family: 'Roboto';
		font-size: 13pt;
		border-radius: 10px;
		background-color: var(--secondary);
		cursor: pointer;
		transition: all 300ms ease-in-out;
		border: 2px solid var(--secondary);
		padding: 5px;
	}
	button:hover {
		background-color: var(--transparentBackground);
	}
	th,
	tr,
	td {
		font-family: 'Roboto';
		font-size: 16pt;
		padding: 5px;
	}
</style>
