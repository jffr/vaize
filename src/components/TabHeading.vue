<template>
  <h2 class="tab-heading">
    <span>{{ title }}</span>
  </h2>
</template>

<script>
export default {
  name: 'TabHeading',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../assets/styles/variables.scss";

  .tab-heading {
    color: #000;
    background: #fff;
    display: inline-flex;
    align-items: flex-end;
    margin-bottom: 0;
    font-size: $font-size-heading-xs;
    height: $height-heading-xs;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      right: -1.1rem;
      width: 0;
      border-right: 1.1rem solid transparent;
      border-bottom: $height-heading-xs solid #fff;
      background-repeat: no-repeat;
      background-size: 100%;
      z-index: 10;
    }
    span {
      display: block;
      line-height: 1;
      padding: 0 $padding-heading-xs;
    }
  }
  @media (min-width: $screen-sm) {
    .tab-heading {
      font-size: $font-size-heading-sm;
      height: $height-heading-sm;
      span {
        padding: 0 $padding-heading-sm;
      }
      &:after {
        border-bottom-width: $height-heading-sm;
      }
    }
  }
  @media (min-width: $screen-md) {
    .tab-heading {
      font-size: $font-size-heading-md;
      height: $height-heading-md;
      span {
        padding: 0 $padding-heading-md;
      }
      &:after {
        border-bottom-width: $height-heading-md;
      }
    }
  }
</style>
