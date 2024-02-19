import type { LayoutServerLoad } from './$types';
import { API_URL } from '$env/static/private';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const cookie = "user_session="+cookies.get("user_session");
    if (cookie) {
        headers.append('Cookie', cookie);
    }
	const res = await fetch(API_URL+'/account', {
		method: 'GET',
		credentials: 'include',
		headers
	})

	if(res.status == 401){
		return {
			user: null
		}
	}
	const user = await res.json();
	return {
		user: user
	};
	
};