import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
  FormControl,
  FormLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

import BreadCumb from "./../../../components/BreadCumb";
import {
  AcUnit,
  Apartment,
  CalendarMonth,
  CameraAlt,
  Edit,
  Email,
  Login,
  Person,
  Send,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { LoadingButton } from "@mui/lab";
import {
  clearMsg,
  updateUserAvatar,
  updateUserPassword,
} from "../../../store/reducers/auth";
import toast from "react-hot-toast";
import { getScoutByUserId } from "../../../store/reducers/scout";

// BREADCUMD DATA
const data = [
  {
    label: "Dashboard",
    path: "/scout/dashboard",
  },
  {
    label: "Profile",
    path: "/scout/profile",
  },
];

const Profile = () => {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo, errorMsg, successMsg, loadingUpdateAvatar } = useSelector(
    (state) => state.auth
  );

  // GET SCOUT
  useEffect(() => {
    if (userInfo?._id) {
      dispatch(getScoutByUserId(userInfo?._id));
    }
  }, [userInfo?._id]);

  const { scout } = useSelector((state) => state.scout);

  // HANDLE CHANGE PASSWORD
  const handleSubmit = () => {
    if (!currentPassword || !newPassword) {
      toast.error("Please fill all fields");
    } else {
      dispatch(updateUserPassword({ currentPassword, newPassword }));
    }
  };

  // HANDLE UPDATE AVATAR
  const handleUpdateAvatar = () => {
    const formData = new FormData();
    formData.append("photo", file);

    if (file) {
      dispatch(updateUserAvatar(formData));
    }
  };

  // TOAST MESSAGE
  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg);
      dispatch(clearMsg());
    }
    if (successMsg) {
      setOpen(false);
      toast.success(successMsg);
      dispatch(clearMsg());
    }
  }, [successMsg, errorMsg]);

  return (
    <Box>
      <BreadCumb data={data} />

      <Box p={2} mt={2} bgcolor="#fff">
        <Box display="flex" justifyContent="center" gap={2}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100px"
            height="100px"
            border="1px solid #000"
            borderRadius="10px"
          >
            <img
              src={userInfo?.image?.secure_url}
              alt={userInfo?.name}
              style={{ width: "90%", height: "90%", objectFit: "cover" }}
            />
          </Box>
          <Fab size="small" onClick={() => setOpen(true)}>
            <Edit color="warning" fontSize="small" />
          </Fab>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Tabs
          centered
          indicatorColor="secondary"
          textColor="primary"
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
        >
          <Tab label="Personal Info" value="personal" />
          <Tab label="Account" value="account" />
        </Tabs>

        {activeTab === "personal" && (
          <Box
            mt={3}
            sx={{ width: "calc(100% - 20px)", maxWidth: "600px", mx: "auto" }}
          >
            <Box display="flex" flexDirection={{ xs: "column", sm: "row" }}>
              <ListItem>
                <ListItemIcon>
                  <Person color="info" />
                </ListItemIcon>
                <Box>
                  <Typography fontWeight={600}>Name </Typography>
                  <Typography>{userInfo?.name}</Typography>
                </Box>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Email color="info" />
                </ListItemIcon>
                <Box>
                  <Typography fontWeight={600}>Email </Typography>
                  <Typography>{userInfo?.email}</Typography>
                </Box>
              </ListItem>
            </Box>
            <Box display="flex" flexDirection={{ xs: "column", sm: "row" }}>
              <ListItem>
                <ListItemIcon>
                  <CalendarMonth color="info" />
                </ListItemIcon>
                <Box>
                  <Typography fontWeight={600}>Date of Birth </Typography>
                  <Typography>
                    {dayjs(userInfo?.dob).format("DD MMM YYYY")}
                  </Typography>
                </Box>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Login color="info" />
                </ListItemIcon>
                <Box>
                  <Typography fontWeight={600}>Join Date </Typography>
                  <Typography>
                    {dayjs(scout?.joinDate).format("DD MMM YYYY")}
                  </Typography>
                </Box>
              </ListItem>
            </Box>
            <Box display="flex" flexDirection={{ xs: "column", sm: "row" }}>
              <ListItem>
                <ListItemIcon>
                  <AcUnit color="info" />
                </ListItemIcon>
                <Box>
                  <Typography fontWeight={600}>Scout Unit </Typography>
                  <Typography>{scout?.unit}</Typography>
                </Box>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Apartment color="info" />
                </ListItemIcon>
                <Box>
                  <Typography fontWeight={600}>Scout Region </Typography>
                  <Typography>{scout?.scoutRegion}</Typography>
                </Box>
              </ListItem>
            </Box>
          </Box>
        )}

        {activeTab === "account" && (
          <Box mt={3}>
            <Typography
              fontSize={18}
              fontWeight={600}
              textAlign="center"
              mb={2}
            >
              Change Password
            </Typography>
            <Box
              sx={{ width: "calc(100% - 20px)", maxWidth: "600px", mx: "auto" }}
            >
              <FormControl fullWidth>
                <FormLabel>Current Password</FormLabel>
                <TextField
                  color="warning"
                  type="password"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  value={currentPassword}
                />
              </FormControl>
              <FormControl fullWidth sx={{ my: 3 }}>
                <FormLabel>New Password</FormLabel>
                <TextField
                  color="warning"
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                />
              </FormControl>
              <LoadingButton
                loading={false}
                loadingPosition="start"
                startIcon={<Send />}
                variant="contained"
                color="info"
                type="submit"
                onClick={handleSubmit}
                sx={{ ml: "auto" }}
              >
                Submit
              </LoadingButton>
            </Box>
          </Box>
        )}
      </Box>

      {/* PROFILE AVATAR UPLOAD */}
      <Dialog open={open}>
        <DialogTitle>Update Profile Photo</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
          <LoadingButton
            loading={loadingUpdateAvatar}
            loadingPosition="start"
            startIcon={<Send />}
            variant="contained"
            color="info"
            type="submit"
            onClick={handleUpdateAvatar}
          >
            Update
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
