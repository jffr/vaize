<template>
  <span class="hover-item">
    <span>
      View <span>{{ title }}</span>
    </span>
  </span>
</template>

<script>
export default {
  name: 'HoverItem',
  props: {
    title: { type: String, required: true },
  },
};
</script>

<style lang="scss">
  @import "../assets/styles/variables.scss";

  .hover-item:hover {
    opacity: 1;
  }
  .hover-item {
    opacity: 0;
    transition: opacity 0.2s linear;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-weight: 700;
    color: transparentize(#fff, 0.5);
    background: transparentize($color-background-darker, 0.1);
    text-transform: uppercase;
    text-align: center;
    line-height: 1;
  }
  .hover-item > span {
    font-size: 2.0rem;
    display: block;
  }
  .hover-item span span {
    display: block;
    font-size: 1.2rem;
  }

  @media (min-width: $screen-xs) {
    .hover-item > span {
      font-size: 3.0rem;
    }
    .hover-item span span {
      font-size: 2.2rem;
    }
  }
  @media (min-width: $screen-sm) {
    .hover-item > span {
      font-size: 4.0rem;
    }
    .hover-item span span {
      font-size: 3.2rem;
    }
  }
  @media (min-width: $screen-md) {
    .hover-item > span {
      font-size: 8.0rem;
      padding-bottom: 2.0rem;
    }
    .hover-item span span {
      font-size: 4.2rem;
    }
  }
</style>
