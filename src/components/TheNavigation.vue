<template>
  <div id="nav" class="navigation" :class="{ 'navigation--active': showMenu }">
    <div class="container">
      <nav class="navbar">
        <div class="navbar__logo">
          <router-link
            to="/"
            v-scroll-to="setScrollOptions('#home')"
            class="navbar__logo__link"
            @click.native="onClick">
            <img :alt="this.$store.state.title"
                 src="../assets/gfx/logo.svg"
                 class="navbar__logo__image">
          </router-link>
        </div>
        <ul class="navbar__menu" :class="{ 'navbar__menu--active': showMenu }">
          <li class="navbar__menu__item">
            <router-link
              to="/"
              class="navbar__menu__item__link"
              v-scroll-to="setScrollOptions('#home')"
              data-id="home"
              @click.native="onClick">
              Home
            </router-link>
          </li>
          <li class="navbar__menu__item">
            <router-link
               to="/#portfolio"
               data-id="portfolio"
               class="navbar__menu__item__link"
               v-scroll-to="setScrollOptions('#portfolio')"
               @click.native="onClick">
              Portfolio
            </router-link>
          </li>
          <li class="navbar__menu__item">
            <router-link
              to="/#services"
              data-id="services"
              class="navbar__menu__item__link"
              v-scroll-to="setScrollOptions('#services')"
              @click.native="onClick">
              Services
            </router-link>
          </li>
          <li class="navbar__menu__item">
            <router-link
              to="/#projects"
              data-id="projects"
              class="navbar__menu__item__link"
              v-scroll-to="setScrollOptions('#projects')"
              @click.native="onClick">
              Projects
            </router-link>
          </li>
          <li class="navbar__menu__item">
            <router-link
              to="/#contact"
              data-id="contact"
              class="navbar__menu__item__link navbar__menu__item__link--special"
              v-scroll-to="setScrollOptions('#contact')"
              @click.native="onClick">
              Hire Us
            </router-link>
          </li>
        </ul>
        <div class="navbar__toggle">
          <button @click.prevent="toggleNavigation"
                  class="hamburger hamburger--elastic js-hamburger"
                  :class="{ 'is-active': showMenu }"
                  type="button">
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
const bodyClassName = 'app__content--navbar-is-visible';

export default {
  name: 'TheNavigation',
  data() {
    return {
      showMenu: false,
      links: [],
    };
  },
  mounted() {
    this.links = document.querySelectorAll('[data-id]');
  },
  methods: {
    toggleNavigation() {
      const body = document.getElementsByClassName('app__content')[0];
      this.showMenu = !this.showMenu;
      this.showMenu ? body.classList.add(bodyClassName) : body.classList.remove(bodyClassName);
    },
    closeNavigation() {
      const body = document.getElementsByClassName('app__content')[0];
      body.classList.remove(bodyClassName);
      this.showMenu = false;
    },
    setScrollOptions(id, options = {}) {
      return {
        el: id,
        onDone: this.enableWaypoints,
        onCancel: this.enableWaypoints,
        options,
      };
    },
    onClick(event) {
      this.links.forEach(el => el.classList.remove('router-link-exact-active'));
      event.target.classList.add('router-link-exact-active');
      this.disableWaypoints();
    },
    enableWaypoints() {
      Waypoint.enableAll();
    },
    disableWaypoints() {
      Waypoint.disableAll();
    },
  },
  watch: {
    $route() {
      this.closeNavigation();
    },
  },
};
</script>

<style lang="scss">
  @import "../assets/styles/variables.scss";
  .app__content {
    padding-top: $height-navigation;
    position: relative;
    right: 0;
    transition: right 0.3s linear;
  }
  .app__content--navbar-is-visible {
    right: 40%;
  }

  @media (min-width: $screen-sm) {
    .app__content {
      position: static;
      right: auto;
      transition: none;
    }
    .app__content--navbar-is-visible {
      right: auto;
    }
  }
</style>

<style scoped lang="scss">
  @import "../assets/styles/variables.scss";

  .navigation {
    background: $color-navigation-background;
    height: $height-navigation;
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    z-index: 20;
    transition: right 0.3s linear;
  }
  .navigation--active {
    right: 40%;
  }
  .navbar {
    height: $height-navigation;
    display: flex;
    align-items: center;
    &:before {
      content: "";
      flex: 1;
    }
  }
  .navbar a > * {
    pointer-events: none;
  }
  .navbar__logo__image {
    height: 3.1rem;
  }
  .navbar__menu {
    font-family: $font-family-special;
    display: block;
    position: fixed;
    top: 0;
    right: -40%;
    width: 40%;
    height: 100%;
    padding: $height-navigation 1rem 1rem;
    text-align: center;
    transition: right 0.3s linear;
    background: $color-navigation-background;
  }
  .navbar__menu--active {
    right: 0;
  }
  .navbar__menu__item__link {
    display: block;
    color: transparentize($color-navigation-text, 0.5);
    transition: color 0.3s linear, border-color 0.3s linear;
    text-decoration: none;
    padding: 0.5rem 0;
  }
  .router-link-exact-active {
    color: #fff;
  }
  .navbar__menu__item__link:hover {
    color: transparentize($color-navigation-text, 0);
  }
  .navbar__toggle {
    flex: 1;
    button {
      display: flex;
      margin-left: auto;
      outline: 0;
    }
  }

  @media (min-width: $screen-sm) {
    .navigation {
      transition: none;
    }
    .navigation--active {
      right: auto;
    }
    .navbar {
      &:before {
        content: none;
      }
      &:after {
        content: "";
        flex: 1;
      }
    }
    .navbar__logo {
      flex: 1;
    }
    .navbar__menu {
      position: static;
      transition: none;
      top: auto;
      right: auto;
      width: auto;
      height: auto;
      padding: 1rem;
      background: transparent;
    }
    .navbar__menu__item {
      display: inline-block;
      margin: 0 2.5rem;
    }
    .navbar__menu__item__link--special {
      border: 0.2rem solid rgba(255, 255, 255, 0.5);
      padding: 0.1rem 1.4rem;
      border-radius: 5.0rem;
    }
    .navbar__menu__item__link--special.router-link-exact-active,
    .navbar__menu__item__link--special:hover {
      color: #fff;
      border-color: rgba(255, 255, 255, 1);
    }
    .router-link-exact-active {
      &:not(.navbar__menu__item__link--special):not(.navbar__logo__link) {
        color: #fff;
        position: relative;
        &:after {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0.2rem;
          background: #fff;
          content: "";
        }
      }
    }
    .navbar__toggle {
      display: none;
    }
  }

  @media (min-width: $screen-md) {
    .navbar__menu__item {
      margin: 0 3.5rem;
    }
  }
</style>
