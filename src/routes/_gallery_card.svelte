<script>
    import IntersectionObserver from "svelte-intersection-observer";
    import { fade } from 'svelte/transition';
    import snarkdown from "snarkdown";
    import { page } from '$app/stores';

    export let photo;
    export let eagar = false;
    export let loadedFiles;
    let element;

    function formatTag(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function formatDate(time) {
        const [year, month, day] = time.split(' ')[0].split(':');
        return `${day}/${month}/${year}`;
    }

    function hasTag(tag, query) {
        const currentTags = query.getAll('tag');
        return currentTags.indexOf(tag) !== -1;
    }

    let intersecting = false;

    $: {
        if (intersecting) {
            loadedFiles[photo.slug] = intersecting;
        }
    };
</script>

<IntersectionObserver rootMargin="0px" once {element} bind:intersecting>
	<div class="img-card" bind:this={element}>
		<div>
            {#if intersecting || eagar}
                <figure>
                    <a sveltekit:prefetch href={`/photo/${photo.slug}`}>
                        {#if eagar}
                            <picture>
                                <source srcset={photo.versions.small} type="image/webp" />
                                <source srcset={photo.versions.small_jpg} type="image/jpeg" />
                                <img
                                    width={photo.dims.small.width}
                                    height={photo.dims.small.height}
                                    src={photo.versions.small_jpg}
                                    alt={photo.alt}
                                />
                            </picture>
                       {:else}
                            <picture>
                                <source srcset={photo.versions.small} type="image/webp" />
                                <source srcset={photo.versions.small_jpg} type="image/jpeg" />
                                <img
                                    width={photo.dims.small.width}
                                    height={photo.dims.small.height}
                                    src={photo.versions.small_jpg}
                                    alt={photo.alt}
                                />
                            </picture>
                        {/if}
                    </a>
				</figure>
            
            
            {:else}
                <div style="width:{photo.dims.small.width}px; height={photo.dims.small.height}px"></div>
            {/if}
		</div>

		<div class="info">
			<h2><a sveltekit:prefetch href={`/photo/${photo.slug}`}>{photo.name}</a></h2>
			<p>{@html snarkdown(photo.description)}</p>
			<date>{formatDate(photo.meta.exif.DateTimeOriginal)}</date>

			<ul class="tags">
				{#each photo.tags as tag (tag)}
                    <li class:active={hasTag(tag, $page.query)}><a class="button" href={hasTag(tag, $page.query) ? "/" : `?tag=${tag}`}>{formatTag(tag)}</a></li>
				{/each}
			</ul>
		</div>
	</div>
</IntersectionObserver>

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
        margin: 5px 10px 5px 0;
        /* padding: 5px 10px;
        border-radius: 5px;
        background-color: #fff;
        border: 1px solid #ccc;
        color: #222;
        margin: 5px 10px 5px 0; */
    }

    .tags li.active a {
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