<template>
  <div class="home">
    <TheHeader class="navigable" />
    <PortfolioList class="navigable" />
    <TheServices class="navigable" />
    <ProductionProcess />
    <TheReviews />
    <ProjectList :persistent="true" class="navigable" />
    <TheClients />
    <TheForm class="navigable" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import TheHeader from '@/components/TheHeader.vue';
import TheServices from '@/components/TheServices.vue';
import PortfolioList from '@/components/PortfolioList.vue';
import ProductionProcess from '@/components/ProductionProcess.vue';
import TheReviews from '@/components/TheReviews.vue';
import ProjectList from '@/components/ProjectList.vue';
import TheClients from '@/components/TheClients.vue';
import TheForm from '@/components/TheForm.vue';
import { GET_SERVICE } from '@/store/action-types';

export default {
  name: 'home',
  components: {
    TheHeader,
    PortfolioList,
    TheServices,
    ProductionProcess,
    TheReviews,
    ProjectList,
    TheClients,
    TheForm,
  },
  data() {
    return {
      waypoints: [],
    };
  },
  mounted() {
    if (!this.hasServices) {
      this.$store.dispatch(GET_SERVICE);
    }

    const root = this;
    const elements = document.querySelectorAll('.navigable');
    const links = document.querySelector('.navbar__menu');
    elements.forEach((element) => {
      this.waypoints.push(new Waypoint({
        element,
        offset: 86,
        handler(direction) {
          const navigation = links.querySelector(`[data-id=${element.id}]`);
          const currentIndex = root.waypoints.findIndex(e => e.element.id === element.id);
          links.querySelectorAll('[data-id]').forEach(el => el.classList.remove('router-link-exact-active'));
          if (direction === 'down') {
            navigation.classList.add('router-link-exact-active');
          }
          if (direction === 'up') {
            const previousElement = root.waypoints[currentIndex - 1].element;
            const previousNavigation = links.querySelector(`[data-id=${previousElement.id}`);
            previousNavigation.classList.add('router-link-exact-active');
          }
        },
        enabled: false,
      }));
    });
    setTimeout(() => {
      Waypoint.enableAll();
    }, 1000);
  },
  beforeDestroy() {
    this.waypoints.forEach(el => el.destroy());
  },
  computed: {
    ...mapState({
      service: state => state.service.service,
    }),
    ...mapGetters(['hasServices']),
  },
  head: {
    meta() {
      return [
        {
          name: 'description',
          content: this.service.description,
        },
      ];
    },
  },
};
</script>
