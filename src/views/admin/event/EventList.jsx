import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import {
  Box,
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
  Typography,
} from "@mui/material";

import BreadCumb from "./../../../components/BreadCumb";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../../store/reducers/event";
import { grey } from "@mui/material/colors";
import { Edit, Visibility } from "@mui/icons-material";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

// BREADCUMD DATA
const data = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    label: "Events",
    path: "/admin/event/list",
  },
];

const EventList = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // GET EVENTS
  useEffect(() => {
    dispatch(getEvents({ page, perPage }));
  }, [page, perPage]);

  const { loading, events, totalEvent } = useSelector((state) => state.event);

  return (
    <Box>
      <BreadCumb data={data} />

      <Box bgcolor="#fff" p={2} mt={2}>
        {/* HEADER */}
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          bgcolor="#fff"
          mb={1}
        >
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
            minHeight={325}
          >
            <PuffLoader
              color="green"
              loading={true}
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
                    Title
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", padding: { xs: "10px 2px" } }}
                  >
                    Event Date
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", padding: { xs: "10px 2px" } }}
                  >
                    Participants
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
                {events &&
                  events.map((event, i) => (
                    <TableRow key={i}>
                      <TableCell align="center" sx={{ padding: "10px 2px" }}>
                        {i + 1}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "10px 2px" }}>
                        {event?.title}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "10px 2px" }}>
                        {dayjs(event?.eventStart).format("DD-MM-YYYY")} -{" "}
                        {dayjs(event?.eventEnd).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "10px 2px" }}>
                        {event?.participants?.length}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "10px 2px" }}>
                        <Box display="flex" justifyContent="center">
                          <IconButton size="small">
                            <Edit fontSize="small" color="warning" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() =>
                              navigate(`/admin/event/${event?._id}`)
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
        {/* NOT FOUND */}
        {totalEvent === 0 && !loading ? (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="20vh"
          >
            <Typography fontSize={20} fontWeight={700} color={grey[600]}>
              Event Not Found
            </Typography>
          </Box>
        ) : null}

        {/* PAGINATION */}
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Pagination
            color="primary"
            count={Math.ceil(totalEvent / perPage)}
            page={page}
            onChange={(e, v) => setPage(v)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EventList;
