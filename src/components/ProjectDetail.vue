<template>
  <div v-if="item" class="project">
    <div :style="{ 'background-color': item.detail.backgroundColor }">
      <picture :alt="item.title">
        <source
          v-if="item.detail.headerSmall"
          :srcset="item.detail.headerSmall"
          media="(min-width: 100em)">
        <img :src="item.detail.header" class="project__header" />
      </picture>
      <div class="container">
        <div class="content" :class="classProjectDetail">
          <div class="content__text" :class="{ 'content__text--reversed': item.detail.colorWhite }">
            <h1 class="h3 content__text_title">
              {{ item.detail.title }}
            </h1>
            <p class="content__text__intro" v-if="item.detail.introduction">
              {{ item.detail.introduction }}
            </p>
            <span v-if="item.detail.description" v-html="item.detail.description"></span>
          </div>
          <div class="content__image" v-if="item.detail.image">
            <img
                :src="item.detail.image.url"
                :alt="item.detail.title"
                :style="{ 'max-width': item.detail.image.maxWidth }" />
          </div>
        </div>
      </div>
      <div
        v-for="(block, index) in item.detail.blocks"
        :key="index"
        :style="{ 'background-color': block.backgroundColor }">
        <div v-if="block.title || block.description" class="container">
          <div class="content">
            <div class="content__text" :class="{ 'content__text--reversed': block.colorWhite }">
              <h3>{{ block.title }}</h3>
              <span v-html="block.description"></span>
            </div>
          </div>
        </div>
        <div :class="{ 'block--fit': block.fit, 'container': block.fit === false }">
            <span v-for="(image, index) in block.images"
                 :key="index"
                 :class="{ 'block--disable-stretch': image.stretch === false }">
              <img class="block__image"
                   :class="{ 'block__image--disable-stretch': image.stretch === false }"
                   :src="image.url">
            </span>
        </div>
      </div>
    </div>
    <div class="copyright" v-if="item.detail.company" :style="{ color: item.detail.companyColor }">
      &copy; {{ new Date().getFullYear() }}, {{ item.detail.company }}, All rights reserved
    </div>
    <ProjectList :limit="4" class="project__list" />
    <TheForm />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProjectList from '@/components/ProjectList.vue';
import TheForm from '@/components/TheForm.vue';

export default {
  name: 'ProjectDetail',
  components: { ProjectList, TheForm },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  mounted() {
    if (!this.item) {
      this.$router.push('/');
    }
  },
  computed: {
    ...mapGetters(['getProjectBySlug']),
    item() {
      return this.getProjectBySlug(this.slug);
    },
    classProjectDetail() {
      if (!this.item.detail.image) return null;
      return {
        'content--top': this.item.detail.image.position === 'top',
        'content--left': this.item.detail.image.position === 'left',
        'content--right': this.item.detail.image.position === 'right',
        'content--bottom': this.item.detail.image.position === 'bottom',
      };
    },
  },
};
</script>

<style scoped lang="scss">
  @import '../assets/styles/variables.scss';

  .copyright {
    color: #fff;
    font-size: 0.5rem;
    width: 100%;
    height: 40px;
    margin-top: -40px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 1;
  }
  @media (min-width: $screen-sm) {
    .copyright {
      font-size: 1rem;
    }
  }
  .project__header {
    display: block;
    width: 100%;
    height: auto;
  }
  .content {
    text-align: center;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }
  .content--top {
    flex-direction: column-reverse;
  }
  .content--top .content__text {
    padding-top: 0;
  }
  .content__image {
    margin: 0 0 3rem 0;
  }
  .content__image img {
    width: 100%;
  }
  .content--top .content__image {
    margin-top: 3rem;
  }
  .content__text {
    max-width: 80rem;
    padding: 1.5rem 0;
    color: $color-gray;
  }
  .content__text p:last-child {
    margin-bottom: 0;
  }
  .content__text--reversed {
    color: #fff;
  }
  .content__text,
  .content__image {
    align-self: center;
  }
  .content__text__title {
    color: $color-text;
  }
  .content__text__intro {
    font-style: italic;
  }
  @media (min-width: $screen-xs) {
    .content__text {
      padding: 3rem;
    }
  }
  @media (min-width: $screen-md) {
    .content--left {
      flex-direction: row-reverse;
    }
    .content--right {
      flex-direction: row;
    }
    .content--bottom {
      flex-direction: column;
    }
    .content__text {
      padding: 8rem;
    }
    .content--left .content__image,
    .content--right .content__image{
      margin: 0;
    }
    .content--top .content__image {
      margin: 8rem 0 3rem 0;
    }
    .content--bottom .content__image {
      margin-bottom: 8rem;
    }
  }

  .block {
    margin: 0 4.5rem 6rem 4.5rem;
  }
  .block__image {
    width: 100%;
    height: auto;
    display: block;
    vertical-align: bottom;
    margin: 0 auto 1.5rem auto;
  }
  .block--fit {
    overflow: hidden;
    margin: 0;
  }
  .block--fit .block__image {
    margin: 0 auto;
    max-width: 160rem;
  }
  .block--disable-stretch {
    display: block;
    max-width: 160rem;
    overflow: auto;
    margin: 0 auto;
  }
  .block--disable-stretch .block__image--disable-stretch {
    width: auto;
    max-width: 100%;
  }
  .block--fit {
    .block--disable-stretch {
      .block__image--disable-stretch {
        margin-top: 0;
      }
    }
  }
  .project__list .button {
    margin-bottom: 4rem;
  }
  @media (min-width: $screen-md) {
    .block__image {
      margin: 0 auto 6rem auto;
    }
  }
  @media screen and (min-width: 100em) {
    .block--fit .block__image {
      margin: 8rem auto;
    }
  }
</style>
