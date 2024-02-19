import type { PageServerLoad } from './$types';
import { API_URL } from '$env/static/private';

export const load = (async () => {
    const res = await fetch(API_URL+"/school/all",{
        method: 'GET'
    })
    if(res.status == 200){
        return{
            allSchools: await res.json()
        }
    }
    return {};
}) satisfies PageServerLoad;