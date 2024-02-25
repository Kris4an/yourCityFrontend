import type { PageLoad } from './$types';

import { PUBLIC_API_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const ssr = false;

export const load = (async ({params}) => {
    if(params.id == null){
        throw error(404, {
            message: 'Not Found',
        });
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const res = await fetch(PUBLIC_API_URL+"/admin/suggestion/"+params.id,{
        method: 'GET',
        credentials: 'include',
        headers
    })
    if(res.status == 200){
        return{
            suggestion: await res.json()
        }
    }
    else throw error(400, {
        message: 'Error',
    });
}) satisfies PageLoad;