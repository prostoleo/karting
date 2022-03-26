// import { useStoryblokApi } from '@storyblok/nuxt';
import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.cjs';

export const richtext = (text) => {
  return RichTextResolver.render(text);
};
