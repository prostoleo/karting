<template>
  <div class="site relative">
    <BaseHeader></BaseHeader>
    <main>
      <template v-for="story in stories">
        <component
          :is="story.content.component"
          v-if="story.content.component"
          :key="story.content.uuid"
          :blok="story.content"
        />
        <!-- :karts="isPassKarts(story)" -->
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
// import QuizSection from '@/components/storyblok/QuizSection.vue';
import BaseLoader from '~/components/base/BaseLoader.vue';
const QuizSection = () => import('../components/storyblok/QuizSection.vue');
const StepsSection = () => import('../components/storyblok/StepsSection.vue');
const ContactSection = () =>
  import('../components/storyblok/ContactSection.vue');
const BaseFooter = () => import('../components/base/BaseFooter.vue');

// eslint-disable-next-line no-unused-vars
const customIconConfig = {
  customIconPacks: {
    ionicons: {
      sizes: {
        default: 'is-size-5',
        'is-small': '',
        'is-medium': 'is-size-3',
        'is-large': 'is-size-1',
      },
      iconPrefix: 'ion-md-',
      internalIcons: {
        check: 'checkmark',
        information: 'information',
        'check-circle': 'checkmark-circle-outline',
        alert: 'alert',
        'alert-circle': 'alert',
        'arrow-up': 'arrow-up',
        'chevron-right': 'arrow-forward',
        'chevron-left': 'arrow-back',
        'chevron-down': 'arrow-down',
        eye: 'eye',
        'eye-off': 'eye-off',
        'menu-down': 'arrow-dropdown',
        'menu-up': 'arrow-dropup',
        'close-circle': 'close-circle-outline',
      },
    },
  },
};

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

  provide() {
    return {
      karts: this.passingKarts,
    };
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

  computed: {
    passingKarts() {
      const kartSectionInfo = this.stories.find(
        (story) => story.content.component === 'KartSection'
      );

      const infoToPass = kartSectionInfo.content.slides.map((slide) => {
        return {
          type: slide.type,
          title: slide.title,
          kart_img: slide.kart_img,
        };
      });

      // console.log('infoToPass: ', infoToPass);

      return infoToPass;
    },
  },

  created() {
    // console.log('this.$buefy: ', this.$buefy);
    // this.$buefy.config.setOptions(customIconConfig);
  },
  mounted() {
    this.$store.commit('setKartsOptions', this.passingKarts);
    /* this.$nextTick(() => {
      // this.$nuxt.$loading.start();
      // console.log('this.$buefy: ', this.$buefy);
      this.$buefy.config.setOptions(customIconConfig);
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

  methods: {
    /* noti() {
      console.log('zzz');
      this.$uikit.notification({ message: 'Notification message' });
    }, */
  },
};
</script>

<style lang="scss">
@import 'https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css';

// @import url('@/assets/scss/uikit.scss');
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
