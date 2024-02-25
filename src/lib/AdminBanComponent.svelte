<script lang="ts">
	import type AdminBan from "./entities/AdminBan";

    export let ban: AdminBan;
</script>
<div>
    <span>{new Date(ban.startDate.toString()).toLocaleDateString()}</span>
    <span>Продължителност: {ban.banLength} дни</span>
    <span>Причина: {ban.reason}</span>
    <span>Администратор: {ban.adminName} ({ban.adminName})</span>
</div>
<style>
    div{
        display: flex;
        flex-direction: column;
        border: 2px solid var(--secondary);
        padding: 5px;
        border-radius: 10px;
    }
    span{
        font-family: 'Roboto';
        font-size: 14pt;
        color: var(--secondary);
    }
</style>