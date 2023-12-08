import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Card, CardContent, CardMedia } from '@mui/material';

export default function Sidebar({ archives, description, social, title, post }) {



    const topPopularPosts = post
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    return (
        <Grid item xs={20} md={4}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Typography>{description}</Typography>
                {topPopularPosts.map((topPopularPosts, i) => (
                    <Card key={i} sx={{ display: 'flex', mt: 2 }} >
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                {topPopularPosts.fields.title}
                            </Typography>
                            <Typography variant="subtitle2">
                                {formatDate(topPopularPosts.fields.date)}
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            sx={{ width: 100, height: 100, display: { xs: 'none', sm: 'block' } }}
                            image={"https:" + topPopularPosts.fields.imagecontent.fields.file.url}
                            alt="populerContent"
                        />
                    </Card>
                ))}
            </Paper>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Social
            </Typography>

            {social.map((network) => (
                <Link
                    display="block"
                    variant="body1"
                    href="#"
                    key={network.name}
                    sx={{ mb: 0.5 }}
                >
                    <Stack direction="row" spacing={1} alignItems="center">
                        <network.icon />
                        <span>{network.name}</span>
                    </Stack>
                </Link>
            ))}
        </Grid>
    );
}

