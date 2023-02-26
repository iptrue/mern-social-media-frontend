import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import ClearIcon from "@mui/icons-material/Clear";
const Friend = ({ friendId, name, subtitle, userPicturePath, deletePost }) => {
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

  const isEditable = _id === friendId ? true : false;

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  const onClickRemove = () => {
    deletePost();
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap="1rem"
    >
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" userId={friendId} />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <Box display="flex" sx={{ justifyContent: "flex-end" }}>
        {!isEditable && (
          <IconButton
            onClick={() => patchFriend()}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          >
            {isFriend ? (
              <PersonRemoveOutlined sx={{ color: main }} />
            ) : (
              <PersonAddOutlined sx={{ color: main }} />
            )}
          </IconButton>
        )}
        {isEditable && (
          <Box alignItems="start">
            <IconButton onClick={onClickRemove}>
              <ClearIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Friend;
