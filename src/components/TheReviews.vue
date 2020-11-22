<template>
  <section class="reviews" id="reviews">
    <TabHeadingReversed title="Reviews" />
    <div class="container container--no-gap">
      <div class="reviews__list reviews__list--mobile">
        <div v-for="item in review" :key="item.id">
          <div class="reviews__item">
            <h2 class="source-only">{{ item.company }}</h2>
            <img
              :src="item.logo"
              :alt="item.company"
              class="reviews__item__image"
              :class="{ 'reviews__item__image--margin': item.margin }">
            <blockquote>
              <p>&ldquo;{{ item.cite }}&bdquo;</p>
              <footer>
                &mdash; {{ item.author }}
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
      <div class="reviews__list reviews__list--desktop">
        <div class="reviews__item" v-for="item in review" :key="item.id">
          <h2 class="source-only">{{ item.company }}</h2>
          <img
                  :src="item.logo"
                  :alt="item.company"
                  class="reviews__item__image"
                  :class="{ 'reviews__item__image--margin': item.margin }">
          <blockquote>
            <p>&ldquo;{{ item.cite }}&bdquo;</p>
            <footer>
              &mdash; {{ item.author }}
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import 'tiny-slider/dist/tiny-slider.css';
import { tns } from 'tiny-slider/src/tiny-slider';

import { GET_REVIEW } from '@/store/action-types';
import TabHeadingReversed from '@/components/TabHeadingReversed.vue';

export default {
  name: 'TheReviews',
  components: {
    TabHeadingReversed,
  },
  data() {
    return {
      slider: null,
    };
  },
  mounted() {
    if (this.hasReviews) {
      this.initializeSlider();
      return;
    }
    this.$store.dispatch(GET_REVIEW);
  },
  computed: {
    ...mapState({
      review: state => state.review.review,
    }),
    ...mapGetters(['hasReviews']),
  },
  beforeDestroy() {
    if (this.slider) {
      this.slider.destroy();
    }
  },
  methods: {
    initializeSlider() {
      return tns({
        container: '.reviews__list--mobile',
        items: 1,
        rewind: false,
        autoplay: true,
        autoplayButton: false,
        autoplayButtonOutput: false,
        controls: false,
        speed: 800,
        mouseDrag: true,
        navPosition: 'bottom',
      });
    },
  },
  watch: {
    review(next, prev) {
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

<style>
  @media (min-width: 768px) {
    .tns-nav {
      display: none;
    }
  }
</style>

<style lang="scss" scoped>
  @import "../assets/styles/variables.scss";

  .reviews {
    color: $color-gray-lighter;
    background: $color-background-darker;
    padding-bottom: 4rem;
  }
  .container {
    max-width: 100rem;
  }
  .reviews__list {
    user-select: none;
    margin: 4rem 0 0 0;
    text-align: center;
  }
  @media (min-width: 775px) {
    .reviews__list {
      user-select: auto;
    }
  }
  .reviews__item {
    max-width: 30rem;
    margin: 0 auto;
  }
  .reviews__item__image {
    display: inline-block;
    height: 8rem;
    margin-top: 0.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  .reviews__item__image--margin {
    margin-top: 0;
    margin-bottom: 1.5rem + 0.8rem;
  }
  blockquote {
    text-align: left;
    padding: 0 1.5rem;
  }
  blockquote p {
    font-family: $font-family-special;
    font-weight: 700;
  }
  blockquote footer {
    font-style: italic;
  }
  @media (min-width: $screen-sm) {
    .reviews__list {
      margin: 7rem 0;
    }
  }

  .reviews__list--desktop {
    display: none;
  }
  @media (min-width: 768px) {
    .reviews__list--mobile {
      display: none;
    }
    .reviews__list--desktop {
      display: flex;
      .tns-nav {
        display: none;
      }
    }
  }
</style>
