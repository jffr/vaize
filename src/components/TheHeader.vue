<template>
  <section class="header vh-fix" id="home">
    <div class="header__content">
      <img src="../assets/gfx/header-logo.png" alt="Vaize Studio">
      <p class="tagline">For all your art and design content</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TheHeader',
};
</script>

<style scoped lang="scss">
  @import '../assets/styles/variables.scss';

  .header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - #{$height-navigation - $height-heading-xs});
    background: url('/images/header/video-banner.jpg') fixed 50% 35% / cover;
  }
  .header__content {
    padding: 3.0rem;
  }
  .header__content img {
    display: block;
    max-width: 100%;
    max-height: 27.8rem;
    margin-top: -6.0rem;
  }
  .tagline {
    text-shadow: 0 0 1rem #000;
    font-size: 1.4rem;
    text-transform: uppercase;
    color: #fff;
    text-align: center;
    font-family: $font-family-special;
  }

  @media (min-width: 23.75em) {
    .tagline {
      font-size: 1.8rem;
    }
  }
  @media (min-width: 31.25em) {
    .tagline {
      font-size: 2.4rem;
    }
  }
  @media (min-width: $screen-sm) {
    .tagline {
      font-size: 2.8rem;
    }
  }

  @media (min-width: $screen-sm) {
    .header {
      min-height: calc(100vh - #{$height-navigation - $height-heading-sm});
    }
  }
  @media (min-width: $screen-md) {
    .header {
      min-height: calc(100vh - #{$height-navigation - $height-heading-md});
    }
  }
</style>
