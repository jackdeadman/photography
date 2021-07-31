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

<figure>
    <img src={image.versions.med} alt="">
</figure>


<a href={image.versions.full_jpg}>Download high-res</a>

<style>

    figure {
        margin: 0;
        width: 100%;
    }

    img {
        margin: auto;
        display: block;
        width: auto;
        max-width: 100%;
        max-height: 80vh;
    }
</style>