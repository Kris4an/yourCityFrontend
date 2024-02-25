import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const ssr = false;

export const load = (async ({ }) => {
    /*if(data.user.role != 'admin') error(403, {
        message: 'Forbidden',
    });
    return {};*/
}) satisfies LayoutServerLoad;