<template>
  <!-- <div v-if="$nuxt.$root.$loading.percent !== 0">
    <nuxt-loader name="fading-circle" background="black" color="#E40D04" />
  </div> -->
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
import HeroSection from '~/components/storyblok/HeroSection.vue';
const AdvantagesSection = () =>
  import('../components/storyblok/AdvantagesSection.vue');
const KartSection = () => import('../components/storyblok/KartSection.vue');
const CtaContactSection = () =>
  import('../components/storyblok/CtaContactSection.vue');
const FaqSection = () => import('../components/storyblok/FaqSection.vue');
const StepsSection = () => import('../components/storyblok/StepsSection.vue');
const SalesSection = () => import('../components/storyblok/SalesSection.vue');
const ContactSection = () =>
  import('../components/storyblok/ContactSection.vue');
const BaseFooter = () => import('../components/base/BaseFooter.vue');

export default {
  name: 'IndexPage',
  components: {
    BaseHeader,
    BaseFooter,
    HeroSection,
    AdvantagesSection,
    KartSection,
    CtaContactSection,
    FaqSection,
    StepsSection,
    ContactSection,
    SalesSection,
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
      isLoading: true,
    };
  },
  mounted() {
    // console.log('loading', window.$nuxt.$root.$loading.percent);
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    });
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
