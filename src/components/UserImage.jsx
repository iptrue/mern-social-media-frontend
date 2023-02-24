import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserImage = ({ image, size = "60px", userId }) => {
  const navigate = useNavigate();
  console.log(userId, "userID");
  return (
    <Box width={size} height={size}>
      <IconButton
        size="small"
        onClick={() => {
          navigate(`/profile/${userId}`);
        }}
      >
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width={size}
          height={size}
          alt="user"
          src={`http://localhost:3001/assets/${image}`}
        />
      </IconButton>
    </Box>
  );
};

export default UserImage;
