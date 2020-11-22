<template>
  <div id="portfolio-detail" v-if="currentPortfolioItem">
    <div class="portfolio-detail" @click.prevent="closePortfolioItem">
      <a href="#" @click.prevent="unsetPortfolioItem" class="portfolio-detail--close">
        <img src="../assets/gfx/slider-close.svg" alt="Close slider" class="img-responsive">
      </a>
      <div class="portfolio-detail__window">
        <div class="container">
          <div class="portfolio-detail__item">
            <div class="portfolio-detail__item__image">
              <img
                  :src="currentPortfolioItem.image"
                  :alt="currentPortfolioItem.title"
                  class="img-responsive">
            </div>
            <div class="portfolio-detail__item__text">
              <hgroup>
                <h2 class="h3">{{ currentPortfolioItem.title }}</h2>
                <h3 class="h4">{{ currentPortfolioItem.subtitle }}</h3>
              </hgroup>
              <p>{{ currentPortfolioItem.description }}</p>
              <TheButton v-if="currentPortfolioItem.url"
                        @click="$router.push(currentPortfolioItem.url)"
                        color="#a6a6a6"
                        class="portfolio-detail__item__button">
                View project
              </TheButton>
            </div>
            <a href="#"
              @click.prevent="next"
              v-show="hasNextPortfolioItem"
              class="portfolio-detail--next">
              <img src="../assets/gfx/slider-right.svg" alt="Next slide" class="img-responsive">
            </a>
            <a href="#"
              @click.prevent="previous"
              v-show="hasPreviousPortfolioItem"
              class="portfolio-detail--previous">
              <img src="../assets/gfx/slider-left.svg" alt="Previous slide" class="img-responsive">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="portfolio-detail-backdrop"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { SET_ACTIVE_PORTFOLIO_ITEM, SET_PORTFOLIO_ITEM_NEXT, SET_PORTFOLIO_ITEM_PREVIOUS } from '../store/action-types';
import TheButton from './TheButton.vue';

export default {
  name: 'PortfolioDetail',
  components: { TheButton },
  computed: {
    ...mapGetters(['currentPortfolioItem', 'hasPreviousPortfolioItem', 'hasNextPortfolioItem']),
  },
  methods: {
    closePortfolioItem(event) {
      if (event.target.closest('.portfolio-detail__item')) {
        return;
      }
      this.unsetPortfolioItem();
    },
    unsetPortfolioItem() {
      this.$store.dispatch(SET_ACTIVE_PORTFOLIO_ITEM, null);
    },
    next() {
      this.$store.dispatch(SET_PORTFOLIO_ITEM_NEXT);
    },
    previous() {
      this.$store.dispatch(SET_PORTFOLIO_ITEM_PREVIOUS);
    },
    handleKeyEvent(event) {
      const [KEY_ESC, KEY_RIGHT, KEY_LEFT] = [27, 39, 37];
      const mapper = {
        [KEY_ESC]: () => {
          this.unsetPortfolioItem();
        },
        [KEY_RIGHT]: () => {
          if (this.hasNextPortfolioItem) {
            this.next();
          }
        },
        [KEY_LEFT]: () => {
          if (this.hasPreviousPortfolioItem) {
            this.previous();
          }
        },
      };
      if (mapper[event.keyCode]) {
        mapper[event.keyCode]();
      }
    },
  },
  watch: {
    currentPortfolioItem(current, previous) {
      if (current) {
        document.body.classList.add('portfolio-detail-is-active');
        document.addEventListener('keydown', this.handleKeyEvent);
        if (previous !== null) this.$ga.event('porfolio', 'navigating', current.title);
      } else {
        document.body.classList.remove('portfolio-detail-is-active');
        document.removeEventListener('keydown', this.handleKeyEvent);
      }
    },
  },
  beforeDestroy() {
    this.$store.dispatch(SET_ACTIVE_PORTFOLIO_ITEM, null);
    document.body.classList.remove('portfolio-detail-is-active');
  },
};
</script>

<style lang="scss">
  .portfolio-detail-is-active {
    overflow: hidden;
  }
</style>

<style lang="scss" scoped>
  @import '../assets/styles/variables';

  .portfolio-detail {
    position: fixed;
    overflow-x: hidden;
    overflow-y: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 50;
  }
  .portfolio-detail__item__button {
    transition: color 0.3s linear, border-color 0.3s linear;
  }
  .portfolio-detail__item__button:hover {
    border-color: #fff !important;
    color: #fff !important;
  }
  @media (min-width: $screen-md) {
    .portfolio-detail {
      height: 100%;
    }
    .portfolio-detail__window {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6rem 0;
      min-height: 100%;
    }
  }
  .portfolio-detail .container {
    position: relative;
  }
  .portfolio-detail__item {
    max-width: 120rem;
    margin: auto;
    color: $color-gray-lighter;
  }
  .portfolio-detail__item__text {
    margin: 3rem 0;
  }
  @media (min-width: $screen-md) {
    .portfolio-detail__item {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      margin: auto;
    }
    .portfolio-detail__item__image {
      flex: 1 1 0;
    }
    .portfolio-detail__item__text {
      margin: 0 5rem 0 2rem;
      flex: 0 0 34.0rem;
    }
  }
  @media (min-width: $screen-lg) {
    .portfolio-detail__item__text {
      flex: 0 0 45rem;
      margin: 0 0 0 5rem;
    }
  }
  .portfolio-detail__item__text h2 {
    text-transform: uppercase;
    margin: 0;
  }
  .portfolio-detail--close {
    display: inline-block;
    line-height: 1;
    padding: 1.5rem;
    vertical-align: top;
  }
  .portfolio-detail--close img {
    width: 1.5rem;
    height: 1.5rem;
  }
  @media (min-width: $screen-md) {
    .portfolio-detail--close {
      position: fixed;
      right: 3.5rem;
      top: 3.5rem;
      z-index: 10;
      padding: 0;
    }
    .portfolio-detail--close img {
      width: 2rem;
      height: 2rem;
    }
  }
  .portfolio-detail--next,
  .portfolio-detail--previous {
    display: inline-block;
    position: absolute;
    top: -4.4rem;
    padding: 1rem 1.5rem;
  }
  .portfolio-detail--next img,
  .portfolio-detail--previous img {
    width: 2.5rem;
    height: 2.5rem;
  }
  .portfolio-detail--previous {
    right: 4rem;
  }
  .portfolio-detail--next {
    right: 0;
  }
  @media (min-width: $screen-md) {
    .portfolio-detail--next,
    .portfolio-detail--previous {
      position: fixed;
      top: 50%;
      bottom: auto;
      margin-top: -1.5rem;
      padding: 0;
    }
    .portfolio-detail--next img,
    .portfolio-detail--previous img {
      width: 3rem;
      height: 3rem;
    }
    .portfolio-detail--previous {
      left: 3rem;
      right: auto;
    }
    .portfolio-detail--next {
      right: 3rem;
      left: auto;
    }
  }
  .portfolio-detail-backdrop {
    background: transparentize(#000, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
  }
</style>
