import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { bloodGroups, religions } from "../../../utills";
import { useLocation } from "react-router-dom";

const PersonalInfo = ({ handleNext }) => {
  const [date, setDate] = useState(dayjs("2022-04-17"));
  const [religion, setReligion] = useState("islam");
  const [bloodGroup, setBloodGroup] = useState("");
  const [gender, setGender] = useState("");

  const { state } = useLocation;

  // formik state
  const initialValues = {
    nameEnglish: "",
    nameBangla: "",
    dob: "",
    gender: "",
    fNameEnglish: "",
    fNameBangla: "",
    mNameEnglish: "",
    mNameBangla: "",
    phone: "",
    religion: "islam",
    email: "",
    bloodGroup: "",
  };

  // FORMIK FORM VALIDATION
  const validationSchema = Yup.object({
    nameEnglish: Yup.string().required("required"),
    nameBangla: Yup.string().required("required"),
    dob: Yup.string().required("required"),
    gender: Yup.string().required("required"),
    fNameEnglish: Yup.string().required("required"),
    mNameEnglish: Yup.string().required("required"),
    phone: Yup.string().required("required"),
    religion: Yup.string().required("required"),
  });

  // FORMIK SUBMIT
  const onSubmit = async (values) => {
    localStorage.setItem("application", JSON.stringify(values));
    handleNext();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <Box mt={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Field name="nameEnglish">
              {({ field, form }) => (
                <FormControl fullWidth>
                  <FormLabel>Full Name (English)</FormLabel>
                  <TextField {...field} />
                  <FormHelperText error>
                    {form.touched.nameEnglish && form.errors.nameEnglish
                      ? form.errors.nameEnglish
                      : null}
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Field name="nameBangla">
              {({ form, field }) => (
                <FormControl fullWidth>
                  <FormLabel>Full Name (Bengali)</FormLabel>
                  <TextField {...field} />
                  <FormHelperText error>
                    {form.touched.nameBangla && form.errors.nameBangla
                      ? form.errors.nameBangla
                      : null}
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Field name="dob">
              {({ form }) => (
                <FormControl fullWidth>
                  <FormLabel>Date Of Birth</FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["DatePicker", "DatePicker"]}
                      sx={{ paddingTop: "0px" }}
                    >
                      <DatePicker
                        value={date}
                        onChange={(newValue) => {
                          setDate(newValue);
                          form.setFieldValue("dob", newValue.$d);
                        }}
                        sx={{
                          width: "100%",
                          overflowY: "hidden",
                        }}
                        views={["year", "month", "day"]}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <FormHelperText error>
                    {form.touched.dob && form.errors.dob
                      ? form.errors.dob
                      : null}
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              justifyContent: "space-between",
              gap: 2,
              mt: 2,
            }}
          >
            <Field name="fNameEnglish">
              {({ form, field }) => (
                <FormControl fullWidth>
                  <FormLabel>Father's Name (English)</FormLabel>
                  <TextField {...field} />
                  <FormHelperText error>
                    {form.touched.fNameEnglish && form.errors.fNameEnglish
                      ? form.errors.fNameEnglish
                      : null}
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Field name="fNameBangla">
              {({ form, field }) => (
                <FormControl fullWidth>
                  <FormLabel>Father's Name (Bengali)</FormLabel>
                  <TextField {...field} />
                </FormControl>
              )}
            </Field>
            <Field name="phone">
              {({ form, field }) => (
                <FormControl fullWidth>
                  <FormLabel>Mobile No</FormLabel>
                  <TextField type="text" {...field} />
                  <FormHelperText error>
                    {form.touched.phone && form.errors.phone
                      ? form.errors.phone
                      : null}
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              justifyContent: "space-between",
              gap: 2,
              mt: 2,
            }}
          >
            <Field name="mNameEnglish">
              {({ form, field }) => (
                <FormControl fullWidth>
                  <FormLabel>Mother's Name (English)</FormLabel>
                  <TextField {...field} />
                  <FormHelperText error>
                    {form.touched.mNameEnglish && form.errors.mNameEnglish
                      ? form.errors.mNameEnglish
                      : null}
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Field name="mNameBangla">
              {({ form, field }) => (
                <FormControl fullWidth>
                  <FormLabel>Mother's Name (Bengali)</FormLabel>
                  <TextField {...field} />
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field, form }) => (
                <FormControl fullWidth>
                  <FormLabel>Email Address</FormLabel>
                  <TextField type="text" {...field} />
                </FormControl>
              )}
            </Field>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              justifyContent: "space-between",
              gap: 2,
              mt: 2,
            }}
          >
            <Field name="religion">
              {({ form }) => (
                <FormControl fullWidth>
                  <FormLabel>Religion</FormLabel>
                  <Select
                    value={religion}
                    label="Religion"
                    onChange={(e) => {
                      setReligion(e.target.value);
                      form.setFieldValue("religion", e.target.value);
                    }}
                  >
                    {religions.map((rel, i) => (
                      <MenuItem key={i} value={rel.value}>
                        {rel.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>
                    {form.touched.religion && form.errors.religion
                      ? form.errors.religion
                      : null}
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Field name="bloodGroup">
              {({ form }) => (
                <FormControl fullWidth>
                  <FormLabel>Blood Group</FormLabel>
                  <Select
                    value={bloodGroup}
                    label="Blood Group"
                    onChange={(e) => {
                      setBloodGroup(e.target.value);
                      form.setFieldValue("bloodGroup", e.target.value);
                    }}
                  >
                    {bloodGroups.map((rel, i) => (
                      <MenuItem key={i} value={rel.value}>
                        {rel.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Field>
            <Field name="gender">
              {({ form }) => (
                <FormControl fullWidth>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup
                    defaultValue="male"
                    name="controlled-radio-buttons-group"
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                      form.setFieldValue("gender", e.target.value);
                    }}
                    row
                  >
                    <FormControlLabel
                      value="male"
                      label="Male"
                      control={<Radio />}
                    />
                    <FormControlLabel
                      value="female"
                      label="Female"
                      control={<Radio />}
                    />

                    <FormControlLabel
                      value="other"
                      label="Other"
                      control={<Radio />}
                    />
                  </RadioGroup>
                  <FormHelperText error>
                    {form.touched.gender && form.errors.gender
                      ? form.errors.gender
                      : null}
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
          </Box>

          <Box
            mt={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button variant="outlined" disabled color="info">
              Back
            </Button>
            <Button variant="contained" color="info" type="submit">
              Next
            </Button>
          </Box>
        </Box>
      </Form>
    </Formik>
  );
};

export default PersonalInfo;
