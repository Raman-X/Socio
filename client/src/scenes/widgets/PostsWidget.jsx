import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import { Box, Typography, useTheme, Skeleton } from "@mui/material";

import { useEffect, useState, useMemo } from "react";

const PostsWidget = ({ userId, isProfile = false, sortOrder }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();

  const [loading, setLoading] = useState(true);
  const [localSortOrder, setLocalSortOrder] = useState(sortOrder);

  // Fetch posts initially
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      if (isProfile) {
        const response = await fetch(
          `http://localhost:3001/posts/${userId}/posts`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
      } else {
        const response = await fetch("http://localhost:3001/posts", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
      }
      setLoading(false);
    };
    fetchPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Watch for sortOrder change
  useEffect(() => {
    if (sortOrder !== localSortOrder) {
      setLoading(true);
      setLocalSortOrder(sortOrder);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 400); // short delay for feedback
      return () => clearTimeout(timer);
    }
  }, [sortOrder]);

  const sortedPosts = useMemo(() => {
    return sortOrder === "latest" ? [...posts].reverse() : [...posts];
  }, [posts, sortOrder]);

  return (
    <>
      {loading ? (
        Array.from({ length: 2 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              height: "160px",
              backgroundColor: palette.background.alt,
              borderRadius: 2,
              my: 2,
              animation: "pulse 1.5s infinite",
            }}
          />
        ))
      ) : sortedPosts.length !== 0 ? (
        sortedPosts.map(
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
        )
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
