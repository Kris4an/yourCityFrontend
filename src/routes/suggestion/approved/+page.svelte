<script lang="ts">
    import Suggestion from '$lib/Suggestion.svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>
<div id="wrapper">
    <div id="title">
        ОДОБРЕНИ ПРЕДЛОЖЕНИЯ
    </div>
    <div id="suggestionHolder">
        {#if data.approvedSuggestions.length == 0}
            <b id="noApproved">Все още няма одобрени предложения</b>
        {/if}
        {#each data.approvedSuggestions as approvedSuggestion}
            <div class="approvedSuggestion">
                <Suggestion suggestion={approvedSuggestion.suggestion}/>
                <span>Повече информация: {approvedSuggestion.moreInfo}</span>
                <span>Последно актуализирано: {new Date(approvedSuggestion.date).toLocaleDateString()}</span>
            </div>
        {/each}
    </div>
</div>
<style>
    #wrapper{
        display: flex;
        flex-direction: column;
        gap: 5rem;
    }
    #title{
        font-family: 'Roboto';
        font-size: 50pt;
        background-color: var(--transparentBackground);
        text-align: center;
        vertical-align: middle;
        padding: 2rem 0rem;
        color: var(--text);
        width: 100%;
    }
    #suggestionHolder{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3rem;
        padding-bottom: 3rem;
    }
    #noApproved{
        font-family: 'Roboto';
        font-size: 23pt;
    }
    .approvedSuggestion{
        background-color: var(--transparentBackground);
        border-radius: 1rem;
        width: fit-content;
        display: flex;
        flex-direction: column;
    }
    .approvedSuggestion span{
        font-family: 'Roboto';
        font-size: 14pt;
        color: var(--text);
        margin: 5px 10px;
    }
    @media only screen and (max-width: 800px) {
        #wrapper{
            max-width: 100vw;
        }
        #title{
            font-size: 30pt;
        }
    }
</style>