<template>
  <section class="clients" id="clients">
    <TabHeadingReversed title="Clients" />
    <div class="container">
      <ul class="client-list">
        <li v-for="item in client" :key="item.id" class="client">
          <img :src="item.image" :alt="item.title" class="client__image">
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { GET_CLIENT } from '@/store/action-types';
import TabHeadingReversed from '@/components/TabHeadingReversed.vue';

export default {
  name: 'TheClients',
  components: { TabHeadingReversed },
  mounted() {
    if (!this.hasClients) {
      this.$store.dispatch(GET_CLIENT);
    }
  },
  computed: {
    ...mapState({
      client: state => state.client.client,
    }),
    ...mapGetters(['hasClients']),
  },
};
</script>

<style lang="scss" scoped>
  @import "../assets/styles/variables.scss";

  .clients {
    color: #fff;
    background: $color-background-darker;
  }
  .container {
    max-width: 120rem;
  }
  .client-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 5rem 0 4rem 0;
    text-align: center;
  }
  .client__image {
    width: 100%;
    height: auto;
    max-width: 100%;
  }
  .client {
    flex: 0 0 25%;
    max-width: 24rem;
    padding: 1rem;
    list-style: none;
  }

  @media (min-width: $screen-sm) {
    .client-list {
      padding: 9rem 0 8rem 0;
    }
  }
</style>
