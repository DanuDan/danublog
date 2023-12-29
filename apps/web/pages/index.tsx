import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import SearchIcon from "@mui/icons-material/Search";
import MainFeaturedPost from "../components/MainFeaturePost";
import {
  Button,
  InputBase,
  Paper,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import FeaturedPost from "../components/FeaturePost";
import Sidebar from "../components/Sidebar";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";
import { searchContent } from "../services/contents";
import Header from "../components/Header";
import { contentsKeys } from "../queries/content";
import { GetStaticProps } from "next";

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
  title: "Most Populer",
  description: "Jangan lewatkan topik yang sedang viral saat ini !",
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

const defaultTheme = createTheme({
  palette: {
    primary: { main: "#FF5733" },
  },
});

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(contentsKeys.contents.list());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home({ dehydratedState }: { dehydratedState: any }) {
  const [value, setValue] = React.useState<string>("");
  const [search, setSearch] = React.useState<any>();
  const { data } = useQuery({
    ...contentsKeys.contents.list(),
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    setSearch(data?.data);
  }, [data]);

  const submitSearch = async (e: any) => {
    if (e.keyCode === 13 && e.shiftKey == false) {
      e.preventDefault();
      const data = await searchContent(value);
      setSearch(data.data);
    }
  };

  return (
    <HydrationBoundary state={dehydratedState}>
      <ThemeProvider theme={defaultTheme}>
        <Container maxWidth={"lg"}>
          <Header title="Blog" />
          <main>
            <MainFeaturedPost post={data?.data[0]} />
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: { xs: 1, sm: "400px" },
              }}
            >
              <InputBase
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={submitSearch}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
              />
              <Button>
                <SearchIcon />
              </Button>
            </Paper>
            <Grid
              container
              spacing={2}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <FeaturedPost post={search} />
              <div>{search?.name}</div>
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
    </HydrationBoundary>
  );
}
