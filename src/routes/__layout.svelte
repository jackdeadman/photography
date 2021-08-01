<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Roboto&display=swap" rel="stylesheet">


    <link
        type="application/atom+xml"
        rel="alternate"
        href="/rss.xml"
        title="Jack Deadman Photography"
    />
</svelte:head>

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
</style>