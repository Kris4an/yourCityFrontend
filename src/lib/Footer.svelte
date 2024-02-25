<footer>
    <div class="holder">
        <span class='title'>Социални мрежи</span>
        <a class="item" href="https://www.instagram.com/mladkmet/">Instagram</a>
        <a class="item" href="https://facebook.com">Facebook</a>
    </div>
    <div class="holder">
        <span class='title'>Правна информация</span>
        <a class="item" href="/terms-of-service">Условия за ползване</a>
        <a class="item" href="/privacy-policy">Политика за поверителност</a>
    </div>
    <div class="holder">
        <span class='title'>Контакти</span>
        <a class="item" href="mailto:kmetnamladazagora@gmail.com">kmetnamladazagora@gmail.com</a>
        <a class="item" href="mailto:contact@yourstz.com">contact@yourstz.com</a>
    </div>
</footer>

<style>
    .item{
        font-family: 'Roboto';
        color: var(--text);
        font-size: 16px;
        text-decoration: none;
        transition: all ease-in-out 300ms;
    }
    .title{
        font-family: 'Roboto';
        color: var(--text);
        font-size: 18px;
        border-bottom: 1px solid var(--text);
        border-top: 1px solid var(--text);
        padding: 5px 0px 5px 0px;
        letter-spacing: 2px;
    }
    .holder{
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    footer{
        width: 100%;
        height: 8rem;
        display: flex;
        align-items: flex-start;
        background-color: var(--secondary);
        justify-content: space-around;
        padding: 1rem 0rem 1rem 0rem;
    }
    a:hover{
        text-decoration: underline;
    }
</style>