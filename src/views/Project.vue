<template>
  <div class="about">
    <ProjectDetail :slug="$route.params.slug" v-if="this.hasProjects" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_PROJECT } from '@/store/action-types';
import ProjectDetail from '@/components/ProjectDetail.vue';

export default {
  name: 'project',
  components: { ProjectDetail },
  mounted() {
    document.querySelectorAll('[data-id]').forEach(el => el.classList.remove('router-link-exact-active'));

    if (!this.hasProjects) {
      this.$store.dispatch(GET_PROJECT);
    }
  },
  computed: {
    item() {
      return this.getProjectBySlug(this.$route.params.slug);
    },
    ...mapGetters(['hasProjects', 'getProjectBySlug']),
  },
  watch: {
    item() {
      this.$emit('updateHead');
    },
  },
  head: {
    title() {
      if (!this.hasProjects) return {};
      return {
        inner: this.item.title,
      };
    },
    meta() {
      if (!this.hasProjects) return [];
      return [
        {
          name: 'description',
          content: this.item.introduction,
        },
      ];
    },
  },
};
</script>
