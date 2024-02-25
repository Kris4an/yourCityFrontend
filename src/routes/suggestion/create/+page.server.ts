import type { PageServerLoad } from './$types';
//@ts-ignore
import { API_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';

export const load = (async ({ parent }) => {
    const data = await parent()
    if(data.user == null){
        throw error(403, {
            message: "За изпращане на предложение трябва да си влязъл в профила си!"
        })
    }
    const res = await fetch(API_URL+"/suggestion/category",{
        method: 'GET'
    })
    if(res.status == 200){
        return{
            categories: await res.json()
        }
    }
    return {};
}) satisfies PageServerLoad;