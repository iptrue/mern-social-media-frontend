import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setComments } from "state";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import UserImage from "./../../components/UserImage";
import ClearIcon from "@mui/icons-material/Clear";

const Comments = ({ comments }) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const navigate = useNavigate();

  return (
    <Box display="flex" mt="0.5rem">
      {[...comments]
        .sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
        .map((comment, i) => (
          <Box key={`${comment.firstName}-${i}`}>
            <Box display="flex" gap="1rem">
              <UserImage
                image={comment.userPicturePath}
                size="45px"
                userId={comment.userId}
              />
              <Box
                onClick={() => {
                  navigate(`/profile/${comment.userId}`);
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
                  {comment.firstName} {comment.lastName}
                </Typography>
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment.description}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      <Divider />
    </Box>
  );
};

export default Comments;
