import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  DeleteOutline,
  ChatBubbleOutlineOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { removePost, setPost } from "../../state";
import Friend from "../../components/Friend.jsx"; // Assuming this is the action to update posts
import Swal from "sweetalert2";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  // Like post function
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  // Delete post function with confirmation using SweetAlert
  const deletePost = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Deleted!",
          text: "Your post has been deleted.",
          icon: "success",
          confirmButtonText: "Okay",
        });

        dispatch(removePost(postId));
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to delete the post.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    }
  };

  return (
    <Box
      m="2rem 0"
      p="1rem"
      borderRadius="0.75rem"
      backgroundColor={palette.background.alt}
    >
      <Box
        display={`${loggedInUserId === postUserId ? "flex" : "block"}`}
        justifyContent="space-between"
        alignItems="center"
      >
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        {loggedInUserId === postUserId && (
          <IconButton onClick={deletePost}>
            <DeleteOutline />
          </IconButton>
        )}
      </Box>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{
            borderRadius: "0.75rem",
            marginTop: "0.75rem",
            objectFit: "cover",
          }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <Box mt="0.25rem">
        <Box display="flex" gap="1rem" alignItems="center">
          <Box display="flex" gap="0.3rem" alignItems="center">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </Box>

          <Box display="flex" gap="0.3rem" alignItems="center">
            {/* Comment icon is present but not functional */}
            <IconButton>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>0</Typography> {/* Display 0 comments as placeholder */}
          </Box>

          <Box
            display="flex"
            gap="0.3rem"
            alignItems="center"
            marginLeft="auto"
          >
            <IconButton>
              <ShareOutlined />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PostWidget;
