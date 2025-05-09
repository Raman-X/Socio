import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  const isSelf = _id === friendId;

  return (
    <FlexBetween>
      <FlexBetween
        gap="1rem"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/profile/${friendId}`);
        }}
        sx={{
          "&:hover .hoverText": {
            color: palette.primary.light,
            cursor: "pointer",
            textDecoration: "underline",
          },
          cursor: "pointer",
        }}
      >
        <UserImage image={userPicturePath} size="55px" />
        <Box>
          <Typography
            className="hoverText"
            color={main}
            variant="h5"
            fontWeight="500"
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      {!isSelf && (
        <IconButton
          onClick={patchFriend}
          sx={{
            backgroundColor: primaryLight,
            p: "0.6rem",
            marginLeft: "1rem",
          }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
