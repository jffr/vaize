<template>
  <section id="portfolio" class="portfolio">
    <div class="portfolio-bar">
      <TabHeading title="Portfolio" />
      <ul class="filter">
        <li v-for="category in categories" :key="category.id">
          <a
            href="#"
            class="filter__item"
            :class="{ 'filter__item--active': activeCategory === category.id }"
            @click.prevent="setCategory(category.id)"
          >
            {{ category.title }}
          </a>
        </li>
        <li>
          <a
            href="#"
            class="filter__item"
            :class="{ 'filter__item--active': activeCategory === null }"
            @click.prevent="setCategory(null)"
          >
            All
          </a>
        </li>
      </ul>
    </div>
    <div class="container">
      <div v-if="items.length === 0" class="message">
        Er zijn geen portfolio items beschikbaar.
      </div>
      <PortfolioDetail />
      <PaginationList
        type="PortfolioListItem"
        :data="items"
        className="portfolio-list"
        :limit="15" />
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { GET_PORTFOLIO_ITEMS } from '@/store/action-types';
import TabHeading from '@/components/TabHeading.vue';
import PaginationList from '@/components/PaginationList.vue';
import PortfolioDetail from './PortfolioDetail.vue';

export default {
  name: 'PortfolioList',
  components: { TabHeading, PaginationList, PortfolioDetail },
  mounted() {
    if (!this.hasPortfolioItems) {
      this.$store.dispatch(GET_PORTFOLIO_ITEMS);
    }
  },
  data() {
    return {
      activePortfolio: null,
      activeCategory: null,
      showFilter: true,
    };
  },
  computed: {
    ...mapState({
      categories: state => state.portfolio.categories,
    }),
    ...mapGetters(['getPortfolioByCategoryId', 'hasPortfolioItems']),
    items() {
      return this.getPortfolioByCategoryId(this.activeCategory);
    },
  },
  methods: {
    setCategory(id) {
      this.activeCategory = id;
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../assets/styles/variables.scss";

  .portfolio::v-deep .portfolio-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 1.0rem;
    grid-row-gap: 1.0rem;
    margin: 3.0rem 0 1.5rem 0;
  }
  .portfolio-bar {
    display: flex;
    align-items: flex-end;
  }
  .portfolio {
    position: relative;
    margin-top: -$height-heading-xs;
  }
  .filter {
    display: none;
  }

  @media (min-width: $screen-xs) {
    .portfolio::v-deep .portfolio-list {
      grid-column-gap: 2.0rem;
      grid-row-gap: 2.0rem;
    }
  }
  @media (min-width: $screen-sm) {
    .portfolio {
      margin-top: -$height-heading-sm;
    }
    .filter {
      font-family: $font-family-special;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background: $color-background-darker;
      font-size: 0.8em;
      height: 2.8rem;
      text-transform: uppercase;
      padding: 0.3rem 1.0rem;
      position: relative;
      &:after {
        position: absolute;
        right: -1.0rem;
        bottom: 0;
        content: "";
        border-left: 1.0rem solid $color-background-darker;
        border-top: 2.8rem solid transparent;
        height: 0;
      }
    }
    .filter__item {
      display: inline-block;
      margin: 0 1.5rem;
      text-decoration: none;
      color: transparentize(#fff, 0.5);
      transition: color 0.5s ease;
    }
    .filter__item:hover,
    .filter__item--active {
      color: transparentize(#fff, 0);
    }
  }
  @media (min-width: $screen-md) {
    .portfolio::v-deep .portfolio-list {
      margin: 6.0rem 0 3.0rem 0;
    }
    .filter {
      font-size: 1em;
      height: 3.4rem;
      &:after {
        border-top: 3.4rem solid transparent;
      }
    }
    .portfolio {
      margin-top: -$height-heading-md;
    }
  }
</style>
