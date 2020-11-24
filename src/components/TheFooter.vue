<template>
  <div class="footer">
    <div class="container">
      <img class="footer__logo" :alt="this.$store.state.title" src="../assets/gfx/logo.svg">
      <ul class="social">
        <li>
          <span class="social__item">
            <img alt="Behance" src="../assets/gfx/social/icon_bh.png">
          </span>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/maikel-kerkhoven-9a2270101/" class="social__item" target="_blank">
            <img alt="LinkedIN" src="../assets/gfx/social/icon_li.png">
          </a>
        </li>
        <li>
          <span class="social__item">
            <img alt="ArtStation" src="../assets/gfx/social/icon_as.png">
          </span>
        </li>
        <li>
          <span class="social__item">
            <img alt="Instagram" src="../assets/gfx/social/icon_isg.png">
          </span>
        </li>
        <li>
          <span class="social__item">
            <img alt="Blogger" src="../assets/gfx/social/icon_bs.png">
          </span>
        </li>
      </ul>
      <p class="copyright">
        &copy; {{ copyrightYear }} - Vaize Studio
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheFooter',
  data() {
    return {
      copyrightYear: new Date().getFullYear(),
    };
  },
};
</script>

<style lang="scss" scoped>
  @import "../assets/styles/variables.scss";

  .footer {
    text-align: center;
    padding: 3.5rem 0 2rem;
    background: $color-background-darker;
    color: $color-gray-lighter;
    font-size: 0.8em;
  }
  img {
    vertical-align: bottom;
  }
  .footer__logo {
    height: 6.5rem;
    opacity: 0.5;
  }
  .social {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .social__item {
    display: inline-block;
    margin: 0 1rem;
    opacity: 0.25;
    transition: opacity 0.5s linear;
  }
  .social__item:hover {
    opacity: 1;
  }
  .menu {
    display: inline-flex;
    margin-top: 1rem;
  }
  .menu__item:first-child:before {
    display: none;
  }
  .menu__item:before {
    content: "|";
    margin: 0 0.8rem;
  }
  .copyright {
    margin-top: 1.5rem;
  }
</style>
