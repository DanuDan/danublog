'use client'

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import SearchIcon from '@mui/icons-material/Search';
import MainFeaturedPost from '@/components/MainFeaturePost';
import Header from '@/components/Header';
import { IconButton, InputBase, Paper, ThemeProvider, createTheme } from '@mui/material';
import FeaturedPost from '@/components/FeaturePost';
import Sidebar from '@/components/Sidebar';
import { createClient } from 'contentful';


const sidebar = {
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

export async function getStaticProps() {


  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  })

  const res = await client.getEntries({ content_type: "blog" })

  return {
    props: {
      blogs: res.items
    },
    revalidate: 1
  }
}

export default function Home({ blogs }) {

  return (

    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="lg" spacing={2}>
        <Header title="Blog" />
        <main>
          <MainFeaturedPost post={blogs[0]} />
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
            <FeaturedPost post={blogs} />
            <Sidebar
              post={blogs}
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

