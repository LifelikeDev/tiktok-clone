import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'etq8jaxu',
  dataset: 'production',
  apiVersion: '2022-07-06',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
