<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600&display=swap" rel="stylesheet">
</svelte:head>

<script>
    import Nav from '../components/nav.svelte';
</script>

<Nav></Nav>
<hr>
<slot></slot>

<style>

:global(body) {
    margin: 0 40px;
}

:global(h1, h2, h3, h4) {
    color: #222;
    font-family: 'Lora', serif;
    margin-bottom: 1rem;
}


:global(hr) {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px #ccc solid;
    margin: 1em 0; padding: 0;
}
</style>