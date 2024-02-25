<script lang="ts">
	export let isChecked = false;
	export let text: string;
    export let title = "";
</script>

<div id="holder" title={title}>
	<span>{text}</span>
	<button
		id="check"
		on:click={() => {
			isChecked = !isChecked;
		}}
        class="material-symbols-outlined"
        style={isChecked? "--bg: var(--primary)":"--bg: transparent"}
	>{isChecked? ' check ':''}</button>
</div>
<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>

<style>
	#holder {
		background-color: var(--transparentBackground);
		border-radius: 10px;
		display: flex;
		align-items: center;
		padding: 5px 5px 5px 1rem;
		gap: 1rem;
	}
	#holder span {
		font-family: 'Roboto';
		font-size: 16pt;
		color: var(--text);
	}
	#check {
		aspect-ratio: 1;
		background-color: var(--bg);
		border-radius: 10px;
		height: 2.2rem;
		width: 2.2rem;
		border: 5px solid var(--primary);
        padding: 0px;
        transition: all 300ms ease-in-out;
        cursor: pointer;
	}
    #check:hover{
        border-color: var(--vibrantPrimary);
    }
	.material-symbols-outlined {
        color: var(--text);
		font-variation-settings: 'FILL' 0, 'wght' 700, 'GRAD' 200, 'opsz' 24;
	}
</style>
