import React, { useEffect, useState } from "react";

import { Avatar, Box, Button, Typography } from "@mui/material";
import { CameraAlt, Send } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { clearMsg, createScout } from "../../../store/reducers/scout";
import { toast } from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

const Photo = ({ handleBack }) => {
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((store) => store.auth);

  const handleSubmit = () => {
    const values = JSON.parse(localStorage.getItem("application"));
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    formData.append("photo", file);
    formData.append("userId", userInfo?._id);
    if (!file) {
      toast.error("Please upload photo");
    } else {
      dispatch(createScout(formData));
    }
  };

  // GET STORE DATA
  const { loading, errorMsg, successMsg } = useSelector((store) => store.scout);

  // SHOW TOAST MESSAGE
  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg);
      dispatch(clearMsg());
    }
    if (successMsg) {
      toast.success(successMsg);
      navigate("/");
      dispatch(clearMsg());
    }
  }, [errorMsg, successMsg]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        mt: 3,
      }}
    >
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          width="150px"
          height="150px"
          border="2px dotted black"
          borderRadius="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {file && (
            <img
              src={URL.createObjectURL(file)}
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
              }}
            />
          )}
        </Box>
        <Typography my={2}>
          [Note: Photo size should be less than 1 MB]
        </Typography>
        <Avatar
          component="label"
          sx={{ bgcolor: green[500] }}
          variant="rounded"
        >
          <CameraAlt />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </Avatar>
      </Box>

      <Box
        mt={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Button variant="outlined" color="warning" onClick={handleBack}>
          Back
        </Button>
        {/* BUTTON */}
        <LoadingButton
          loading={loading}
          loadingPosition="start"
          startIcon={<Send />}
          variant="contained"
          color="info"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Photo;
