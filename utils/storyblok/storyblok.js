import StoryblokClient from 'storyblok-js-client';
// import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.es.js';

export const richtext = (text) => {
  console.log('process.env.STORYBLOK_KEY: ', process.env.STORYBLOK_KEY);
  const Storyblok = new StoryblokClient({
    accessToken: process.env.STORYBLOK_KEY || 'ydOEN9F4Nn8zhLWMymAP9Att',
    // accessToken: key,
    // accessToken: STORYBLOK_KEY,
  });
  console.log('Storyblok: ', Storyblok);

  return Storyblok.richTextResolver.render(text);
};
