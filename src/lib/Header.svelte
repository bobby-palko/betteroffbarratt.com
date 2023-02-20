<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  import Nav from './Nav.svelte';
  import Hamburger from './Hamburger.svelte';

  export let open = false;
  export let onClick = () => { open = !open; };

  let desktopNav = false;

  /**
	 * @param {{ matches: any; }} event
	 */
  function switchViews(event) {
    if (event.matches) {
      // close the mobile nav
      open = false;
      desktopNav = true;
    } else {
      desktopNav = false;
    }
  }

  onMount(() => {
    const mediaListener = window.matchMedia("(min-width: 767px)");
    switchViews(mediaListener);
    mediaListener.addEventListener('change', switchViews);
  })
</script>

<header>
  <div class="mobile">
    <div class="logo">
      <span>Steph & Pookie</span>
    </div>
    {#if desktopNav} 
      <Nav />
    {:else}
      <Hamburger {open} {onClick}/>
    {/if}
  </div>

  {#if open}
  <div transition:fly={{ y: -200, duration: 400 }}>
    <Nav mobile/>
  </div>
  {/if}
</header>

<style>
    header {
        background-color: var(--green);
        color: var(--cream);
        padding: 16px;
    }

    .mobile {
      height: 123px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .logo {
        font-size: 36px;
    }
</style>
