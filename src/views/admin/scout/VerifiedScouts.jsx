import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";

import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Chip,
  Pagination,
  IconButton,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Visibility } from "@mui/icons-material";

import BreadCumb from "../../../components/BreadCumb";
import { getVerifiedScouts } from "../../../store/reducers/scout";

// BREADCUMD DATA
const data = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    label: "Scout Verified",
    path: "/admin/scout/verified",
  },
];

const VerifiedScouts = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  function capitalizeWords(str) {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, function (firstLetter) {
        return firstLetter.toUpperCase();
      });
  }

  useEffect(() => {
    dispatch(getVerifiedScouts({ page, perPage, name }));
  }, [page, perPage, name]);

  const { loading, scouts, totalScout } = useSelector((store) => store.scout);

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
          <TextField
            label="Name"
            type="text"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
                    Scout Group
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", padding: { xs: "10px 2px" } }}
                  >
                    Mobile
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
                        <Avatar
                          src={scout?.image?.secure_url}
                          alt={scout?.nameEnglish}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "10px 2px" }}>
                        {scout?.nameEnglish}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "10px 2px" }}>
                        {scout?.scoutGroup &&
                          capitalizeWords(scout?.scoutGroup)}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "10px 2px" }}>
                        {scout?.phone}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "10px 2px" }}>
                        <Chip
                          label={
                            scout?.scoutSectionType &&
                            capitalizeWords(scout?.scoutSectionType)
                          }
                          color="success"
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "10px 2px" }}>
                        <Box display="flex" justifyContent="center">
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

export default VerifiedScouts;
