<script>
    import { goto } from '$app/navigation';
	import Button from "$lib/Button.svelte";

    let content = "RSVP";
    let onClick = () => { goto('/rsvp'); };

</script>
<div class="hero">
    <div class="cta">
        <h1>Join us for a reception</h1>
        <div class="deets">
            <p>7.22.2023</p>
            <p>4:00 PM</p>
            <br>
            <address>
                9284 Sycamore Dr.<br>
                Catawissa, PA<br>
                17820
            </address>
        </div>
        <Button {content} {onClick}/>
    </div>
</div>

<style>
    .hero {
        background-image: url('/homeBG.png');
        background-position-x: 80%;
        background-position-y: -80%;
        background-repeat: no-repeat;
        background-color: var(--cream);
    }

    .cta {
        text-align: center;
        font-size: 28px;
        padding: 16px 0;
    }

    .cta h1 {
        font-family: Avalon, cursive;
        font-size: 48px;
    }

    .cta address {
        font-style: normal;
    }

    @media only screen and (min-width: 767px) {
        .hero {
            background-size: cover;
        }

        .cta {
            position: relative;
            max-width: max-content;
            margin: 5% 20%;
            padding: 16px 48px;
            -webkit-backdrop-filter: blur(5px);
            backdrop-filter: blur(5px);
        }

        .cta h1 {
            font-size: 64px;
        }
    }
</style>
