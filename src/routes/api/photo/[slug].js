import db from '$lib/database';

export async function get({params}) {

    let imageData;

    try {
        imageData = await db.getBySlug(params.slug);
    } catch {
        return {
            status: '404',
            body: { error: `No image with the slug "${params.slug}"` }
        }
    };

    return {
        body: await db.getBySlug(params.slug)
    };

}