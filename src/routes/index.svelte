<script context="module">

    export async function load({context}) {
        return {
            props: { photos: context.photos }
        }
    }
</script>

<script>
    import PhotoGallery from './_photo_gallery.svelte';
    import { photosStore } from '../stores/photos.js';
    
    export let photos;

</script>

<svelte:head>
    <title>Photos by Jack Deadman</title>
</svelte:head>


<PhotoGallery photos={photos}/>
