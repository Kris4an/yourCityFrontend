<script lang='ts'>
import type PublicSuggestion from "./entities/PublicSuggestion";
	import type PublicUser from "./entities/PublicUser";
    
	import { PUBLIC_API_URL } from '$env/static/public';
    export let suggestion: PublicSuggestion;
    export let disableLike = false;
    let simpleUser: PublicUser = {
        name:'',
        role:'',
        school: ''
    }
    let color = '';
    $: if(suggestion.user == null && !suggestion.isAnon){
        simpleUser.name = "Изтрит потребител"
        simpleUser.role = "Изтрита роля"
        simpleUser.school = "Изтрито училище"
    } else if(suggestion.user == null){
        simpleUser.name = "Анонимен потребител"
        simpleUser.role = "Анонимна роля"
        simpleUser.school = "Анонимно училище"
    }
     else {
        simpleUser.name = suggestion.user.name
        switch(suggestion.user.role){
            case 'student': {
                simpleUser.role = 'ученик'
                simpleUser.school = suggestion.user.school == null? "Незнайно училище":suggestion.user.school
                break;
            }
            case 'citizen': {
                simpleUser.role = 'гражданин'
                simpleUser.school = 'Гражданин'
                break;
            }
        }
    }
    $: if(disableLike != true) switch(suggestion.category.toLowerCase()){
        case "спорт": {
            color = "#26C4E7";
            break;
        }
        default: color = ''
    }

    async function likeButtonPress() {
        if(suggestion.isLikedByUser == null){
            alert("За да харесаш преложение, трябва да си влясъл в профила си!")
        }
        switch(suggestion.isLikedByUser){
            case false: {
                const res = await fetch(PUBLIC_API_URL+"/suggestion/like/"+suggestion.id, {
                    method: "POST",
                    credentials: 'include'
                })
                if(res.status == 200){
                    suggestion.isLikedByUser = true;
                    suggestion.likes++;
                }
                break;
            }
            case true: {
                const res = await fetch(PUBLIC_API_URL+"/suggestion/unlike/"+suggestion.id, {
                    method: "DELETE",
                    credentials: 'include'
                })

                if(res.status == 200){
                    suggestion.isLikedByUser = false;
                    suggestion.likes--;
                }
                break;
            }
        }
    }
</script>
<div id="wrapper" style="border-color: {color}">
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <span style="color: {color}; font-size: 20pt;">{suggestion.category}</span>
        <b style="color: {color}; font-size: 22pt;">{suggestion.title}</b>
        <span style="color: {color}; font-size: 14pt; text-align: justify;">{suggestion.content}</span>
    </div>
    
    <div id='bottomDiv'>
        <div>
            <span style="color: {color}; font-size: 18pt">{new Date(suggestion.postDate).toLocaleDateString()}</span>
            <b title={simpleUser.school+""} style="color: {color}; font-size: 16pt">{simpleUser.name}</b>
        </div>
        <button style="background-color: {color}" on:click={likeButtonPress} disabled={disableLike}>{suggestion.likes}{suggestion.isLikedByUser? '💖':'🤍'}</button>
    </div>
</div>

<style>
    #wrapper{
        width: 80vw;
        max-width: 55rem;
        min-height: 15rem;
        padding: 1rem;
        height: fit-content;
        border: 5px solid;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 2rem;
        background-color: var(--text);
        border-color: var(--primary);
    }
    #bottomDiv{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #bottomDiv div{
        display: flex;
        flex-direction: column;
    }
    span, b {
        font-family: 'Roboto';
        color: var(--primary);
    }
    button{
        border-radius: 5px;
        border: none;
        color: var(--text);
        font-family: 'Roboto';
        font-size: 18pt;
        padding: 5px;
        min-width: 6rem;
        background-color: var(--primary);
        transition: all 300ms ease-in-out;
        cursor: pointer;
    }
    button:disabled{
        background-color: grey;
        cursor: auto;
    }
    button:hover:not([disabled]){
        min-width: 7rem;
        font-size: 20pt;
    }
</style>