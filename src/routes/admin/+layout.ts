import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';


export const ssr = false;

export const load = (async ({ }) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
	const res = await fetch(PUBLIC_API_URL+'/account', {
		method: 'GET',
		credentials: 'include',
		headers
	})
	if(res.status == 200){
		const data = await res.json()
		if(data.role != 'admin'){
			error(403, {
				message: 'Forbidden',
			});``
		}
	}
	if(res.status == 401){
		error(403, {
			message: 'Forbidden',
		});
	}
}) satisfies LayoutLoad;