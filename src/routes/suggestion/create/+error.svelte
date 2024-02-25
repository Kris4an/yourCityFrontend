<script lang="ts">
    import { page } from '$app/stores';
</script>

<div>
    <b>{$page.status}</b>
    <span>{$page.error?.message}</span>
    <a href='/account/login'>Влeз в профил</a>
</div>

<style>
    div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
    }
    b{
        color: var(--primary);
        font-family: 'Roboto';
        font-size: 100pt;
        background-color: var(--text);
    }
    span, a{
        color: var(--secondary);
        font-family: 'Roboto';
        font-size: 25pt;
        background-color: var(--text);
    }

</style>