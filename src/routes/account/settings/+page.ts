import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const ssr = false;

export const load = (async () => {
    const res = await fetch(PUBLIC_API_URL+"/school/all",{
        method: 'GET'
    })
    if(res.status == 200){
        return{
            allSchools: await res.json()
        }
    }
    return {};
}) satisfies PageLoad;