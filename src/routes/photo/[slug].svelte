<script context="module">

    export async function load({ page, fetch, session, context }) {

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
</script>


<svelte:head>
    <meta property="og:image" content={image.versions.med} />
    <meta property="og:description" content={image.description} />
    <meta property="og:title" content={image.title} />
</svelte:head>

<h2><a href="/">Gallery</a> / {image.name}</h2>
<div class="container">
    <figure>
        <img src={image.versions.med} alt="">
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

    h2 {
        margin: 0;
        color: #888;
        font-size: 1.4em;
    }

    .container {
        display: grid;
        grid-template-columns: minmax(auto, max-content) 300px;
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