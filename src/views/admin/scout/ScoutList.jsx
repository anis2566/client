import {
  Avatar,
  Box,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BreadCumb from "../../../components/BreadCumb";
import { useDispatch, useSelector } from "react-redux";
import { getScouts } from "../../../store/reducers/scout";
import { grey } from "@mui/material/colors";
import { Edit, Visibility } from "@mui/icons-material";
import { sectionTypes } from "../../../utills";
import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";

// BREADCUMD DATA
const data = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    label: "Scout List",
    path: "/admin/scout/list",
  },
];
const ScoutList = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [section, setSection] = useState("All");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("All");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function capitalizeWords(str) {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, function (firstLetter) {
        return firstLetter.toUpperCase();
      });
  }

  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    dispatch(getScouts({ page, perPage, name, gender, section }));
  }, [page, perPage, name, gender, section]);

  const { scouts, totalScout, loading } = useSelector((store) => store.scout);

  return (
    <Box>
      <BreadCumb data={data} />

      <Box bgcolor="#fff" mt={2} p={2}>
        {/* HEADER */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={{ xs: 1 }}
          bgcolor="#fff"
          mb={1}
        >
          <Box display="flex" gap={2}>
            <FormControl sx={{ minWidth: "150px" }}>
              <InputLabel id="demo-simple-select-label">Section</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={section}
                label="Section"
                onChange={(e) => setSection(e.target.value)}
                size="small"
              >
                {[{ label: "All", value: "All" }, ...sectionTypes].map(
                  (sec, i) => (
                    <MenuItem value={sec.value} key={i}>
                      {sec.label}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
            <TextField
              label="Name"
              type="text"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormControl sx={{ minWidth: "150px" }}>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Gender"
                onChange={(e) => setGender(e.target.value)}
                size="small"
              >
                {["All", "Male", "Female", "Other"].map((v, i) => (
                  <MenuItem value={v} key={i}>
                    {v}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <FormControl sx={{ minWidth: "80px" }}>
            <InputLabel id="demo-simple-select-label">Per Page</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={perPage}
              label="Per Page"
              onChange={(e) => setPerPage(e.target.value)}
              size="small"
            >
              {[5, 10, 20, 50].map((v) => (
                <MenuItem value={v} key={v}>
                  {v}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="30vh"
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
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: grey[200] }}>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", padding: { xs: "10px 2px" } }}
                  >
                    #SL
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", padding: { xs: "10px 2px" } }}
                  >
                    Image
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", padding: { xs: "10px 2px" } }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", padding: { xs: "10px 2px" } }}
                  >
                    Scout ID
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", padding: { xs: "10px 2px" } }}
                  >
                    Member Type
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", padding: { xs: "10px 2px" } }}
                  >
                    Section
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", padding: { xs: "10px 2px" } }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scouts &&
                  scouts.map((scout, i) => (
                    <TableRow key={i}>
                      <TableCell align="center" sx={{ padding: "10px 2px" }}>
                        {i + 1}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "10px 2px" }}>
                        {/* <img
                        src={scout?.image?.secure_url}
                        style={{ height: "30px" }}
                      /> */}
                        <Avatar
                          src={scout?.image?.secure_url}
                          alt={scout?.nameEnglish}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "10px 2px" }}>
                        {scout?.nameEnglish}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ padding: "10px 2px", textTransform: "uppercase" }}
                      >
                        {scout?._id?.slice(-6)}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "10px 2px" }}>
                        {capitalizeWords(scout?.memberType)}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "10px 2px" }}>
                        <Chip
                          label={capitalizeWords(scout?.scoutSectionType)}
                          color="success"
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "10px 2px" }}>
                        <Box display="flex" justifyContent="center">
                          <IconButton size="small">
                            <Edit fontSize="small" color="warning" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleNavigate(`/admin/scout/${scout?._id}`)
                            }
                          >
                            <Visibility fontSize="small" color="info" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* PAGINATION */}
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Pagination
            color="primary"
            count={Math.ceil(totalScout / perPage)}
            page={page}
            onChange={(e, v) => setPage(v)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ScoutList;
