<script context="module">

    export async function load({ page, fetch, context}) {

        const url = '/api/photos.json';
        const res = await fetch(url);

        if (res.ok) {
            const photos = await res.json();
            return {
                props: { photos },
                context: { photos }
            }
        }

        return {
            status: res.status,
            error: new Error('Failed to load images.'),
        };
    }
</script>

<script>
    import PhotoGallery from './_photo_gallery.svelte';
    import { photosStore } from '../stores/photos.js';
    
    export let photos;

    $: {
        if (photos) {
            console.log('Setting store')
            photosStore.set(photos);
        }
    }
</script>

<svelte:head>
    <title>Photos by Jack Deadman</title>
</svelte:head>


<PhotoGallery photos={photos}/>
