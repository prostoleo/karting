import { useStoryblokApi } from '@storyblok/nuxt';

export const richtext = (text) => {
  const storyblokApi = useStoryblokApi();
  return storyblokApi.richTextResolver.render(text);
};
