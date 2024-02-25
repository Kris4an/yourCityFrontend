<script lang="ts">
	import { fly } from 'svelte/transition';
	export let options: string[];
	export let value: string | null;
	export let placeholder: string = '';
	export let isNullable = false;
	export let nullableMessage = "Изчисти избор"

	let isExpanded = false;
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>

<div id="dropdown" class={$$props.class}>
	<span style={value == null ? 'opacity: 80%;' : ''}>{value == null ? placeholder : value}</span>
	<button
		class="material-symbols-outlined"
		on:click={() => {
			isExpanded = !isExpanded;
		}}
		style={isExpanded ? 'transform: rotate(180deg)' : ''}
	>
		expand_more
	</button>
	{#if isExpanded}
		<div id="options" transition:fly>
			{#each options as option}
				<button
					on:click={() => {
						isExpanded = false;
						value = option;
					}}>{option}</button
				>
			{/each}
			{#if isNullable}
				<button
					on:click={() => {
						isExpanded = false;
						value = null;
					}}>{nullableMessage}</button
				>
			{/if}
		</div>
	{/if}
</div>

<style>
	#dropdown {
		position: relative;
		background-color: var(--primary);
		border: 2px solid var(--secondary);
		border-radius: 10px;
		padding: 0.5rem;
		width: 15rem;
		height: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	span {
		font-family: 'Roboto';
		font-size: 14pt;
		color: var(--text);
	}
	#options {
		position: absolute;
		top: 2.5rem;
		left: 0px;
		width: 15rem;
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 10px;
		background-color: var(--secondary);
		border-radius: 10px;
		z-index: 10;
	}
	#options button {
		background-color: transparent;
		border: 2px solid var(--vibrantPrimary);
		font-family: 'Roboto';
		font-size: 14pt;
		color: var(--text);
		border-radius: 10px;
		cursor: pointer;
		transition: 300ms all ease-in-out;
	}
	#options button:active {
		background-color: var(--transparentBackground);
	}
	#options button:hover {
		text-decoration: underline;
		box-shadow: 3px 5px var(--transparentBackground);
	}
	.material-symbols-outlined {
		background-color: transparent;
		border: none;
		scale: 120%;
		user-select: none;
		cursor: pointer;
		color: var(--text);
		font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
	}
</style>
