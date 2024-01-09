import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
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
  Typography,
} from "@mui/material";
import { Close, Delete, Edit, Send, Update } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { grey, red } from "@mui/material/colors";

import {
  clearMsg,
  createUnit,
  deleteUnit,
  getUnit,
  getUnits,
  setCurrentUnit,
  updateUnit,
} from "../../../store/reducers/unit";
import BreadCumb from "./../../../components/BreadCumb";

// BREADCUMD DATA
const data = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    label: "Unit",
    path: "/admin/scout/unit",
  },
];

const Unit = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [name, setName] = useState("");
  const [showError, setShowError] = useState(false);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    name: "",
    image: {},
  });

  // INVOKE
  const dispatch = useDispatch();

  // GET UNITS
  useEffect(() => {
    dispatch(getUnits({ page, perPage, search }));
  }, [page, perPage, search]);

  // GET UNIT
  const getUnitHandler = (unitId) => {
    dispatch(getUnit(unitId));
  };

  // CREATE UNIT
  const createUnitHandler = (e) => {
    e.preventDefault();
    if (!name) {
      setShowError(true);
    } else {
      dispatch(
        createUnit({ data: { name }, query: { page, perPage, search } })
      );
    }
  };

  // DELETE UNIT
  const deleteUnitHandler = (unitId) => {
    dispatch(setCurrentUnit(unitId));
    dispatch(
      deleteUnit({
        data: unitId,
        query: { page, perPage, search },
      })
    );
  };

  // GET STORE DATA
  const {
    loading,
    units,
    unit,
    errorMsg,
    successMsg,
    totalUnit,
    loadingUnit,
    loadingDelete,
    currentUnit,
    loadingUpdateUnit,
    loadingUnitSingle,
  } = useSelector((store) => store.unit);

  // SET EDIT DATA
  useEffect(() => {
    setState({
      name: unit.name || "",
    });
  }, [unit]);

  // UPDATE UNIT
  const updateUnitHandler = (e) => {
    e.preventDefault();
    if (state.name === "") {
      toast.error("Unit name required");
    } else {
      dispatch(
        updateUnit({
          data: { name: state.name },
          unitId: unit?._id,
          query: { page, perPage, search },
        })
      );
    }
  };

  // SHOW TOAST NOTIFICATION
  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg);
      dispatch(clearMsg());
    }
    if (successMsg) {
      setName("");
      setOpen(false);
      toast.success(successMsg);
      dispatch(clearMsg());
    }
  }, [errorMsg, successMsg]);

  return (
    <Box>
      {/* BREADCUMB */}
      <BreadCumb data={data} />

      {/* UNIT TABLE */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "column", md: "row" }}
        justifyContent="space-between"
        mt={2}
        gap={4}
      >
        {/* UNIT LIST */}
        <Box bgcolor="#fff" py={2} flex={0.7} px={2}>
          {/* HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={{ xs: 1 }}
            bgcolor="#fff"
          >
            <FormControl sx={{ maxWidth: "150px" }}>
              <FormLabel>Search</FormLabel>
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setSearch("")}>
                        {search && <Close />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ minWidth: "100px" }}>
              <FormLabel id="demo-simple-select-label">Per Page</FormLabel>
              <Select
                size="small"
                value={perPage}
                onChange={(e) => setPerPage(e.target.value)}
              >
                {[5, 10, 20].map((v) => (
                  <MenuItem value={v} key={v}>
                    {v}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* CATEGORY LIST */}
          <Box flex={0.7} bgcolor="#fff" mt={2}>
            {loadingUnit ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight={325}
              >
                <ClipLoader
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
                        Name
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontWeight: "bold", padding: { xs: "10px 2px" } }}
                      >
                        Members
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
                    {units &&
                      units.map((unit, i) => (
                        <TableRow key={i}>
                          <TableCell
                            align="center"
                            sx={{ padding: "10px 2px" }}
                          >
                            {i + 1}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ padding: "10px 2px" }}
                          >
                            {unit?.name}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ padding: "10px 2px" }}
                          >
                            {unit?.members?.length}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ padding: "10px 2px" }}
                          >
                            <Box display="flex" justifyContent="center">
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setOpen(true);
                                  getUnitHandler(unit?._id);
                                }}
                              >
                                <Edit fontSize="small" color="warning" />
                              </IconButton>
                              <Box
                                sx={{
                                  position: "relative",
                                  width: "30px",
                                  height: "30px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <IconButton
                                  onClick={() => deleteUnitHandler(unit?._id)}
                                >
                                  <Delete color="error" />
                                </IconButton>
                                {loadingDelete && currentUnit === unit?._id ? (
                                  <CircularProgress
                                    size={30}
                                    sx={{
                                      color: red[500],
                                      position: "absolute",
                                      top: 0,
                                      left: 0,
                                      zIndex: 1,
                                    }}
                                  />
                                ) : null}
                              </Box>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>

          {/* NOT FOUND */}
          {totalUnit === 0 && !loadingUnit ? (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              minHeight="20vh"
            >
              <Typography fontSize={20} fontWeight={700} color={grey[600]}>
                Unit Not Found
              </Typography>
            </Box>
          ) : null}

          {/* PAGINATION */}
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Pagination
              color="primary"
              count={Math.ceil(totalUnit / perPage)}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          </Box>
        </Box>

        {/* ADD Unit */}
        <Box flex={0.3} bgcolor="#fff" p={2} height="100%">
          <form onSubmit={(e) => createUnitHandler(e)}>
            <Typography fontSize={20} fontWeight={600} color={grey[700]}>
              Add Unit
            </Typography>
            <Divider />
            <FormControl fullWidth sx={{ my: 2 }}>
              <FormLabel>Unit Name</FormLabel>
              <TextField
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <FormHelperText error>
                {showError && name === "" ? "required" : null}
              </FormHelperText>
            </FormControl>

            {/* BUTTON */}
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<Send />}
              variant="contained"
              color="warning"
              fullWidth
              sx={{ mt: 2 }}
              type="submit"
            >
              Create
            </LoadingButton>
          </form>
        </Box>
      </Box>

      {/* EDIT MODAL */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Unit</DialogTitle>
        <DialogContent>
          {loadingUnitSingle ? (
            <Box display="flex" justifyContent="center">
              <ClipLoader
                color="green"
                loading={true}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </Box>
          ) : (
            <form onSubmit={(e) => updateUnitHandler(e)}>
              <Divider />
              <FormControl fullWidth sx={{ my: 2 }}>
                <FormLabel>Unit Name</FormLabel>
                <TextField
                  onChange={(e) => setState({ ...state, name: e.target.value })}
                  value={state.name}
                />
              </FormControl>
              {/* BUTTON */}
              <LoadingButton
                loading={loadingUpdateUnit}
                loadingPosition="start"
                startIcon={<Update />}
                variant="contained"
                color="warning"
                fullWidth
                sx={{ mt: 2 }}
                type="submit"
              >
                Update
              </LoadingButton>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Unit;
