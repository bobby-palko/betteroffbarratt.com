<script>
// @ts-nocheck

	import { enhance } from "$app/forms";
    import { goto } from '$app/navigation';
	import Button from "./Button.svelte";

    export let guests = [];
    export let group = {};
    export let closeAction = () => {};

    export let success = false;

    let kids = 0;

    if (guests.length) {
        guests.forEach((guest) => {
            guest.nameID = `guest-${guest.id}`;
        });
    }

    if (group.attending_kids) {
        kids = group.attending_kids;
    }

    let loading = false;
    let content = 'RSVP';
    let onClick = () => {
        if (kids <= group.max_kids) {
            loading = true;
            content = 'Saving';
        }
    }
</script>

<div class="modal">
    <div class="inner">
        <button class="close" on:click={closeAction}>&times;</button>
        <div class="content">
            {#if success}
                <h1>Thanks!</h1>
                <p>Check out some info about the day!</p>
                <Button content='More' onClick={() => { goto('/info'); }}/>
            {:else}
            <h1>Hi {guests[0].name}!</h1>
            <form class="rsvp" method="POST" action="?/rsvp" use:enhance>
                {#each guests as guest}
                    <div class="guest">
                        <label for={guest.id}>{guest.name}</label>
                        <input class="toggle" name={guest.id} type="checkbox" checked={guest.attending}/>
                    </div>
                {/each}
                {#if group.max_kids > 0}
                    <div class="guest">
                        <label for="attending_kids">Kids</label>
                        <input class="number" name="attending_kids" type="number" min="0" max={group.max_kids} bind:value={kids}/>
                    </div>
                {/if}
                <input type="hidden" name="group" value={group.id || 0} />
                <Button {content} {onClick} {loading}/>
            </form>
            {/if}
        </div>
    </div>
</div>

<style>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 99;
        background-color: var(--cream);
    }
    .inner {
        position: relative;
        padding: 20px;
        display: flex;
        flex-direction: column;
    }
    .close {
        font-size: 64px;
        align-self: flex-end;
        border: none;
        background-color: inherit;
    }
    .content {
        align-self: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 40px;
        font-size: 40px;
        font-weight: 700;
    }
    .content h1 {
        font-size: 48px;
    }

    .content p {
        font-size: 36px;
        font-weight: 500;
        text-align: center;
    }

    .rsvp {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .guest {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 24px;
    }

    .toggle {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin: 0;
        width: 85px;
        height: 44px;
        background: var(--pink);
        border-radius: 3em;
        position: relative;
        cursor: pointer;
        -webkit-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
    }

    .toggle:checked {
        background: var(--green);
    }

    .toggle:before {
        position: absolute;
        content: '';
        width: 39px;
        height: 39px;
        border-radius: 50%;
        background: var(--cream);
        -webkit-box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.3);
        box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.3);
        top: 2px;
        left: 2px;
        -webkit-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
    }

    .toggle:checked:before {
        left: calc(100% - 41px);
    }

    .toggle:after {
        position: absolute;
        content: 'no';
        font: initial;
        font-size: 28px;
        color: var(--cream);
        top: 6px;
        left: 46px;
        -webkit-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
    }

    .toggle:checked:after {
        content: 'yes';
        left: 6px;
    }

    .number {
        -webkit-appearance: textfield;
        -moz-appearance: textfield;
        appearance: textfield;
        width: 48px;
        padding: 0;
        margin: 0;
        height: 44px;
        font-size: 24px;
    }
</style>

