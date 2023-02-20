<script>
  import Header from '$lib/Header.svelte';

  let year = new Date().getFullYear();
</script>

<svelte:head>
  <title>Steph & Pookie</title>
</svelte:head>

<div class="wrapper">
  <Header />
  <slot />
  <footer>Made with lots of ☕️ by Bobby Palko © {year}</footer>
</div>

<style>
  @font-face {
    font-family: 'Ravensara Serif';
    font-style: normal;
    font-weight: 500;
    src: url('/fonts/RavensaraSerif-Regular.ttf');
  }
  @font-face {
    font-family: 'Ravensara Serif';
    font-style: normal;
    font-weight: 700;
    src: url('/fonts/RavensaraSerifSemiBold.ttf');
  }
  @font-face {
    font-family: 'Avalon';
    font-style: normal;
    font-weight: 700;
    src: url('/fonts/Avalon-Chaligraphy.ttf');
  }
  
  :global(:root) {
    font-family: 'Ravensara Serif', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-weight: 500;
    --green: hsla(51, 93%, 11%, 1);
    --cream: hsla(32, 94%, 93%, 1);
    --pink: hsla(11, 28%, 51%, 1);
    --red: hsla(11, 63%, 29%, 1);
  }
  :global(*) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .wrapper {
    display: grid;
    min-height: 100vh;
    grid-template-rows: auto 1fr auto;
  }

  footer{
    text-align: center;
    background-color: var(--cream);
  }
</style>
