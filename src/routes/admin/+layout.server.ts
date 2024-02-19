import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ parent }) => {
    const data = await parent()
    if(data.user.role != 'admin') error(403, {
        message: 'Forbidden',
    });
    return {};
}) satisfies LayoutServerLoad;