<template>
  <!-- <div v-if="isLoading">
    <nuxt-loader name="fading-circle" background="black" color="#E40D04" />
  </div> -->
  <!-- v-else -->
  <div class="site relative">
    <BaseHeader></BaseHeader>
    <main>
      <!-- <pre>{{ content }}</pre> -->
      <template v-for="story in stories">
        <component
          :is="story.content.component"
          v-if="story.content.component"
          :key="story.content.uuid"
          :blok="story.content"
        />
      </template>
    </main>
    <BaseFooter></BaseFooter>
  </div>
</template>

<script>
import BaseHeader from '../components/base/BaseHeader.vue';
import HeroSection from '../components/storyblok/HeroSection.vue';

import AdvantagesSection from '../components/storyblok/AdvantagesSection.vue';
// const AdvantagesSection = () =>
//   import('../components/storyblok/AdvantagesSection.vue');
import KartSection from '../components/storyblok/KartSection.vue';
import CtaContactSection from '../components/storyblok/CtaContactSection.vue';
import FaqSection from '../components/storyblok/FaqSection.vue';
// import StepsSection from '../components/storyblok/StepsSection.vue';
import SalesSection from '../components/storyblok/SalesSection.vue';
import QuizSection from '@/components/storyblok/QuizSection.vue';
import BaseLoader from '~/components/base/BaseLoader.vue';
const StepsSection = () => import('../components/storyblok/StepsSection.vue');
const ContactSection = () =>
  import('../components/storyblok/ContactSection.vue');
const BaseFooter = () => import('../components/base/BaseFooter.vue');

export default {
  name: 'IndexPage',
  components: {
    BaseHeader,
    BaseFooter,
    HeroSection,
    QuizSection,
    AdvantagesSection,
    KartSection,
    CtaContactSection,
    FaqSection,
    StepsSection,
    ContactSection,
    SalesSection,
    BaseLoader,
  },

  async asyncData(context) {
    // // This what would we do in real project
    const version =
      context.query._storyblok || context.isDev ? 'draft' : 'published';
    // const fullSlug = (context.route.path == '/' || context.route.path == '') ? 'home' : context.route.path
    // console.log('context.app.$storyapi: ', context.app.$storyapi);
    // Load the JSON from the API - loadig the home content (index page)
    let stories;
    let response;
    // console.log('context.app.$storyapi: ', context.app.$storyapi);
    try {
      // response = await context.app.$storyapi.get('cdn/stor  ies', {
      response = await context.app.$storyapi.get('cdn/stories', {
        version,
        starts_with: 'home/',
      });
      // console.log('response: ', response);
      // const result = await response.json();
      // console.log('result: ', result);
      stories = response.data.stories;
      // console.log('stories: ', stories);
    } catch (error) {
      if (!response.response) {
        console.error(response);
        context.error({
          statusCode: 404,
          message: 'Failed to receive content form api',
        });
      } else {
        console.error(response.response.data);
        context.error({
          statusCode: response.response.status,
          message: response.response.data,
        });
      }
    }
    // console.log('content: ', content)
    return {
      stories,
    };
  },
  data() {
    return {
      // isLoading: true,
    };
  },
  mounted() {
    /* this.$nextTick(() => {
      this.$nuxt.$loading.start();
    }); */
    //* nuxtReady - https://github.com/nuxt/nuxt.js/issues/1154
    // eslint-disable-next-line nuxt/no-env-in-hooks
    /* if (process.browser) {
      window.onNuxtReady((app) => {
        // console.log('Nuxt ready!');
        setTimeout(() => this.$nuxt.$loading.finish(), 100);
      });
    } */
  },
};
</script>

<style lang="scss">
.site {
  display: grid;
  grid-template-rows: auto 1fr auto;
  // ! потом убрать
  // grid-template-rows: auto 1fr 1000px;

  min-height: 100vh;
}

main {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}
</style>
