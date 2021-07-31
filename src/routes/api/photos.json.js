import db from '$lib/database';

export async function get({params}) {
    return await {
        body: await db.photos()
    };
}