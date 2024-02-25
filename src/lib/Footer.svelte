<footer>
	<div class="holder">
		<span class="title">Социални мрежи</span>
		<a class="item" href="https://www.instagram.com/mladkmet/">Instagram</a>
		<a class="item" href="https://www.facebook.com/mos.stz/?locale=bg_BG">Facebook</a>
	</div>
	<div class="holder">
		<span class="title">Правна информация</span>
		<a class="item" href="/terms-of-service">Условия за ползване</a>
		<a class="item" href="/privacy-policy">Политика за поверителност</a>
	</div>
	<div class="holder">
		<span class="title">Контакти</span>
		<a class="item" href="mailto:kmetnamladazagora@gmail.com">kmetnamladazagora@gmail.com</a>
		<a class="item" href="mailto:contact@yourstz.com">contact@yourstz.com</a>
	</div>
</footer>

<style>
	.item {
		font-family: 'Roboto';
		color: var(--text);
		font-size: 11pt;
		text-decoration: none;
		transition: all ease-in-out 300ms;
        text-align: center;
	}
	.title {
		font-family: 'Roboto';
		color: var(--text);
		font-size: 14pt;
		border-bottom: 1px solid var(--text);
		border-top: 1px solid var(--text);
		padding: 5px 0px;
		letter-spacing: 2px;
        text-align: center;
	}
	.holder {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	footer {
		width: 100%;
		height: 8rem;
		display: flex;
		align-items: flex-start;
		background-color: var(--secondary);
		justify-content: space-around;
		padding: 1rem 0rem;
	}
	a:hover {
		text-decoration: underline;
	}
	@media only screen and (max-width: 800px) {
		.item{
            font-size: 8pt;
        }
        .title{
            font-size: 10pt;
        }
        footer, .title {
            padding: 0px;
        }
        .holder{
            flex-direction: row;
            justify-content: space-around;
            width: 100%;
        }
        footer{
            width: 100vw;
            height: fit-content;
            flex-direction: column;
            gap: 1rem;
            padding: 10px 0px;
        }
	}
</style>
