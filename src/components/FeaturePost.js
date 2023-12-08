'use client'

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, Grid } from '@mui/material';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function FeaturedPost({ post }) {

    return (


        <Grid item xs={6} sx={{
            '& .markdown': {
            },

        }}>

            <Box sx={{
                mt: 3
            }}>



                {post.map((post, i) => (
                    <CardActionArea component="a" href={"blog/" + post.fields.slug}>
                        <Card key={i} sx={{ display: 'flex', mb: 2 }}>
                            <CardContent sx={{ flex: 1 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 500, display: { xs: 'block', sm: 'none' }, cursor: 'pointer' }}
                                    image={"https:" + post.fields.imagecontent.fields.file.url}
                                    alt="Content"
                                />
                                <Typography component="h2" variant="h6">
                                    {post.fields.title}
                                </Typography>
                                <Typography variant="subtitle1">
                                    {/* {post.fields.date} */}
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
                                    {documentToReactComponents(post.fields.description)}
                                </Typography>
                                <Typography variant="subtitle1" color="primary">
                                    Continue reading...
                                </Typography>
                                <Typography variant="subtitle2" color="primary">
                                    Views :{post.fields.views}
                                </Typography>
                            </CardContent>
                            <CardMedia
                                component="img"
                                sx={{ width: 200, height: 200, display: { xs: 'none', sm: 'block' } }}
                                image={"https:" + post.fields.imagecontent.fields.file.url}
                                alt="Content"
                            />
                        </Card>
                    </CardActionArea>
                ))
                }


            </Box>

        </Grid>
    );
}

