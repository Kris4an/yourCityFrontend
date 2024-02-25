import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const ssr = false;

export const load = (async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const res = await fetch(PUBLIC_API_URL+"/suggestion/my?page=1", {
        method: 'GET',
        credentials: 'include',
        headers
    })
    if(res.status == 200){
        return {
            suggestions: await res.json()
        }
    }
    return {};
}) satisfies PageLoad;