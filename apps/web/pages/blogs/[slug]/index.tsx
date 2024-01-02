import * as React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { getContents, updateView } from '../../../services/contents';
import parse from 'html-react-parser';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { contentsKeys } from '../../../queries/content';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ContentResponse } from '../../../../../types/types';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getContents();
  const paths = data?.data?.map((item: ContentResponse) => {
    return {
      params: { slug: item.attributes.slug },
    };
  });
  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const queryClient = new QueryClient();
  const slug = params.slug;
  await queryClient.prefetchQuery(contentsKeys.contents.detail(params.slug));
  await queryClient.refetchQueries();
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      slug: slug,
    },
  };
};

export default function detailBlog({
  dehydratedState,
  slug,
}: {
  dehydratedState: any;
  slug: string;
}) {
  const { data, isFetching } = useQuery({
    ...contentsKeys.contents.detail(slug),
    refetchOnWindowFocus: false,
  });
  const mutation = useMutation({
    mutationFn: () =>
      updateView(data?.data[0]?.id, data?.data[0]?.attributes.Views),
  });

  React.useEffect(() => {
    if (data?.data[0].attributes.Views !== undefined) {
      mutation.mutate();
    }
  }, [isFetching]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Container maxWidth={`lg`}>
        {data?.data[0] ? (
          <Grid>
            <Paper
              sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${
                  'http://localhost:1337' +
                  data?.data[0]?.attributes?.ImageContent?.data?.attributes.url
                })`,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  backgroundColor: 'rgba(0,0,0,.3)',
                }}
              />
              <Grid container>
                <Grid item md={8} padding={2}>
                  <Box
                    sx={{
                      height: '400px',
                      position: 'relative',
                    }}
                  >
                    <Typography
                      gutterBottom
                      sx={{
                        typography: { xs: 'h4', md: 'h3' },
                      }}
                    >
                      {data?.data[0]?.attributes?.Title}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
            <Typography
              gutterBottom
              sx={{
                typography: { xs: 'h4', md: 'h3' },
              }}
            >
              {data?.data[0]?.attributes?.Title}
            </Typography>
            <Typography variant='subtitle1' color='primary'>
              Views : {data?.data[0]?.attributes?.Views}
            </Typography>
            <Typography component='h2' variant='h5'>
              {parse(`${data?.data[0]?.attributes?.content}`)}
            </Typography>
          </Grid>
        ) : (
          <Grid>
            <Typography
              style={{ cursor: 'pointer' }}
              component='h2'
              variant='h5'
              mt={20}
              display='flex'
              justifyContent='center'
            >
              <Link href='/'>CARI BERITA LAIN</Link>
            </Typography>
          </Grid>
        )}
      </Container>
    </HydrationBoundary>
  );
}
