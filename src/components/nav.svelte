<div class="container">

    <h1><a href="/"><div class="me"></div><span>Jack&rsquo;s Photos</span></a></h1>

    <ul class="social">
        <li>
            <a href="https://instagram.com/jackdeadman96">
                <img src="/insta.png" alt="Instagram logo">
            </a>
        </li>
    </ul>
</div>

<style>

    .container {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
    }

    .social {
        margin: 0;
        position: relative;
        top: 12px;
        padding: 0;
        list-style: none;
    }

    h1 {
        margin-bottom: 0;
        font-size: 1.6em;
    }

    .social img {
        width: 40px;
        height: 40px;
    }

    .social img:hover {
        opacity: 0.8;
    }

    h1 .me {
        display: inline-block;
        vertical-align: baseline;
        border-radius: 100%;
        height: 50px;
        width: 50px;
        margin-right: 10px;
        margin-bottom: -10px;
        background: url('/me.jpg') center;
    }

    a {
        color: #000;
        text-decoration: none;
    }

    a:hover {
        color: #888;
    }

</style>