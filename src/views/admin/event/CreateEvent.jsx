import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import {
  Box,
  Chip,
  Divider,
  Fab,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
  TextareaAutosize,
  styled,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { blue, grey } from "@mui/material/colors";

import BreadCumb from "./../../../components/BreadCumb";
import { Close, Send, Upload } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { clearMsg, createEvent } from "../../../store/reducers/event";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// BREADCUMD DATA
const data = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    label: "Create",
    path: "/admin/event/create",
  },
];

const Textarea = styled(TextareaAutosize)(
  ({ theme }) => `
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: transparent;
    border-radius: 5px;
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }`
);

const CreateEvent = () => {
  const [eventStart, setEventStart] = useState(dayjs("2024-02-17"));
  const [eventEnd, setEventEnd] = useState(dayjs("2024-02-17"));
  const [registrationStart, setRegistrationStart] = useState(
    dayjs("2024-02-17")
  );
  const [registrationEnd, setRegistrationEnd] = useState(dayjs("2024-02-17"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // HANDLE FILE CHANGE
  const handleFileChange = (e, form) => {
    const files = e.target.files;
    const tempImages = [];
    for (let file of files) {
      const isExists = form.values.images.find((img) => img.name === file.name);
      if (isExists) {
        return tempImages;
      } else {
        tempImages.push(file);
      }
    }
    form.setFieldValue("images", [...form.values.images, ...tempImages]);
  };

  // HANDLE DELETE FILE
  const handleFileDelete = (name, form) => {
    const updatedImages = form.values.images.filter(
      (image) => image.name !== name
    );
    form.setFieldValue("images", updatedImages);
  };

  // FORMIK STATE
  const initialValues = {
    title: "",
    vanue: "",
    details: "",
    eventStart: "",
    eventEnd: "",
    registrationStart: "",
    registrationEnd: "",
    images: [],
  };

  // FORMIK FORM VALIDATION
  const validationSchema = Yup.object({
    title: Yup.string().required("required"),
    vanue: Yup.string().required("required"),
    details: Yup.string().required("required"),
    eventStart: Yup.date().required("required"),
    eventEnd: Yup.date().required("required"),
    registrationStart: Yup.date().required("required"),
    registrationEnd: Yup.date().required("required"),
    images: Yup.array()
      .required("required")
      .min(1, "At least one size is required"),
  });

  // FORMIK SUBMIT
  const onSubmit = (values) => {
    const { images, ...rest } = values;
    const formData = new FormData();
    for (let key in rest) {
      formData.append(key, rest[key]);
    }
    for (let image of images) {
      formData.append("images", image);
    }
    dispatch(createEvent(formData));
  };

  const { loading, successMsg, errorMsg } = useSelector((state) => state.event);

  // SHOW TOAST MESSAGE
  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg);
      dispatch(clearMsg());
    }
    if (successMsg) {
      toast.success(successMsg);
      navigate("/admin/event/list");
      dispatch(clearMsg());
    }
  }, [errorMsg, successMsg]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <Box>
          <BreadCumb data={data} />

          <Box p={2} mt={2} bgcolor="#fff">
            <Box
              sx={{ width: "calc(100% - 20px)", maxWidth: "900px", mx: "auto" }}
            >
              <Divider>
                <Chip
                  variant="contained"
                  color="warning"
                  label="Create a Event"
                />
              </Divider>

              <Box
                display="flex"
                justifyContent="center"
                flexDirection={{ xs: "column", sm: "column", md: "row" }}
                gap={2}
                mt={2}
              >
                <Field name="title">
                  {({ form, field }) => (
                    <FormControl fullWidth>
                      <FormLabel>Event Title</FormLabel>
                      <TextField type="text" {...field} />
                      <FormHelperText error>
                        {form.touched.title && form.errors.title
                          ? "required"
                          : null}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>
                <Field name="vanue">
                  {({ form, field }) => (
                    <FormControl fullWidth>
                      <FormLabel>Event Vanue</FormLabel>
                      <TextField type="text" {...field} />
                      <FormHelperText error>
                        {form.touched.vanue && form.errors.vanue
                          ? "required"
                          : null}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>
              </Box>

              <Box
                display="flex"
                justifyContent="center"
                flexDirection={{ xs: "column", sm: "column", md: "row" }}
                gap={2}
                mt={2}
              >
                <Field name="details">
                  {({ form, field }) => (
                    <FormControl fullWidth>
                      <FormLabel>Details</FormLabel>
                      <Textarea
                        aria-label="minimum height"
                        minRows={3}
                        sx={{ width: "100%" }}
                        {...field}
                      />
                      <FormHelperText error>
                        {form.touched.details && form.errors.details
                          ? "required"
                          : null}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>
              </Box>

              <Box
                display="flex"
                justifyContent="center"
                flexDirection={{ xs: "column", sm: "column", md: "row" }}
                gap={2}
                mt={2}
              >
                <Field name="eventStart">
                  {({ form }) => (
                    <FormControl fullWidth>
                      <FormLabel>Event Start</FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={["DatePicker"]}
                          sx={{ width: "100%" }}
                        >
                          <DatePicker
                            sx={{ width: "100%" }}
                            value={eventStart}
                            onChange={(newValue) => {
                              setEventStart(newValue);
                              form.setFieldValue("eventStart", newValue.$d);
                            }}
                            views={["year", "month", "day"]}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <FormHelperText error>
                        {form.touched.eventStart && form.errors.eventStart
                          ? "required"
                          : null}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>
                <Field name="eventEnd">
                  {({ form }) => (
                    <FormControl fullWidth>
                      <FormLabel>Event End</FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={["DatePicker"]}
                          sx={{ width: "100%" }}
                        >
                          <DatePicker
                            sx={{ width: "100%" }}
                            value={eventEnd}
                            onChange={(newValue) => {
                              setEventEnd(newValue);
                              form.setFieldValue("eventEnd", newValue.$d);
                            }}
                            views={["year", "month", "day"]}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <FormHelperText error>
                        {form.touched.eventEnd && form.errors.eventEnd
                          ? "required"
                          : null}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>
              </Box>

              <Box
                display="flex"
                justifyContent="center"
                flexDirection={{ xs: "column", sm: "column", md: "row" }}
                gap={2}
                mt={2}
              >
                <Field name="registrationStart">
                  {({ form }) => (
                    <FormControl fullWidth>
                      <FormLabel>Registration Start</FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={["DatePicker"]}
                          sx={{ width: "100%" }}
                        >
                          <DatePicker
                            sx={{ width: "100%" }}
                            value={registrationStart}
                            onChange={(newValue) => {
                              setRegistrationStart(newValue);
                              form.setFieldValue(
                                "registrationStart",
                                newValue.$d
                              );
                            }}
                            views={["year", "month", "day"]}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <FormHelperText error>
                        {form.touched.registrationStart &&
                        form.errors.registrationStart
                          ? "required"
                          : null}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>
                <Field name="registrationEnd">
                  {({ form }) => (
                    <FormControl fullWidth>
                      <FormLabel>Registration End</FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={["DatePicker"]}
                          sx={{ width: "100%" }}
                        >
                          <DatePicker
                            sx={{ width: "100%" }}
                            value={registrationEnd}
                            onChange={(newValue) => {
                              setRegistrationEnd(newValue);
                              form.setFieldValue(
                                "registrationEnd",
                                newValue.$d
                              );
                            }}
                            views={["year", "month", "day"]}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <FormHelperText error>
                        {form.touched.registrationEnd &&
                        form.errors.registrationEnd
                          ? "required"
                          : null}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>
              </Box>

              <Field name="images">
                {({ form, field }) => (
                  <Box
                    mt={3}
                    display="flex"
                    flexWrap="wrap"
                    flexDirection={{ xs: "column", sm: "column", md: "row" }}
                    gap={2}
                  >
                    {form.values.images &&
                      form.values.images.map((img, i) => (
                        <Box
                          key={i}
                          border="1px solid grey"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          position="relative"
                          width={{ xs: 120, sm: 150 }}
                          height={{ xs: 120, sm: 150 }}
                        >
                          <img
                            src={URL.createObjectURL(img)}
                            style={{ height: "100px", width: "100%" }}
                          />
                          <Fab
                            color="error"
                            size="small"
                            sx={{ position: "absolute", right: 0, top: 0 }}
                            onClick={() => handleFileDelete(img.name, form)}
                          >
                            <Close />
                          </Fab>
                        </Box>
                      ))}
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width={{ xs: 120, sm: 150 }}
                      height={{ xs: 120, sm: 150 }}
                      border="1px dashed grey"
                      component="label"
                      htmlFor="files"
                    >
                      <Upload />
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        id="files"
                        onChange={(e) => handleFileChange(e, form)}
                      />
                    </Box>
                    <FormHelperText error>
                      {form.touched.images && form.errors.images
                        ? "required"
                        : null}
                    </FormHelperText>
                  </Box>
                )}
              </Field>

              <LoadingButton
                loading={loading}
                loadingPosition="start"
                startIcon={<Send />}
                variant="contained"
                color="warning"
                sx={{ mt: 2 }}
                type="submit"
              >
                Create
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Form>
    </Formik>
  );
};

export default CreateEvent;
