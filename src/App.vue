<template>
  <div id="app">
    <Navigation />
    <notifications group="foo" position="bottom right" width="100%" />
    <div class="app__content" id="app__content">
      <router-view/>
      <TheFooter />
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/TheNavigation.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  name: 'App',
  components: { Navigation, TheFooter },
};
</script>

<style lang="scss">
  @import "./assets/styles/import.scss";
</style>
