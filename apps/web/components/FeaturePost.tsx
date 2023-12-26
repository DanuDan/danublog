import * as React from 'react';
import Link from 'next/link'
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, Grid } from '@mui/material';
import parse from "html-react-parser"

export default function FeaturedPost({ post } : {post?:any}) {

    return (
        <Grid item xs={18} md={6} sx={{
            '& .markdown': {
            },

        }}>
            <Box sx={{
                mt: 3
            }}>
                {post?.map((post:any, i) => (
                    <Link key={i} href={"blogs/" + post?.attributes.slug}>
                        <Card  sx={{ display: 'flex', mb: 2 }}>
                            <CardContent sx={{ flex: 1 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 400, display: { xs: 'block', sm: 'none' }, cursor: 'pointer' }}
                                    image={"http://localhost:1337" + post?.attributes.ImageContent.data.attributes.url}
                                    alt="Content"
                                />
                                <Typography component="h2" variant="h6">
                                    {post?.attributes.Title}
                                </Typography>
                                <Typography variant="subtitle1">
                                    {post.attributes.Date}
                                </Typography>
                                <Typography variant="subtitle2"
                                    sx={{
                                        width: '400px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: '2',
                                        WebkitBoxOrient: 'vertical',
                                    }} >
                                    {parse(`${post?.attributes.content}`)}
                                </Typography>
                                <Typography variant="subtitle1" color="primary">
                                    Continue reading...
                                </Typography>
                                <Typography variant="subtitle2" color="primary">
                                  {post.attributes.Views}
                                </Typography>
                            </CardContent>
                            <CardMedia
                                component="img"
                                sx={{ width: 200, height: 200, display: { xs: 'none', sm: 'block' } }}
                                image={"http://localhost:1337" + post?.attributes.ImageContent.data.attributes.url}
                                alt="Content"
                            />
                        </Card>
                    </Link>
                 ))
                }
            </Box>
        </Grid>
    );
}

