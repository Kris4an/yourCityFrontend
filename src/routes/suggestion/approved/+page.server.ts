import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load = (async ({cookies}) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const cookie = "user_session="+cookies.get("user_session");
    if (cookie) {
        headers.append('Cookie', cookie);
    }
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
}) satisfies PageServerLoad;