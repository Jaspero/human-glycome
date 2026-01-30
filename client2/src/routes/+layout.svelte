<script lang="ts">
  import '../lib/scss/global.scss';
  import {page} from '$app/stores';

  let sideMenu = false;

  const navItems = [
    {label: 'Home', href: '/', exact: true},
    {label: 'About us', href: '/about'},
    {label: 'Projects', href: '/projects'},
    {label: 'Resources', href: '/resources'},
    {label: 'Glyco-databases', href: '/glyco-databases'},
    {label: 'Education', href: '/education'},
    {label: 'Members', href: '/members'}
  ];

  const legalItems = [{label: 'Privacy Policy', href: '/privacy-policy'}];

  function toggleMenu() {
    sideMenu = !sideMenu;
  }

  function closeMenu() {
    sideMenu = false;
  }
</script>

<svelte:window on:click={() => (sideMenu = false)} />

<main>
  <slot />
</main>

<aside class="c-dt-primary">
  <div class="flex fd-col jc-between w-full h-full">
    <button
      class="sidebar-button"
      aria-label="Toggle menu"
      on:click|stopPropagation={toggleMenu}
    >
      {#if sideMenu}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="rgba(255,255,255,.9)"
        >
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          />
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="rgba(255,255,255,.9)"
        >
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      {/if}
    </button>
    <div>
      <a
        class="sidebar-button"
        aria-label="Twitter"
        href="https://twitter.com/GlycomeHuman"
        target="_blank"
        rel="noopener"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 15"
          width="18"
          height="15"
        >
          <path
            d="M17.999 1.775a7.23 7.23 0 0 1-2.12.6 3.788 3.788 0 0 0 1.62-2.098 7.331 7.331 0 0 1-2.346.92 3.639 3.639 0 0 0-2.7-1.2 3.741 3.741 0 0 0-3.684 3.79 3.893 3.893 0 0 0 .1.863A10.4 10.4 0 0 1 1.259.692a3.858 3.858 0 0 0 1.14 5.057 3.622 3.622 0 0 1-1.673-.475v.047a3.769 3.769 0 0 0 2.962 3.715 3.652 3.652 0 0 1-.973.133 3.458 3.458 0 0 1-.7-.07 3.708 3.708 0 0 0 3.451 2.63 7.29 7.29 0 0 1-4.585 1.619 7.648 7.648 0 0 1-.882-.052 10.247 10.247 0 0 0 5.66 1.7c6.793 0 10.506-5.772 10.506-10.778l-.012-.49a7.482 7.482 0 0 0 1.846-1.953z"
            fill="rgba(255,255,255,.9)"
          />
        </svg>
      </a>
    </div>
  </div>
</aside>

<nav
  class="c-dt-primary ff-secondary"
  class:active={sideMenu}
  on:click|stopPropagation
>
  <div>
    {#each navItems as item}
      <a
        href={item.href}
        class:active={$page.url.pathname === item.href}
        on:click={closeMenu}
      >
        {item.label}
      </a>
    {/each}
    <hr />
    {#each legalItems as item}
      <a
        href={item.href}
        class:active={$page.url.pathname === item.href}
        on:click={closeMenu}
      >
        {item.label}
      </a>
    {/each}
  </div>
  <a
    class="jaspero-link"
    href="https://jaspero.co/"
    target="_blank"
    rel="noopener"
  >
    by Jaspero
  </a>
</nav>

<style lang="scss">
  @import '../lib/scss/_variables.scss';

  aside {
    position: fixed;
    z-index: 2;
    top: 0;
    right: 0;
    width: 40px;
    height: 100vh;
    background: linear-gradient(to bottom, #223d6d, #112138);
    overflow: auto;

    @media (max-width: 1200px) {
      padding: 0 0 60px 0;
      overflow: hidden;
    }
  }

  main {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - 40px);
    height: 100%;
    overflow: auto;

    @media (max-width: 1200px) {
      position: static;
      height: auto;
      overflow: unset;
    }
  }

  .sidebar-button {
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    width: 100%;
    height: 40px;
    margin: 0;
    padding: 0;
    background: transparent;
    color: inherit;
    transition: 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }

  nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    z-index: 1;
    right: 0;
    bottom: 0;
    width: 320px;
    height: 100%;
    padding: 40px 0 80px;
    overflow-y: auto;
    background: linear-gradient(to bottom, #223d6d, #112138);
    transform: translateX(100%);
    transition: 0.2s;
    box-shadow: -1px 0 5px 0 rgba(0, 0, 0, 0.5);

    @media (max-width: 600px) {
      width: 100%;
    }

    &.active {
      transform: translateX(0);
    }

    & a {
      display: block;
      width: 100%;
      padding: 20px;
      color: white;
      text-decoration: none;
      transition: 0.2s;

      &:hover,
      &:active {
        background: rgba(255, 255, 255, 0.1);
      }

      &.active {
        background: rgba(255, 255, 255, 0.2);
      }

      &.jaspero-link {
        opacity: 0.5;

        &:hover {
          opacity: 1;
        }
      }
    }
  }
</style>
