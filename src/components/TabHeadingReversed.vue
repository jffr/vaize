<template>
  <h2 class="tab-heading-reversed">
    <span>{{ title }}</span>
  </h2>
</template>

<script>
export default {
  name: 'TabHeadingReversed',
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

  .tab-heading-reversed {
    display: inline-flex;
    justify-content: flex-end;
    align-items: flex-end;
    font-size: $font-size-heading-xs;
    height: $height-heading-xs;
    width: 100%;
    color: #fff;
    background: transparent;
    text-align: right;
    vertical-align: top;

    span {
      position: relative;
      padding: 0 $padding-heading-xs 0 $padding-heading-xs + 1.1rem;
      &:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: -1000rem;
        width: 1000rem;
        height: $height-heading-xs;
        background: #fff;
      }
      &:after {
        content: "";
        position: absolute;
        left: 0;
        height: 0;
        width: 0;
        top: -0.7rem;
        border-right: 1.1rem solid transparent;
        border-top: $height-heading-xs solid #fff;
      }
    }
  }

  @media (min-width: $screen-sm) {
    .tab-heading-reversed {
      font-size: $font-size-heading-sm;
      height: $height-heading-sm;
      span {
        padding: 0 $padding-heading-sm 0 $padding-heading-sm + 1.1rem;
        &:before {
          height: $height-heading-sm;
        }
        &:after {
          top: -.7rem;
          border-top-width: $height-heading-sm;
        }
      }
    }
  }
  @media (min-width: $screen-md) {
    .tab-heading-reversed {
      font-size: $font-size-heading-md;
      height: $height-heading-md;
      span {
        padding: 0 $padding-heading-md 0 $padding-heading-md + 1.1rem;
        &:before {
          height: $height-heading-md;
        }
        &:after {
          top: -1.1rem;
          border-top-width: $height-heading-md;
        }
      }
    }
  }
</style>
