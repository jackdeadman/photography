<script>
    export let photos;
</script>

<div class="container">
    {#each photos as photo (photo.slug)}
        <div class="img-card">
            <a sveltekit:prefetch href={`/photo/${photo.slug}`}>
                <figure>
                    <picture>
                        <source srcset={photo.versions.small} type="image/webp">
                        <source srcset={photo.versions.small_jpg} type="image/jpeg"> 
                        <img src={photo.versions.small_jpg} alt="Alt Text!">
                    </picture>
                </figure>
            </a>

            <div class="info">
                <h2>{photo.name}</h2>
                <p>{photo.description}</p>
            </div>
        </div>
    {/each}
</div>


<style>

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
        max-width: 700px;
        margin: 1rem 0;
    }

    @media only screen and (max-width: 800px) {
        .img-card {
            display: block;
            margin-bottom: 4rem;
        }
    }

    figure {
        margin: 0;
    }


    figure img {
        display: block;
        width: 100%;
    }
</style>