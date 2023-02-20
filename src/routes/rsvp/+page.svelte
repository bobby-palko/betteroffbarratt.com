<script>
// @ts-nocheck

    import { applyAction, enhance } from '$app/forms';

	import Button from '$lib/Button.svelte';
	import Modal from '$lib/Modal.svelte';

    /** @type {import('./$types').ActionData} */
    export let form;

    let content = 'Search';
    let name = '';
    let loading = false;
    let onClick = () => {
        console.log('yay clocked');
        loading = true;
        content = 'Searching';
    };

    let modalClose = () => {
        loading = false;
        content = 'Search';
        if (form) {
            form.success = false;
        }
    };

    let guests = [];
    let group = {};

</script>

{#if form?.success && form.type === 'search'}
    <Modal {guests} {group} closeAction={modalClose}/>
{:else if form?.success && form?.type ==='rsvp'}
    <Modal closeAction={modalClose} success={true}/>
{:else}
<div class="rsvp">
    <form method="POST" action="?/find" use:enhance={() => {
        return async ({ result }) => {
            console.log(result);
            
            if (result.type === 'failure') {
                loading = false;
                content = 'Search';
            } else if (result.type === 'success') {
                 guests = result.data?.guests;
                 group = result.data?.group;
                 // make sure we greet the person who entered their name
                 if (guests.length) {
                    const firstName = name.split(' ')[0];
                    const index = guests.findIndex((/** @type {{ name: string; }} */ element) => element.name.toLowerCase() === firstName.toLowerCase());
                    if (index !== -1) {
                        const person = guests.splice(index, 1)[0];
                        guests.unshift(person);
                    }
                 }
            }

            await applyAction(result);
        }
    }}>
        {#if form?.error}
            <p class="error">{form.error}</p>
        {/if}
        <div class="name-input">
            <input type="text" name="name" id="name" bind:value={name} placeholder=" " required/>
            <label for="name">Enter your full name</label>
        </div>
        <Button {content} {loading} {onClick}/>
    </form>
</div>
{/if}
<style>
    .rsvp {
        background-image: url('/rsvp.jpg');
        background-size: cover;
        --field-padding: 12px;
    }

    form {
        margin-top: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
    }

    .name-input {
        position: relative;
    }

    .name-input input {
        border: none;
        -webkit-appearance: none;
        -ms-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: var(--cream);
        padding: var(--field-padding);
        font-size: 1.6rem;
        width: 100%;
        border-radius: 3px;
        box-shadow: 4px 4px 4px 0 hsla(0, 0%, 0%, 0.25);
    }

    .name-input label {
        position: absolute;
        left: var(--field-padding);
        top: 50%;
        transform: translateY(-50%);
        width: calc(100% - (var(--field-padding) * 2));
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: black;
        pointer-events: none;
    }

    .name-input input:focus {
        outline: none;
    }

    .name-input input:not(:placeholder-shown) + label,
    .name-input input:focus + label {
        display: none;
    }

    .error {
        background-color: var(--red);
        color: var(--cream);
        padding: 8px;
        border-radius: 3px;
    }
</style>
