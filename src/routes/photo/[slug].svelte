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
    $: scrollable = !fullscreen;
	
	const wheel = (node, options) => {
		let { scrollable } = options;
            
            const handler = e => {
                if (!scrollable) e.preventDefault();
            };
            
            node.addEventListener('wheel', handler, { passive: false });
            
            return {
                update(options) {
                    scrollable = options.scrollable;
                },
                destroy() {
                    node.removeEventListener('wheel', handler, { passive: false });
                }
            };
    };
</script>

<svelte:window use:wheel={{scrollable}} />

<svelte:head>
    <meta property="og:image" content={image.versions.med} />
    <meta property="og:description" content={image.description} />
    <meta property="og:title" content={image.name} />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@jackdeadman96" />
    <meta name="twitter:creator" content="@jackdeadman96" />
</svelte:head>

<h2><a sveltekit:prefetch href="/">Gallery</a> / {image.name}</h2>

{#if fullscreen}
    <div class="fullscreen">
        <a href="#" on:click|preventDefault={() => {fullscreen=false}}></a>
        <img src={image.versions.med} alt={image.alt}>
    </div>
{/if}
<div class="container">
    <figure>
        <img on:click|preventDefault={() => {fullscreen=true}} src={image.versions.med} alt={image.alt}>
    </figure>

    <div class="info">
        <p>{image.description}</p>
    </div>
</div>

<span class="meta-name">Gear</span>
        <ul class="exif">
            <li><span class="pill">Camera</span><b>{image.meta.image.Model}</b></li>
            <li><span class="pill">Lens</span><b>{image.meta.exif.LensModel}</b></li>
        </ul>

        <span class="meta-name">Settings</span>
        <ul class="exif smaller">
            <li><span class="pill">F-Stop</span>F/{image.meta.exif.FNumber}</li>
            <li><span class="pill">ISO</span>{image.meta.exif.ISO}</li>
            <li><span class="pill">Shutter Speed</span>1/{1 / image.meta.exif.ExposureTime}</li>
            <li><span class="pill">Focal Length</span>{image.meta.exif.FocalLength}mm</li>
        </ul>
        <a href={image.versions.full_jpg}>Download image</a>

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
        margin-bottom: 1rem;
    }

    @media only screen and (max-width: 800px) {
        .container {
            display: block;
        }

        .info {
            margin: 0 !important;
        }
    }

    .info {
        margin: 0 1rem;
    }

    figure {
        margin: 0;
        width: 100%;
    }

    span.meta-name {
        font-weight: bold;
        font-style: normal;
    }

    span {
        font-style: italic;
    }

    .exif {
        margin-bottom: 1rem;
        font-size: 0.8rem;
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
        display: inline-block;
        list-style: none;
        margin: 5px 0;
        margin-right: 10px;
        border-bottom: 1px solid #555;
    }

    .pill {
        display: inline-block;
        background-color: #555;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        padding: 4px 8px;
        margin-right: 3px;
        color: #eee;
    }
</style>