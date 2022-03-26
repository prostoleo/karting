export const richtext = (text) => {
  return window.$nuxt.context.app.$storyapi.richTextResolver.render(text);
};
