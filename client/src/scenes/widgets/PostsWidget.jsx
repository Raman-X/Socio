import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import {
  Box,
  Typography,
  useTheme,
  Fade,
  CircularProgress,
  Skeleton,
} from "@mui/material";

const PostsWidget = ({ userId, isProfile = false, sortOrder }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();

  const [loading, setLoading] = useState(true);
  const [renderedPosts, setRenderedPosts] = useState([]);

  const getPosts = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setLoading(false);
  };

  const getUserPosts = async () => {
    setLoading(true);
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setLoading(false);
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLoading(true);
    const sorted = sortOrder === "latest" ? [...posts].reverse() : [...posts];
    // Simulate fade-in effect slightly after sorting
    const timeout = setTimeout(() => {
      setRenderedPosts(sorted);
      setLoading(false);
    }, 150); // feel free to tune this delay

    return () => clearTimeout(timeout);
  }, [sortOrder, posts]);

  return (
    <>
      {loading ? (
        <>
          {[...Array(3)].map((_, i) => (
            <Box key={i} my={"2rem"}>
              <Skeleton
                variant="rectangular"
                height={180}
                sx={{ borderRadius: 1, bgcolor: palette.background.alt }}
              />
              <Skeleton
                width="60%"
                sx={{ borderRadius: 1, bgcolor: palette.background.alt }}
              />
              <Skeleton
                width="80%"
                sx={{ borderRadius: 1, bgcolor: palette.background.alt }}
              />
            </Box>
          ))}
        </>
      ) : renderedPosts.length !== 0 ? (
        <Fade in timeout={400}>
          <Box>
            {renderedPosts.map(
              ({
                _id,
                userId,
                firstName,
                lastName,
                description,
                location,
                picturePath,
                userPicturePath,
                likes = {},
                comments,
              }) => (
                <PostWidget
                  key={_id}
                  postId={_id}
                  postUserId={userId}
                  name={`${firstName} ${lastName}`}
                  description={description}
                  location={location}
                  picturePath={picturePath}
                  userPicturePath={userPicturePath}
                  likes={likes}
                  comments={comments}
                />
              ),
            )}
          </Box>
        </Fade>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            backgroundColor: palette.background.alt,
            borderRadius: 1,
            mt: "2rem",
          }}
        >
          <Typography
            color={palette.neutral.dark}
            fontWeight={500}
            fontSize={"1.5rem"}
          >
            No posts here!!☹️☹️
          </Typography>
        </Box>
      )}
    </>
  );
};

export default PostsWidget;
