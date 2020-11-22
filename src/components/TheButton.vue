<template>
  <a href="#"
     @click.prevent="$emit('click')"
     class="button"
     :style="styleObject">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'TheButton',
  props: {
    color: {
      type: String,
      required: false,
    },
  },
  computed: {
    styleObject() {
      if (this.color === null) return null;
      return {
        color: this.color,
        'border-color': this.color,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../assets/styles/variables.scss";

  .button {
    display: inline-block;
    font-family: $font-family-special;
    border: 0.2rem solid $color-gray;
    text-decoration: none;
    color: $color-gray;
    line-height: 1;
    border-radius: 2rem;
    padding: 0.7rem 2rem;
    font-size: 1.2em;
    margin-top: 0.8rem;
  }
</style>
