import { Box, Container, Grid, Paper, Typography } from "@mui/material"
import { createClient } from "contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
    const res = await client.getEntries({
        content_type: "blog"
    })

    const paths = res.items.map(item => {
        return {
            params: { slug: item.fields.slug }
        }
    })

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async ({ params }) => {
    const { items } = await client.getEntries({
        content_type: 'blog',
        'fields.slug': params.slug
    })


    return {
        props: {
            blogs: items[0]
        },
        revalidate: 1
    }
}


export default function detailBlog({ blogs }) {

    return (
        <Container maxWidth="lg" spacing={2}>
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
                        backgroundImage: `url(${blogs?.fields?.imagecontent.fields.file.url})`,
                    }}
                >
                    {<img style={{ display: 'none' }} src={"https:" + blogs?.fields?.imagecontent.fields.file.url} alt="detailContent" />}
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
                                    {blogs?.fields?.title}
                                </Typography>

                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                    {blogs?.fields?.title}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                    Views : {blogs?.fields?.views}
                </Typography>

                <Typography component="h2" variant="h5">
                    {documentToReactComponents(blogs?.fields?.description)}
                </Typography>
            </Grid>
        </Container>
    )
}