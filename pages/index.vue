<template>
  <div class="site relative">
    <BaseHeader></BaseHeader>
    <main>
      <!-- <pre>{{ content }}</pre> -->
      <div v-for="story in stories" :key="story.uuid">
        <!-- <pre>
          {{ story }}
        </pre> -->
        <!-- <pre>{{ story.content.component }}</pre> -->
        <!-- v-if="story.content.component" -->
        <!-- <component
          :is="`HeroSection`"
          :key="story.uuid"
          :blok="story.content"
        /> -->
        <!-- <component
          :is="story.content.component"
          :key="story.uuid"
          :blok="story.content"
        /> -->
        <component
          :is="story.content.component"
          v-if="story.content.component"
          :key="story.content.uuid"
          :blok="story.content"
        />
      </div>
      <!-- <HeroSection :blok="content.stories[0].content" /> -->

      <!-- <pre>
        {{ content }}
      </pre> -->
      <!-- <component
        :is="story.content.component"
        v-if="story.content.component"
        :key="story.content.uuid"
        :blok="story.content"
      /> -->
      <!-- <div v-if="isComponentFromCMS('HeroSection')">
        <HeroSection :blok="isComponentFromCMS('HeroSection').content" />
      </div> -->
    </main>
    <footer>Footer</footer>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import { useStoryblokBridge, useStoryblokApi } from '@storyblok/nuxt';
import KartSection from '../components/storyblok/KartSection.vue';
import HeroSection from '~/components/storyblok/HeroSection.vue';
import BaseHeader from '~/components/base/BaseHeader.vue';
console.log('useStoryblokApi: ', useStoryblokApi);
console.log('useStoryblokBridge: ', useStoryblokBridge);

export default {
  name: 'IndexPage',
  components: { HeroSection, KartSection, BaseHeader },

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
      console.log('response: ', response);
      // const result = await response.json();
      // console.log('result: ', result);
      stories = response.data.stories;
      console.log('stories: ', stories);
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
      // story: { content: null },
    };
  },
  methods: {
    isComponentFromCMS(compName) {
      // const blok = this.story.stories.find(
      const blok = this.stories.find(
        (storyItem) => storyItem.content.component === compName
      );
      console.log('blok: ', blok);

      return blok;
    },

    findStoryOnId(id) {
      const foundStory = this.stories.find((story) => story.id === id);

      return foundStory;
    },
  },
};
</script>

<style lang="scss">
.site {
  display: grid;
  grid-template-rows: auto 1fr auto;

  min-height: 100vh;
}
</style>
