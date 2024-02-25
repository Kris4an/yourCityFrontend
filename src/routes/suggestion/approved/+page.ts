import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const ssr = false;

export const load = (async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const res = await fetch(PUBLIC_API_URL+"/suggestion/approved",{
        method: 'GET',
        headers
    })
    if(res.status == 200){
        return{
            approvedSuggestions: await res.json()
        }
    }
    return {};
}) satisfies PageLoad;