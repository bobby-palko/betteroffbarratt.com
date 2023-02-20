<script>
  import { page } from '$app/stores';

  export let mobile = false;
  const pages = [
    {
      route: "/",
      title: "Home",
    },
    {
      route: "/rsvp",
      title: "RSVP",
    },
    {
      route: "/info",
      title: "Info"
    },
  ];
</script>

<nav class={ mobile ? 'mobile' : 'nav' }>
  {#each pages as item}
    <a href={item.route} class:active={$page.url.pathname === item.route}>{item.title}</a>
  {/each}
</nav>

<style>
  nav {
    font-size: 32px;
    display: flex;
    gap: 16px;
  }

  a {
    text-decoration: none;
  }

  a:visited {
    color: var(--cream);
  }

  .mobile {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  a.active {
    text-decoration: underline;
  }
</style>
