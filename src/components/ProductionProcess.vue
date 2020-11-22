<template>
  <section class="production-process" id="production-process">
    <TabHeading title="Production Process" />
    <div class="container container--production">
      <div class="production-list">
        <div v-for="(item, index) in production" :key="item.id">
          <div class="production-item">
            <div class="production-item__label">
              <span>Phase {{ index + 1 }}</span>
            </div>
            <div class="production-item__heading">
              <h2 class="production-item__title">{{ item.title }}</h2>
              <img :src="item.image" :alt="item.title" class="production-item__image">
            </div>
            <div class="production-item__description">
              <h3 class="production-item__subtitle">{{ item.subtitle }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="production__nav">
        <div class="production__nav__container">
          <button class="production__nav__button" v-for="item in production" :key="item.id">

          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import 'tiny-slider/dist/tiny-slider.css';
import { tns } from 'tiny-slider/src/tiny-slider';

import { GET_PRODUCTION } from '@/store/action-types';
import TabHeading from '@/components/TabHeading.vue';

export default {
  name: 'ProductionProcess',
  components: {
    TabHeading,
  },
  mounted() {
    if (this.hasProductionItems) {
      this.initializeSlider();
      return;
    }
    this.$store.dispatch(GET_PRODUCTION);
  },
  data() {
    return {
      slider: null,
    };
  },
  computed: {
    ...mapState({
      production: state => state.production.production,
    }),
    ...mapGetters(['hasProductionItems']),
  },
  beforeDestroy() {
    if (this.slider) {
      this.slider.destroy();
    }
  },
  methods: {
    initializeSlider() {
      return tns({
        container: '.production-list',
        items: 1,
        rewind: false,
        center: true,
        loop: false,
        edgePadding: 40,
        controls: false,
        mouseDrag: true,
        navContainer: document.querySelector('.production__nav__container'),
        responsive: {
          580: {
            edgePadding: 150,
          },
          775: {
            center: false,
            edgePadding: 0,
            items: 3,
            loop: false,
          },
        },
      });
    },
  },
  watch: {
    production(next, prev) {
      if (prev.length > 0) {
        this.slider.destroy();
      }
      if (next.length > 0) {
        this.$nextTick(() => {
          this.slider = this.initializeSlider();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../assets/styles/variables.scss";

  .container--production {
    padding: 0;
  }
  .production-process {
    margin-top: -$height-heading-xs;
  }
  .production-list {
    margin: 3rem 0;
    user-select: none;
  }
  @media (min-width: 775px) {
    .production-list {
      user-select: auto;
    }
  }
  .production-item {
    margin: 2rem 0 0 0;
  }
  @media (min-width: 36.25em) {
    .production-item {
      margin: 2rem;
    }
  }
  .production-item {
    position: relative;
  }
  .production-item__label {
    color: #fff;
    background: #000;
    position: absolute;
    top: -1rem;
    left: 6%;
    z-index: 10;
    text-transform: uppercase;
    transform: skew(-11deg);
    font-size: 1.2rem;
    font-weight: 700;
    padding: 1rem 2rem;
  }
  .production-item__label span {
    display:block;
    transform: skew(11deg);
  }
  .production-item__heading {
    position: relative;
    transform: skew(-11deg);
    margin: 0 2rem 3rem 2rem;
  }
  .production-item__title {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    transform: skew(11deg);
    color: #fff;
    font-size: 2.8rem;
    text-shadow: 0 0 5rem #000;
  }
  @media (min-width: 26.625em) {
    .production-item__title {
      font-size: 3.4rem;
    }
  }
  @media (min-width: 30.25em) {
    .production-item__title {
      font-size: 4.3rem;
    }
    .production-item__label {
      font-size: 1.8rem;
    }
  }
  @media (min-width: 36.3125em) {
    .production-item__title {
      font-size: 3.4rem;
    }
    .production-item__label {
      font-size: 1.2rem;
    }
  }
  @media (min-width: 40.4375em) {
    .production-item__title {
      font-size: 4.3rem;
    }
    .production-item__label {
      font-size: 1.8rem;
    }
  }
  @media (min-width: 48.4375em) {
    .production-list {
      margin: 4.5rem 0;
    }
    .production-item {
      margin: 2rem .5rem 0 .5rem;
    }
    .production-item__title {
      font-size: 3.4rem;
    }
    .production-item__label {
      font-size: 1.2rem;
    }
  }
  @media (min-width: 76.5em) {
    .production-item__title {
      font-size: 4.3rem;
    }
    .production-item__label {
      font-size: 1.8rem;
    }
  }
  .production-item__image {
    display: block;
    width: 100%;
    height: auto;
  }
  .production-item__subtitle {
    color: #000;
  }
  .production-item__description {
    position: relative;
    color: $color-gray;
    height: 100%;
    padding-left: 5rem;
    padding-right: 3rem;
    &:before {
      display: block;
      position: absolute;
      left: 2.0rem;
      top: 1.2rem;
      width: 1rem;
      height: 1rem;
      content: "";
      font-size: 0;
      border-radius: 1rem;
      background: $color-gray;
    }
    &:after {
      display:block;
      position: absolute;
      top: 1.4rem;
      left: 2.4rem;
      bottom: 0;
      width: 0.2rem;
      content: "";
      border-left: .2rem solid $color-gray;
    }
  }
  @media (min-width: $screen-sm) {
    .production-process {
      margin-top: -$height-heading-sm;
    }
  }
  @media (min-width: $screen-md) {
    .production-process {
      margin-top: -$height-heading-md;
    }
  }
  @media (min-width: 775px) {
    .container--production {
      padding: 0 15px;
    }
  }
  .production__nav {
    text-align: center;
    line-height: 1;
  }
  .production__nav__container {
    display: inline-block;
    height: 10px;
    line-height: 1;
    vertical-align: top;
    overflow: hidden;
    border-radius: 10px;
    background: transparentize(#000, 0.75);
  }
  .production__nav__button {
    width: 20px;
    height: 10px;
    border: none;
    background: transparent;
    margin: 0;
    padding: 0;
    font-size: 1px;
    line-height: 1;
    vertical-align: top;
    cursor: pointer;
    border-radius: 10px;
  }
  .production__nav__button.tns-nav-active {
    background: #000;
  }
</style>
