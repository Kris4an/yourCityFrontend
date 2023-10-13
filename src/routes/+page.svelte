<script lang='ts'>
    import { fade, blur, slide } from 'svelte/transition';
	import HomePageTitle from "$lib/HomePageTitle.svelte";
    let y: number;
    $: innerHeight = 0;
    $: anim1 = y > 180 && y < 1.6*innerHeight;
    $: anim2 = y > 1.3*innerHeight;
    $: anim3 = y > 1.5*innerHeight;
</script>

<svelte:window bind:scrollY={y} bind:innerHeight/>

<HomePageTitle/>
<div class="imgSectionBg">
    {#key anim1}
    <p in:slide={{duration: 400}}>Направи предложение</p>
    <span in:fade={{duration: 600}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis tortor sed nunc imperdiet luctus. In venenatis, dui gravida volutpat aliquet, nisi sem aliquet lacus, id auctor massa dui sed lectus. Aliquam interdum sem justo, eu aliquam ipsum elementum eget. Vivamus suscipit odio sed tristique blandit. Curabitur sagittis odio augue. Sed faucibus vulputate nibh vel viverra. Morbi nec quam sagittis, dictum nunc nec, lacinia lorem.</span>
    {/key}
</div>
<div class="bottomSection">
    <div class="halfSection">
        {#key anim2}
            <img in:blur={{duration: 400}} src="/images/niki.jpg" alt="kitaeca"/>
            <div>
                <p in:slide={{duration: 400}}>Гласувай</p>
                <span in:fade={{duration: 600}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis tortor sed nunc imperdiet luctus. In venenatis, dui gravida volutpat aliquet, nisi sem aliquet lacus, id auctor massa dui sed lectus. Aliquam interdum sem justo, eu aliquam ipsum elementum eget. Vivamus suscipit odio sed tristique blandit. Curabitur sagittis odio augue. Sed faucibus vulputate nibh vel viverra. Morbi nec quam sagittis, dictum nunc nec, lacinia lorem.</span>
            </div>
        {/key}
    </div>
    <div class="halfSection">
        {#key anim3}
            <div>
                <p in:slide={{duration: 400}}>Кои сме ние?</p>
                <span in:fade={{duration: 600}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis tortor sed nunc imperdiet luctus. In venenatis, dui gravida volutpat aliquet, nisi sem aliquet lacus, id auctor massa dui sed lectus. Aliquam interdum sem justo, eu aliquam ipsum elementum eget. Vivamus suscipit odio sed tristique blandit. Curabitur sagittis odio augue. Sed faucibus vulputate nibh vel viverra. Morbi nec quam sagittis, dictum nunc nec, lacinia lorem. Brah!</span>
            </div>
            <img in:blur={{duration: 400}} src="/images/niki.jpg" alt="kitaeca"/>
        {/key}
    </div>
</div>

<style> 
    .imgSectionBg{
        position: relative;
        height: 99vh;
        max-width: 100vw;
        background: linear-gradient(0deg, #0000004d 0%, #0000004d 100%), url('/images/linden.jpg');
        padding: 5rem;
    }
    .bottomSection{
        height: 150vh;
        display: flex;
        flex-direction: column;
        max-width: 100vw;
        position: relative;
        background-color: #000000B4;
    }
    .halfSection{
        max-width: 100vw;
        display: flex;
        justify-content: space-around;
        flex-grow: 1;
        padding: 5rem;
    }
    img{
        width: 40rem;
        height: 22rem;
        object-fit: fill;
        align-self: center;
    }
    p{
        z-index: 3;
        color: white;
        font-family: 'Roboto';
        font-size: 70px;
        width: fit-content;
        font-weight: 100;
    }
    span{
        z-index: 3;
        font-family: 'Roboto';
        font-size: 28px;
        color: white;
        max-width: 60rem;
        display: block;
        font-weight: 100;
    }
</style>