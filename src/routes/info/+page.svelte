<script>
    let sections = [
        {
            title: 'Lodging',
            content: `
                <p>Camp with us on site! But if you don't wish to camp, here are some nearby hotels:</p><br>
                <div class="hotels">
                    <div class="hotel">
                        <a href="https://www.marriott.com/en-us/hotels/segbl-fairfield-inn-and-suites-bloomsburg/overview/">Fairfield</a><br>
                        1065 Alliance Park Drive<br>
                        Bloomsburg, PA<br>
                        17815<br>
                        570-416-2777<br>
                    </div>
                    <div class="hotel">
                        <a href="https://www.hilton.com/en/hotels/blopahx-hampton-bloomsburg/">Hampton Inn</a><br>
                        255 Papermill Rd<br>
                        Bloomsburg, PA <br>
                        17815<br>
                        570-380-1020<br>
                    </div>
                    <div class="hotel">
                        <a href="https://www.ihg.com/holidayinnexpress/hotels/us/en/bloomsburg/blbpa/hoteldetail">Holiday Inn</a><br>
                        14 Mitchell Drive<br>
                        Bloomsburg, PA <br>
                        17815<br>
                        570-387-6702<br>
                    </div>
                </div>`,
            src: '/tent.jpg',
        },
        {
            title: 'Food',
            content:`<p>Food will be provided by Boobs Catering - BBQ Style. There is an open bar (of course!) with beer supplied by Catawissa Bottling. Additional liquors, seltzers, and non-alcoholic drinks will also be available. Hang around for a surprise Philly special at the end of the night!</p>`,
            src: '/bbq.jpg',
        },
        {
            title: 'Dress',
            content: `<p>No dress code, so dress how you like. Pookie says it's clothing optional 😉</p>`,
            src: '/boot.jpg',
        },
        {
            title: 'Gifts',
            content: `<p>Your presence is the only present required! Please, no gifts.</p>`,
            src: '/gifts.jpg',
        },
        {
            title: 'Contact',
            content: `<p>For any questions, don't hesitate to reach out</p><br>
            <div class="contacts">
                <p>Before the day-of:</p>
                <ul><li>Stephanie: 610-781-4664</li></ul><br>
                <p>The day-of:</p>
                <ul><li>Garratt: 570-394-0078</li></ul>
            </div>
            `,
            src: '/contact.jpg',
        },
    ];
</script>

<div class="info">
    {#each sections as {title, content, src}, index}
    <div class="section group-{index}">
        <img {src} alt="wedding"/>
        <div class="content">
            <h2>{title}</h2>
            <div>{@html content}</div>
        </div>
    </div>
    {/each}
</div>

<style>
    .info {
        background-color: var(--cream);
    }
    .section {
        position: relative;
        min-height: max-content;
        background-color: var(--cream);
        overflow: hidden;
    }
    
    .section:nth-child(even) {
        background-color: hsla(11, 37%, 24%, 1);
        color: var(--cream);
    }

    .section img {
        position: absolute;
        top: 0;
        left: 0;
        max-width: 100%;
        min-height: 100%;
        opacity: 10%;
        pointer-events: none;
    }

    .content {
        padding: 24px;
        font-size: 24px;
    }

    .content :global(a:visited) {
        color: initial;
    }

    .content h2 {
        font-size: 48px;
    }

    .content :global(.hotels) {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    @media only screen and (min-width: 767px) {
        .section {
            position: initial;
            display: grid;
            grid-template-columns: 1fr 2fr;
            align-items: center;
        }

        .section img {
            position: initial;
            opacity: 100%;
            pointer-events: none;
            height: 100%;
            overflow-x: scroll;
            grid-column: 1;
        }

        .section:nth-child(even) {
            display: grid;
            grid-template-columns: 2fr 1fr;
            align-items: center;
        }

        .section:nth-child(even) img {
            grid-column: 2;
            grid-row: 1;
        }

        .section.group-1, .section.group-2 {
            overflow: visible;
        }

        .section.group-1 img {
            height: 110%;
            z-index: 2;
            box-shadow: -4px 4px 4px 0px hsla(0, 0%, 0%, 0.25);
        }

        .section.group-2 img {
            height: 125%;
            z-index: 2;
            box-shadow: 4px 4px 4px 0px hsla(0, 0%, 0%, 0.25);            
        }


    }
</style>
