<script>
    export let photos;
</script>

<div class="container">
    {#each photos as photo (photo.slug)}
        <a href={`/photo/${photo.slug}`}>
            <figure>
                <img src={photo.versions.med_jpg} alt="">
            </figure>
        </a>
    {/each}
</div>


<style>

    .container {

    }

    figure {
        margin: 1rem 0;
        max-width: 400px;
    }


    figure img {
        display: block;
        width: 100%;
    }
</style>