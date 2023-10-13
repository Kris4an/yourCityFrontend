<script lang='ts'>
    import { fade, fly, slide } from 'svelte/transition';

    import { spring } from 'svelte/motion';

	let coords = spring({ x: 50, y: 50 }, {
		stiffness: 0.1,
		damping: 0.25
	});

	let size = spring(10);

    let title:string = 'ТВОИТЕ ИДЕИ ЗА ТВОЯТ';
    let titleBold:string = 'ГРАД';
    let hover:boolean = false;

    const changeText = () => {
        hover = true;
        title = 'ТВОИТЕ ИДЕИ ЗА ТВОЯТА';
        titleBold = 'СТАРА ЗАГОРА';
    }
    const revertText = () => {
        hover = false;
        title = 'ТВОИТЕ ИДЕИ ЗА ТВОЯТ';
        titleBold = 'ГРАД';
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="titleMainHolder">
    <div class="holder" on:mouseover={changeText} on:mouseleave={revertText} on:focus={() => {}}>
        {#key hover}
            <span class="title" in:fade>
                {title} 
            </span>
            <b in:slide>
                {titleBold}
            </b>
        {/key}
    </div>
</div>

<style>
    .titleMainHolder{
        height: 99vh;
        background-color: #000000B4;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .holder{
        max-width: 55%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .title{
        user-select: none;
        color: white;
        font-family: 'Roboto';
        font-weight: 100;
        font-size: 120px;
        text-align: center;
    }
    b{
        user-select: none;
        font-family: 'Roboto';
        font-weight: 500;
        font-size: 120px;
        text-align: center;
        color: #1FB12F;
    }
</style>