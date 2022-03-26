import StoryblokClient from 'storyblok-js-client';

// todo для генерации динамических путей для SSG
// https://medium.com/js-dojo/how-i-generated-dynamic-routes-for-different-nuxt-js-pages-ce2ee6972743

export const dynamicRoutes = async () => {
  const Storyblok = new StoryblokClient({
    accessToken: process.env.STORYBLOK_KEY,
    // accessToken: key,
    // accessToken: STORYBLOK_KEY,
  });

  const results = await Storyblok.get(`cdn/stories`, {
    version: 'draft',
    // version: 'published',
    starts_with: 'home/',
    // resolve_relations: 'Post.direction_info',
  }).then((res) => res.data);
  console.log('results: ', results);

  const routes = results.stories.map((story) => {
    return {
      route: `/`,
      payload: story,
    };
  });

  const routesTotal = [...routes];

  return routesTotal;
};

// const test = dynamicRoutes();
// console.log('test: ', test);
