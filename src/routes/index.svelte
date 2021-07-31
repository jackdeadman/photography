<script context="module">

    export async function load({ page, fetch, session, context }) {

        const url = '/api/photos.json';
        const res = await fetch(url);

        if (res.ok) {
            return {
                props: {
                    photos: (await res.json())
                }
            }
        }

        return {
            status: res.status,
            error: new Error('Failed to load images.')
        };
    }
</script>

<script>
    import PhotoGallery from './_photo_gallery.svelte';
    export let photos;
</script>

<svelte:head>
    <title>Photos by Jack Deadman</title>
</svelte:head>


<PhotoGallery photos={photos}/>
