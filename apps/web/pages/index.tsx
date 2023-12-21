'use client'

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import SearchIcon from '@mui/icons-material/Search';
import MainFeaturedPost from '../components/MainFeaturePost';
import { IconButton, InputBase, Paper, ThemeProvider, createTheme } from '@mui/material';
import FeaturedPost from '../components/FeaturePost';
import Sidebar from '../components/Sidebar';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { getContents } from '../services/contents';
import Header from '../components/Header';

interface SocialItem {
  name: string;
  icon: any;
}

interface SidebarProps {
  title: string;
  description: string;
  social: SocialItem[];
}

const sidebar: SidebarProps = {
  title: 'Most Populer',
  description: 'Jangan lewatkan topik yang sedang viral saat ini !',
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const defaultTheme = createTheme({
  palette: {
    primary: { main: '#FF5733' },
  },
});


export async function getStaticProps(){
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({ queryKey: ['contents'], queryFn: () => getContents()})

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    },
    revalidate: 60
  }
}



export default function Home() {
  const { isLoading, isError, data, error } = useQuery({queryKey: ['contents'], queryFn: () => getContents()})

  return (

    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth={"lg"}> 
        <Header title="Blog" />
        <main>
          <MainFeaturedPost post={data?.data[0]} />
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: { xs: 1, sm: "400px" } }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FeaturedPost post={data?.data} />
            <div>
              {data?.name}
            </div>
            <Sidebar
              post={data?.data}
              title={sidebar.title}
              description={sidebar.description}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}

