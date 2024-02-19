<script lang="ts">
	import Dropdown from "./Dropdown.svelte";
import type AdminSuggestion from "./entities/AdminSuggestion";

    export let suggestion: AdminSuggestion;
    let status = suggestion.status
</script>
<div id='wrapper'>
    <div id="suggestionHolder">
        <div>
            <b>{suggestion.category}</b>
            <span>{suggestion.title}</span>
        </div>
        <span>{suggestion.content}</span>
        <div>
            <span>{suggestion.postDate}</span>
            <span>Статус: {suggestion.status}</span>
            <span>Харесвания: {suggestion.likes}</span>
            {#if suggestion.isAnon}
                <span>Анонимно предложение</span>
            {/if}
        </div>
    </div>
    <div id='userAndActionWrapper'>
        <div id='userHolder'>
            <span>{suggestion.user?.userName}</span>
            <span>{suggestion.user?.email}</span>
            <span>{suggestion.user?.role}</span>
            {#if suggestion.user?.role != 'citizen'}
                <span>Училище: {suggestion.user?.school}</span>
            {/if}
            {#if suggestion.user?.phone != null}
                <span>тел.: {suggestion.user?.phone}</span>
            {/if}
        </div>
        <div id='actionHolder'>
            <Dropdown options={["waiting","accepted","denied","hidden"]} bind:value={status}/>
            <button>Одобри</button>
            <button>Забрани достъп</button>
            <button>Запази промени</button>
        </div>
    </div>
</div>
<style>
    span, b{
        font-family: 'Roboto';
        font-size: 16pt;
        color: var(--secondary);
    }
    #wrapper{
        width: 100%;
        display: flex;
        gap: 1rem;
    }
    #suggestionHolder {
        width: 58%;
        border: 2px solid var(--secondary);
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
        gap: 1rem;
    }
    #suggestionHolder div{
        display: flex;
        gap: 1rem;
    }
    #userAndActionWrapper{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 40%;
    }
    #userHolder{
        width: 100%;
        background-color: var(--transparentBackground);
        display: flex;
        flex-wrap: wrap;
        border-radius: 1rem;
        gap: 1rem;
        padding: 0.5rem;
    }
    #userHolder span{
        color: var(--text) !important;
    }
    #actionHolder{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    #actionHolder button{
        width: 20%;
        color: var(--text);
        font-family: 'Roboto';
        font-size: 14pt;
        border-radius: 10px;
        background-color: var(--secondary);
        min-height: 2rem;
    }
</style>