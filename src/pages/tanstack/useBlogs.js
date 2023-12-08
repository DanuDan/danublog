import { useQuery } from '@tanstack/react-query';
import { createClient } from 'contentful';

export function useBlogs() {
  return useQuery('blogs', async () => {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });

    const res = await client.getEntries({ content_type: "blog" });

    return res.items;
  });
}