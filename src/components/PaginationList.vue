<template>
  <div class="pagination">
    <transition-group v-if="component"
                      tag="div"
                      :class="className"
                      name="slide"
                      class="pagination__items"
                      @before-leave="beforeLeave">
      <div v-for="item in list" :key="item.id" class="pagination-item">
        <component :is="component" v-bind="item" @reset="reset" />
      </div>
    </transition-group>
    <TheButton class="pagination__button" @click="increment" v-if="page !== totalPages">
      Load More
    </TheButton>
  </div>
</template>

<script>
import TheButton from '@/components/TheButton.vue';
import { PAGINATION_INCREMENT, PAGINATION_PAGE_REGISTER, PAGINATION_PAGE_RESET } from '../store/action-types';

export default {
  name: 'PaginationList',
  components: { TheButton },
  props: {
    type: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    limit: {
      type: Number,
      required: false,
      default: 3,
    },
    className: {
      type: String,
      required: false,
    },
    persistent: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  mounted() {
    this.id = `${this.$route.name.toUpperCase()}_${this.type}`;
    // eslint-disable-next-line prefer-template
    this.component = () => import('@/components/' + this.type);
    this.$store.dispatch(PAGINATION_PAGE_REGISTER, this.id);
  },
  data() {
    return {
      component: null,
      id: null,
    };
  },
  methods: {
    increment() {
      this.$store.dispatch(PAGINATION_INCREMENT, this.id);
    },
    beforeLeave(el) {
      // eslint-disable-next-line no-param-reassign
      el.style.width = `${el.offsetWidth}px`;
      // eslint-disable-next-line no-param-reassign
      el.style.height = `${el.offsetHeight}px`;
      // eslint-disable-next-line no-param-reassign
      el.style.left = `${el.offsetLeft}px`;
      // eslint-disable-next-line no-param-reassign
      el.style.top = `${el.offsetTop}px`;
    },
    reset() {
      if (!this.persistent) {
        this.$store.dispatch(PAGINATION_PAGE_RESET, this.id);
      }
    },
  },
  computed: {
    pagination() {
      return this.$store.state.pagination.pages;
    },
    page() {
      return this.$store.state.pagination.pages[this.id];
    },
    list() {
      const end = this.page * this.limit;
      return this.data.slice(0, end);
    },
    totalPages() {
      return Math.ceil(this.data.length / this.limit);
    },
  },
  watch: {
    data(next, previous) {
      if (previous.length > 0 && next.length !== previous.length) {
        this.$store.dispatch(PAGINATION_PAGE_RESET, this.id);
      }
    },
  },
  beforeDestroy() {
    this.reset();
  },
};
</script>

<style lang="scss">
  .pagination {
    text-align: center;
  }
  .pagination__items {
    position: relative;
  }
  .pagination-item {
    z-index: 1;
  }
  .pagination__button {
    margin-bottom: 3rem;
  }
  /*
  .slide-enter,
  .slide-leave-to {
    opacity: 0;
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: opacity 1s ease-out;
  }
  .slide-leave-active {
    position: absolute;
  }
  .slide-move {
    transition: opacity 1s ease-out;
  }
  */
</style>
