import db from '$lib/database';

export async function get() {
    return await {
        body: await db.photos(),
        headers: {
            'cache-control': 'max-age=120'
        }
    };
}