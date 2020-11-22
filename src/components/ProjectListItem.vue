<template>
  <div class="project-item">
    <a :href="url" class="project-item__image" @click.prevent="click">
      <img :src="thumbnail" :alt="title">
    </a>
    <h2 class="h3">
      <a :href="url" class="project-item__title" @click.prevent="click">
        {{ title }}
      </a>
    </h2>
    <p class="project-item__description">
      {{ introduction }}
    </p>
    <a :href="url" class="project-item__link" @click.prevent="click">
      Read More
    </a>
  </div>
</template>

<script>
export default {
  name: 'ProjectListItem',
  props: {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    introduction: { type: String, required: true },
    slug: { type: String, required: false },
  },
  methods: {
    click() {
      if (this.$route.name === 'projects') this.$emit('reset');
      this.$router.push(this.url);
    },
  },
  computed: {
    url() {
      if (!this.slug) return null;
      return `/projects/${this.slug}`;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../assets/styles/variables.scss";

  .project-item {
    color: $color-gray;
    text-align: left;
    margin-bottom: 2.5rem;
    overflow: hidden;
  }
  .project-item__title {
    color: $color-text;
    text-decoration: none;
  }
  .project-item__image {
    display: block;
    margin-bottom: 1.4rem;
    overflow: hidden;
  }
  .project-item__image img {
    display: block;
    width: 100%;
    height: auto;
  }
  .project-item__image img {
    transition: transform 0.2s ease-out;
  }
  .project-item__image:hover img {
    transform: scale(1.05);
  }
  .project-item__link {
    display: inline-block;
    font-size: 0.8em;
    text-transform: uppercase;
    font-weight: 700;
  }

  @media (min-width: $screen-sm) {
    .project-item {
      margin-bottom: 0;
    }
    .project-item__description {
      display: inline;
    }
  }
  .project-item__image:hover .project-item__image--hover {
    opacity: 1;
  }
</style>
