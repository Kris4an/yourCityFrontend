<div class="navBarHolder">
    <nav>
        <a href="/">Начало</a>
        <a href="/vote">Гласувай</a>
        <a href="/suggest">Направи предложение</a>
        <a href="/approved">Одобрени предложения</a>
        <a href="/login">Влез</a>
    </nav>
</div>

<style>
    .navBarHolder{
        position: sticky;
        top: 0;
        width: 100%;
        height: 4rem;
        background-color: #75A57A;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        z-index: 5;
    }
    nav{
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
    }
    a{
        color: white;
        text-decoration: none;
        font-family: 'Roboto';
        font-weight: 500;
        font-size: 20px;
        transition: all ease-in-out 300ms;
    }
    a:hover{
        font-size: 22px;
        font-weight: 700;
    }
</style>