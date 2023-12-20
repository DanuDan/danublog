import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import parse from "html-react-parser"

export default function MainFeaturedPost({post} : {post?: any}) {
  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${"http://localhost:1337" + post?.attributes.ImageContent.data.attributes.url} )`,
      }}
    >
      <img style={{ display: 'none' }} src={"http://localhost:1337" + post?.attributes.ImageContent.data.attributes.url} alt="contentHeader" />
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
        <Grid item xs={20} md={6} padding={2}>
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {post?.attributes.Title}
            </Typography>
            <Typography variant="h5"
              sx={{
                width: '400px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
              }} >
              {parse(`${post?.attributes.content}`)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper >
  );
}