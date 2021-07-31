<script context="module">

    export async function load({ page, fetch}) {

        const url = `/api/photo/${page.params.slug}`;
        const res = await fetch(url);

        return {
            props: {
                image: await res.json()
            }
        }
    }
</script>


<script>
    export let image;
    let fullscreen = false;
</script>


<svelte:head>
    <meta property="og:image" content={image.versions.med} />
    <meta property="og:description" content={image.description} />
    <meta property="og:title" content={image.title} />
</svelte:head>

<h2><a sveltekit:prefetch href="/">Gallery</a> / {image.name}</h2>

{#if fullscreen}
    <div class="fullscreen">
        <a href="#" on:click|preventDefault={() => {fullscreen=false}}></a>
        <img src={image.versions.med} alt="">
    </div>
{/if}
<div class="container">
    <figure>
        <img on:click|preventDefault={() => {fullscreen=true}} src={image.versions.med} alt="">
    </figure>

    <div class="info">
        <p>{image.description}</p>

        <ul class="exif">
            <li><b>{image.meta.image.Model}</b></li>
            <li><b>{image.meta.exif.LensModel}</b></li>

            <li>F/{image.meta.exif.FNumber}</li>
            <li>ISO {image.meta.exif.ISO}</li>
            <li>1/{1 / image.meta.exif.ExposureTime}</li>
            <li>{image.meta.exif.FocalLength}mm</li>
        </ul>
        <a href={image.versions.full_jpg}>Download image</a>
    </div>
</div>

<style>

    .fullscreen {

  /* Set up proportionate scaling */
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.95);

  /* Set up positioning */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
    }



    .fullscreen a {
        color: #fff;
        z-index: 100;
        position: absolute;
        font-size: 3em;
         top: 0; 
        left: 0; 
        right: 0; 
        bottom: 0; 
    }

    .fullscreen img {
       /* max-width: 100%;
    max-height: 100%; */
    bottom: 0;
    left: 0;
    margin: auto;
    overflow: auto;
    position: fixed;
    right: 0;
    top: 0;
    object-fit: contain;

    }

    h2 {
        margin: 0;
        color: #888;
        font-size: 1.4em;
    }

    .container {
        display: grid;
        grid-template-columns: minmax(auto, max-content) 300px;
        margin-bottom: 2rem;
    }

    @media only screen and (max-width: 800px) {
        .container {
            display: block;
        }
    }

    .info {
        margin: 0 1rem;
    }

    figure {
        margin: 0;
        width: 100%;
    }

    .exif {
        margin: 1rem 0;
    }

    img {
        cursor: pointer;
        display: block;
        width: auto;
        max-width: 100%;
        max-height: 80vh;
        margin: 1rem 0;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    ul li {
        list-style: none;
        margin: 0;
    }
</style>