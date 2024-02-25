import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

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
}) satisfies PageServerLoad;