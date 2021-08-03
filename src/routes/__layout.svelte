<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Roboto&display=swap" rel="stylesheet" >

    <meta name="description" content="A mini-blog / gallery showcasing show pictures taken by Jack Deadman.">


    <link
        type="application/atom+xml"
        rel="alternate"
        href="/rss.xml"
        title="Jack Deadman Photography"
    />

</svelte:head>


<svelte:window on:popstate={e => {
    // Hack to fix inifinite scroll back button not working
    setTimeout(() => {
        scrollTo({
            top: e.state['sveltekit:scroll'].y,
            left: e.state['sveltekit:scroll'].x
        });
    }, 80)
}} />


<script context="module">

    export async function load({fetch}) {
        const url = '/api/photos.json';
        const res = await fetch(url);

        if (res.ok) {
            const photos = await res.json();
            return {
                context: { photos }
            }
        }

        return {
            status: res.status,
            error: new Error('Failed to load images.'),
        };
    }
</script>

<script>
    import Nav from '../components/nav.svelte';
    import Footer from '../components/footer.svelte';
</script>

<Nav></Nav>
<hr>
<slot></slot>
<hr>
<Footer></Footer>
<style>

:global(body) {
    margin: 0 40px;
    font-family: 'Open Sans', sans-serif;
    background: url('/bg.png');
}

:global(a) {
    color: #222;
    transition: color ease 0.2s;
}

:global(a:hover) {
    color: #666;
}

:global(h1, h2, h3, h4) {
    color: #222;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 1rem;
}


:global(hr) {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px #aaa solid;
    box-shadow: 1px 1px 2px #ccc;
    margin: 1em 0; padding: 0;
}

:global(.button) {
    display: inline-block;
    padding: 5px 10px;
    background-color: #fff;
    
    color: #111;
    border: 1px solid #aaa;
    
    text-decoration: none;
    border-radius: 5px;
    transition: all ease 0.2s;
}

:global(.button:hover) {
    border: 1px solid #ccc;
    color: #555;
}
</style>