import * as React from 'react';
import { Box, Container, Grid, Paper, Typography } from "@mui/material"
import { getContent, getContents } from '../../../services/contents';
import parse from "html-react-parser"

export const getStaticPaths = async () => {
    const data = await getContents()
    const paths = data.data?.map(item => {
                return {
                    params: { id: item.id.toString() },
                }
            })
    return {
      paths: paths,
      fallback: true,
    };
  };

  export const getStaticProps = async (ctx) =>{
    const  id  = ctx.params
    const data = await getContent(id)

    return {
        props: {
          posts: data.data
        },
        revalidate: 60
      }
    }

export default function detailBlog({ posts } : {posts?:any}) {

    return (
        <Container maxWidth={`lg`}>
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
                        backgroundImage: `url(${"http://localhost:1337" + posts?.attributes?.ImageContent.data.attributes.url})`,
                    }}
                >
                    {/* {<img style={{ display: 'none' }} src={"https:" + posts?.fields?.imagecontent.fields.file.url} alt="detailContent" />} */}
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
                        <Grid item md={6} padding={2}>
                            <Box
                                sx={{
                                    height: '400px',
                                    position: 'relative',
                                }}
                            >
                                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                    {posts?.attributes?.Title}
                                </Typography>

                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                     {posts?.attributes?.Title}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                    Views : {posts?.attributes?.Views}
                </Typography>
                <Typography component="h2" variant="h5">
                    {parse(`${posts?.attributes.content}`)}
                </Typography>
            </Grid>
        </Container>
    )
}