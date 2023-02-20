<script>
    export let onClick = () => {};
    export let content = "CLICK ME";
    export let loading = false;
</script>

<button on:click={onClick} disabled={loading}>{content}</button>

<style>
    button {
        font: inherit;
        border: none;
        background-color: var(--pink);
        padding: 15px 25px 0;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.2s ease 0s;
        color: var(--cream);
        font-size: 40px;
        font-weight: 700;
    }
    button:hover {
        background-color: var(--red);
        box-shadow: 4px 4px 4px 0px hsla(0, 0%, 0%, 0.25);
    }
    button:disabled {
        pointer-events: none;
        background-color: gray;
    }
</style>
