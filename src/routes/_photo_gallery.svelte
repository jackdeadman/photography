<script>

    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import PhotoGallery from './_gallery_card.svelte';
    export let photos;

    let element;

    function formatDate(time) {
        const [year, month, day] = time.split(' ')[0].split(':');
        return `${day}/${month}/${year}`;
    }

    function formatTag(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function hasTag(tag, query) {
        const currentTags = query.getAll('tag');
        return currentTags.indexOf(tag) !== -1;
    }

    function setTag(tag) {
        const query = new URLSearchParams($page.query.toString());

        if (query.has('tag') && query.get('tag') == tag) {
            query.delete('tag');
        } else {
            query.delete('tag');
            query.append('tag', tag);
        }
        goto($page.path + '?' + query.toString())
    }

    function addTag(tag) {
        const query = new URLSearchParams($page.query.toString());
        const currentTags = query.getAll('tag');

        if (currentTags.indexOf(tag) == -1) {
            query.append('tag', tag);
        } else {
            query.delete('tag');
            const newTags = currentTags.filter(t => t !== tag);
            newTags.forEach(t => {
                query.append('tag', t);
            })
        }

        goto($page.path + '?' + query.toString())
    }

    $: tag = $page.query.get('tag');
    let photosToShow;

    $: {
        if (tag) {
            photosToShow = photos.filter((photo) => {
                return photo.tags.includes(tag);
            });
        } else {
            photosToShow = photos;
        }
    };

    let loadedFiles = {};
</script>

<h2 class="title">Gallery
    {#if tag}
    of: 
    <ul class="tags inline">
        <li class="active"><a href={hasTag(tag, $page.query) ? "/" : `?tag=${tag}`}>{formatTag(tag)}</a></li>
    </ul>
    {/if}
</h2>

<div class="container" bind:this={element}>
    {#each photosToShow as photo, i (photo.slug)}
        <PhotoGallery bind:loadedFiles photo={photo} eagar={i < 1}></PhotoGallery>
    {/each}
</div>


<style>

    .tags {
        margin: 5px 0;
        padding: 0;
    }

    .tags.inline {
        display: inline-block;
        margin: 0;
        position: absolute;
        margin-top: -5px;
        margin-left: 10px;
    }

    .tags.inline li {
        margin: 0;
    }
    
    .tags a {
        text-decoration: none;
    }

    .tags li {
        list-style: none;
        display: inline-block;
        padding: 5px 10px;
        border-radius: 5px;
        background-color: #fff;
        border: 1px solid #ccc;
        color: #222;
        margin: 5px 10px 5px 0;
    }

    .tags li.active {
        background-color: #222;
        color: #ddd;
    }

    .tags li.active a {
        color: #ddd;
    }

    h2.title {
        margin: 0;
    }

    h2 {
        color: #888;
        font-size: 1.4em;
    }

    h2 a {
        text-decoration: none;
    }

    img {
        transition: opacity 0.1s ease;
    }

    img:hover {
        opacity: 0.9;
    }


    .img-card {
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-gap: 2rem;
        max-width: 900px;
        margin: 1rem 0 2rem 0;
    }

    @media only screen and (max-width: 600px) {
        .img-card {
            display: block;
            margin-bottom: 4rem;
        }

        h2:not(.title) {
            margin-top: 1rem !important;
        }
    }

    figure {
        margin: 0;
    }


    figure img {
        display: block;
        width: 100%;
        height: auto;
    }

    date {
        font-weight: bold;
        font-size: 0.8em;
        text-align: right;
        width: 100%;
        display: block;
    }

    .info h2 {
        margin-top: 0;
    }
</style>