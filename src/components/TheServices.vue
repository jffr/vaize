<template>
  <section class="services" id="services">
    <TabHeadingReversed title="Services" />
    <div class="container">
      <div class="services__content">
        <img
          src="/images/services/create-possibilities.png"
          :alt="service.title"
          class="service__title">
        <hgroup>
          <h2 class="source-only">{{ service.title }}</h2>
          <h3 class="h4">{{ service.subtitle }}</h3>
        </hgroup>
        <p>{{ service.description }}</p>
        <ul class="keywords">
          <li v-for="(service, index) in service.services" :key="index">{{ service }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { GET_SERVICE } from '@/store/action-types';
import TabHeadingReversed from '@/components/TabHeadingReversed.vue';

export default {
  name: 'TheServices',
  components: { TabHeadingReversed },
  mounted() {
    if (!this.hasServices) {
      this.$store.dispatch(GET_SERVICE);
    }
  },
  computed: {
    ...mapState({
      service: state => state.service.service,
    }),
    ...mapGetters(['hasServices']),
  },
};
</script>

<style scoped lang="scss">
  @import '../assets/styles/variables.scss';

  .container {
    max-width: 100rem;
  }
  .services {
    color: #fff;
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-color: #252b2c;
    background-image: url('/images/services/CREATE_POSSIBILITIES.jpg');
    background-size: auto 50%;
  }
  .service__title {
    height: 21.8rem;
    margin-bottom: 5rem;
  }
  .services__content {
    padding: 8.0rem 1rem 10.0rem 1rem;
    text-align: center;
  }
  .services__content h3 {
    margin-bottom: 1.25rem;
  }

  .keywords {
    display: none;
  }
  hgroup, p {
    text-shadow: 0 0 1.5rem #272e2f;
  }

  @media (min-width: $screen-sm) {
    .keywords {
      display: grid;
      margin-top: 5.5rem;
      color: transparentize(#fff, 0.5);
      text-transform: uppercase;
      grid-column-gap: 1.5rem;
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (min-width: $screen-md) {
    .keywords {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
