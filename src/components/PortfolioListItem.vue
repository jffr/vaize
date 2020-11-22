<template>
  <a class="portfolio-list-item" href="#" @click.prevent="setPortfolioId">
    <img :src="thumbnail" :alt="title" class="portfolio-list-item__image">
    <span class="portfolio-list-item__title">
      {{ title }} - {{ subtitle }}
    </span>
  </a>
</template>

<script>
import { SET_ACTIVE_PORTFOLIO_ITEM } from '../store/action-types';

export default {
  name: 'PortfolioListItem',
  props: {
    id: Number,
    title: String,
    subtitle: String,
    thumbnail: String,
  },
  methods: {
    setPortfolioId() {
      this.$ga.event('porfolio', 'click', this.title);
      this.$store.dispatch(SET_ACTIVE_PORTFOLIO_ITEM, this.id);
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../assets/styles/variables.scss";

  .portfolio-list-item {
    display: block;
    position: relative;
    text-align: left;
    overflow: hidden;
  }
  .portfolio-list-item__title {
    display: none;
  }
  .portfolio-list-item__image {
    display: block;
    width: 100%;
    transition: transform 0.2s ease-out;
  }
  .portfolio-list-item:hover .portfolio-list-item__image{
    transform: scale(1.05);
  }

  @media (min-width: $screen-md) {
    .portfolio-list-item__title {
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1.0rem;
      text-align: center;
      text-transform: uppercase;
      font-weight: 700;
      color: transparentize(#fff, 0.5);
      background: transparentize($color-background-darker, 0.25);
      z-index: 1;
    }
    .portfolio-list-item--hover > span {
      font-size: 8.0rem;
      padding-bottom: 2.0rem;
    }
    .portfolio-list-item--hover span span {
      font-size: 4.2rem;
    }
  }
</style>
