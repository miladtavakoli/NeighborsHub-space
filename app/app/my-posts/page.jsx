"use client";
import PostList from "components/posts/postsList";
import { myPostsSelector } from "store/slices/postsSlices";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const MyPosts = () => {
  const posts = useSelector(myPostsSelector);

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        px: "0!important",
      }}
    >
      <Grid
        container
        justifyContent={"center"}
        sx={{ px: 1, height: "calc( 100vh - 95px )", overflowY: "auto" }}
      >
        <PostList posts={posts} showLocationOnMap />
      </Grid>
    </Container>
  );
};

export default MyPosts;
