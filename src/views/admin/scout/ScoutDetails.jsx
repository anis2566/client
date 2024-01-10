import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import {
  Box,
  Grid,
  ListItem,
  List,
  Typography,
  ListItemIcon,
  Divider,
  Chip,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
} from "@mui/material";

import BreadCumb from "../../../components/BreadCumb";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMsg,
  getScout,
  updateStatus,
} from "../../../store/reducers/scout";
import { Check, Send } from "@mui/icons-material";
import PuffLoader from "react-spinners/PuffLoader";
import { scoutStatus } from "../../../utills";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";

// BREADCUMD DATA
const data = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    label: "Scouts",
    path: "/admin/scout/list",
  },
  {
    label: "Details",
    path: "/admin/scout/",
  },
];

const ScoutDetails = () => {
  const [status, setStatus] = useState("applied");

  const { scoutId } = useParams();
  const dispatch = useDispatch();

  // BREADCUMD DATA
  const data = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      label: "Scouts",
      path: "/admin/scout/list",
    },
    {
      label: "Details",
      path: `/admin/scout/${scoutId}`,
    },
  ];

  function capitalizeWords(str) {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, function (firstLetter) {
        return firstLetter.toUpperCase();
      });
  }

  // GET SCOUT
  useEffect(() => {
    dispatch(getScout(scoutId));
  }, [scoutId]);

  const { scout, loading, loadingStatus, successMsg, errorMsg } = useSelector(
    (store) => store.scout
  );

  // HANDLE SUBMIT
  const handleSubmit = () => {
    if (!status) {
      toast.error("Please select status");
    } else {
      dispatch(updateStatus({ status, scoutId }));
    }
  };

  // SHOW TOAST MESSAGE
  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg);
      dispatch(clearMsg());
    }
    if (successMsg) {
      toast.success(successMsg);
      dispatch(clearMsg());
    }
  }, [errorMsg, successMsg]);

  return (
    <Box>
      <BreadCumb data={data} />

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="30vh"
          bgcolor="#fff"
        >
          <PuffLoader
            color={"green"}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      ) : (
        <Box bgcolor="#fff" mt={2} p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Divider sx={{ my: 2 }}>
                <Chip variant="contained" color="info" label="Personal Info" />
              </Divider>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                  width={100}
                  height={100}
                  borderRadius="50%"
                >
                  <img
                    src={scout?.image?.secure_url}
                    alt="Logo"
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "50%",
                    }}
                  />
                </Box>
                <List>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      Full Name:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.nameEnglish}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      Full Name (Bangla):{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.nameBangla}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={16} fontWeight={700}>
                      Father Name:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.fNameBangla}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={16} fontWeight={700}>
                      Father Name (Bangla):{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.fNameBangla}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={16} fontWeight={700}>
                      Mother Name:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.mNameBangla}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={16} fontWeight={700}>
                      Mother Name (Bangla):{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.mNameBangla}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={16} fontWeight={700}>
                      Gender:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.gender}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={16} fontWeight={700}>
                      Date of Birth:{" "}
                      <Typography component="span" fontWeight={500}>
                        {dayjs(scout?.dob).format("DD-MM-YYYY")}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={16} fontWeight={700}>
                      Blood Group:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.bloodGroup}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={16} fontWeight={700}>
                      Religion:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.religion}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={16} fontWeight={700}>
                      Mobile:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.phone}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={16} fontWeight={700}>
                      Email:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.email}
                      </Typography>
                    </Typography>
                  </ListItem>
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Divider sx={{ my: 2 }}>
                <Chip variant="contained" color="info" label="Scout Info" />
              </Divider>
              <Box display="flex" flexDirection="column" alignItems="center">
                <List>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      ID:{" "}
                      <Typography
                        component="span"
                        fontWeight={500}
                        sx={{ textTransform: "uppercase" }}
                      >
                        {scout?._id?.slice(-6)}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      Member Type:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.memberType &&
                          capitalizeWords(scout?.memberType)}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      Scout Join:{" "}
                      <Typography component="span" fontWeight={500}>
                        {dayjs(scout?.joinDate).format("DD-MM-YYYY")}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      Section:{" "}
                      <Chip
                        label={
                          scout?.scoutSectionType &&
                          capitalizeWords(scout?.scoutSectionType)
                        }
                        component="span"
                        size="small"
                        variant="contained"
                        color="success"
                      />
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      Scout Badge:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.scoutBadge &&
                          capitalizeWords(scout?.scoutBadge)}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      Scout Role:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.scoutRole && capitalizeWords(scout?.scoutRole)}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      Scout Unit:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.unit}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      S. Upazilla/Thana:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.scoutUpazilla}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      S. District:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.scoutDistrict}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      Scout Region:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.scoutRegion}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      Current Institute:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.scoutpresentInstitute}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      Current Class:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.presentClass}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      Current Roll:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.presentRoll}
                      </Typography>
                    </Typography>
                  </ListItem>
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Divider sx={{ my: 2 }}>
                <Chip variant="contained" color="info" label="Address" />
              </Divider>
              <Box display="flex" flexDirection="column" alignItems="center">
                <List>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      Village/House No or Name:{" "}
                      <Typography
                        component="span"
                        fontWeight={500}
                        sx={{ textTransform: "uppercase" }}
                      >
                        {scout?.villageHouseEnglish}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      Village/House No or Name (Bangla):{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.villageHouseBangla}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      Road/Block/Sector:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.roadBlockSectorEnglish}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      Road/Block/Sector (Bangla):{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.roadBlockSectorEnglish}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      Post Code:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.postCode}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      Upazill / Thana:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.thana}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      District:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.district}
                      </Typography>
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ padding: "3px 5px" }}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <Typography fontSize={18} fontWeight={700}>
                      Division:{" "}
                      <Typography component="span" fontWeight={500}>
                        {scout?.division}
                      </Typography>
                    </Typography>
                  </ListItem>
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Divider sx={{ my: 2 }}>
                <Chip variant="contained" color="info" label="Action" />
              </Divider>

              <Box display="flex" flexDirection="column">
                <FormControl sx={{ minWidth: "150px" }}>
                  <FormLabel>Scout Status</FormLabel>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {scoutStatus.map((status, i) => (
                      <MenuItem value={status.value} key={i}>
                        {status.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <LoadingButton
                  loading={loadingStatus}
                  loadingPosition="start"
                  startIcon={<Send />}
                  variant="contained"
                  color="warning"
                  sx={{ mt: 2 }}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Update
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default ScoutDetails;
