import type { PageServerLoad } from './$types';
//@ts-ignore
import { API_URL } from '$env/static/private';

export const load = (async () => {
    // const res = await fetch(API_URL+"/suggestion/approved",{
    //     method: 'GET'
    // })
    return {};
}) satisfies PageServerLoad;