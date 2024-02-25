<script lang="ts">
	import { fade, blur, slide } from 'svelte/transition';
	import HomePageTitle from '$lib/HomePageTitle.svelte';
</script>

<div>
	<HomePageTitle />
	<div class="imgSectionBg">
		<p in:slide={{ duration: 400 }} id="#text1">Направи предложение</p>
		<span in:fade={{ duration: 600 }}
			>След като направиш предложение по една от дадедните категории, то ще трябва да бъде одобрено
			от администратор. След това ще бъде достъпно за всички потребители, които ще могат да го
			харесат. Периодично предложенията ще се преглеждат и обсъждат от младите кметове и техните
			колеги от Младежки общински съвет. Ако идеята ти е одобрена ще бъде поставена на страницата за
			одобрени идеи, където ще се публикува и допълнителна информация за развитиети на проекта по
			предложението.</span
		>
	</div>
	<div class="bottomSection">
		<div class="halfSection">
			<img
				in:blur={{ duration: 400 }}
				src="/images/homePagePicture2.webp"
				alt="Община Стара Загора"
			/>
			<div>
				<p in:slide={{ duration: 400 }}>Гласувай</p>
				<span in:fade={{ duration: 600 }}
					>Прегледай предложенията на другите потребители и харесай най-добрите. По този начин всеки
					взима активно участие в избора на следващата инциатива на младите кметове и Младежки
					общински съвет. Всички идеи ще бъдат преглеждани, но тези с най-много харесвания ще имат
					най-голям шанс да бъдат реализирани.
				</span>
			</div>
		</div>
		<div class="halfSection">
			<div>
				<p in:slide={{ duration: 400 }}>Кои сме ние?</p>
				<span in:fade={{ duration: 600 }}
					>На снимката може да видите създателя на сайта - Кристиан Христакиев и човека отговорен за
					реалзацията на предложенията - младия кмет на Стара Загора - Никола Кирилов. Разбира се
					той не работи сам. Зад него стои Младежкия общински съвет и заместник младия кмет. Чрез
					гласуването и даването на идеи, всеки потребител на сайта помага за това Стара Загора да
					стане един по-добър град!</span
				>
			</div>
			<img
				in:blur={{ duration: 400 }}
				src="/images/homePagePicture1.jpg"
				alt="Създателя на сайта Кристиан Христакиев и Младия кмет на Млада Загора - Никола Кирилов"
			/>
		</div>
	</div>
</div>

<style>
	.imgSectionBg {
		position: relative;
		height: 99vh;
		max-width: 100vw;
		background: linear-gradient(0deg, #0000004d 0%, #0000004d 100%),
			url('/images/homePageBackground.jpg');
		padding: 5rem;
	}
	.bottomSection {
		min-height: 150vh;
		display: flex;
		flex-direction: column;
		width: 100vw;
		position: relative;
		background-color: var(--transparentBackground);
	}
	.halfSection {
		width: 100%;
		display: flex;
		justify-content: space-around;
		flex-grow: 1;
	}
	img {
		width: 40rem;
		height: 22rem;
		object-fit: cover;
		align-self: center;
	}
	p {
		z-index: 3;
		color: var(--text);
		font-family: 'Roboto';
		font-size: 55pt;
		width: fit-content;
		font-weight: 100;
	}
	span {
		z-index: 3;
		font-family: 'Roboto';
		font-size: 18pt;
		color: var(--text);
		max-width: 60rem;
		display: block;
		font-weight: 100;
		text-align: justify;
	}
	@media only screen and (max-width: 800px) {
		.halfSection{
			flex-direction: column;
		}
		span{
			font-size: 14pt;
		}
		p{
			font-size: 40pt;
		}
		.imgSectionBg{
			padding: 5rem 0px;
			width: 100vw;
			max-width: auto;
			height: 70vh;
		}
		img{
			max-width: 100vw;
		}
	}
</style>
