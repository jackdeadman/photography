<script>
    export let photos;

    function formatDate(time) {
        const [year, month, day] = time.split(' ')[0].split(':');
        return `${day}/${month}/${year}`;
    }
</script>
<h2 class="title">Gallery</h2>

<div class="container">
    {#each photos as photo (photo.slug)}
        <div class="img-card">
            <a sveltekit:prefetch href={`/photo/${photo.slug}`}>
                <figure>
                    <picture>
                        <source srcset={photo.versions.small} type="image/webp">
                        <source srcset={photo.versions.small_jpg} type="image/jpeg"> 
                        <img src={photo.versions.small_jpg} alt={photo.alt}>
                    </picture>
                </figure>
            </a>

            <div class="info">
                <h2><a href={`/photo/${photo.slug}`}>{photo.name}</a></h2>
                <p>{photo.description}</p>
                <date>{formatDate(photo.meta.exif.DateTimeOriginal)}</date>
            </div>
        </div>
    {/each}
</div>


<style>

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
        margin: 1rem 0;
    }

    @media only screen and (max-width: 600px) {
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

    date {
        font-weight: bold;
        font-size: 0.8em;
        text-align: right;
        width: 100%;
        display: block;
    }
</style>