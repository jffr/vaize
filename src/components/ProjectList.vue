<template>
  <section class="projects" id="projects">
    <TabHeading title="Projects" />
    <div class="container">
      <PaginationList
        type="ProjectListItem"
        :data="(hasSlug) ? related : project"
        :limit="limit"
        className="projects-list"
        :persistent="persistent" />
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { GET_PROJECT } from '@/store/action-types';
import TabHeading from '@/components/TabHeading.vue';
import PaginationList from '@/components/PaginationList.vue';

export default {
  name: 'ProjectList',
  components: { TabHeading, PaginationList },
  mounted() {
    if (!this.hasProjects) {
      this.$store.dispatch(GET_PROJECT);
    }
  },
  props: {
    persistent: {
      type: Boolean,
      required: false,
      default: false,
    },
    limit: {
      type: Number,
      default: 6,
    },
  },
  computed: {
    ...mapState({
      project: state => state.project.project,
    }),
    ...mapGetters(['hasProjects', 'getRelatedProjects']),
    hasSlug() {
      return this.$route.params.slug !== null;
    },
    related() {
      return this.getRelatedProjects(this.$route.params.slug);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../assets/styles/variables.scss";

  .projects {
    margin-top: -$height-heading-xs;
  }
  .projects::v-deep .projects-list {
    padding: 3rem 0 0.5rem 0;
  }

  @media (min-width: $screen-sm) {
    .projects {
      margin-top: -$height-heading-sm;
    }
    .projects::v-deep .projects-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 2rem;
      grid-row-gap: 4rem;
      padding: 6rem 0 3rem 0;
    }
  }
  @media (min-width: $screen-md) {
    .projects {
      margin-top: -$height-heading-md;
    }
  }
</style>
