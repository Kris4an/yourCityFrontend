import type { PageServerLoad } from './$types';
//@ts-ignore
import { API_URL } from '$env/static/private';

export const load = (async ({ cookies }) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const cookie = "user_session="+cookies.get("user_session");
	if (cookie) {
        headers.append('Cookie', cookie);
    }
    const res = await fetch(API_URL+'/suggestion/all?page=1', {
		method: 'GET',
		credentials: 'include',
		headers
	})
    if(res.status == 200){
		return{
			suggestions: await res.json()
		}
	}
	return {};
}) satisfies PageServerLoad;