import type { LayoutLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const ssr = false;

export const load: LayoutLoad = async () => {
	const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //const cookie = "user_session="+cookies.get("user_session");
    /*if (cookie) {
        headers.append('Cookie', cookie);
    }*/
	const res = await fetch(PUBLIC_API_URL+'/account', {
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