import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const Address = ({ handleNext, handleBack }) => {
  const [divisions, setDivisions] = useState([]);
  const [division, setDivision] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");

  // get all divisions
  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://bdapi.p.rapidapi.com/v1.1/divisions",
        headers: {
          "X-RapidAPI-Key":
            "3cf92c7a23msh629dd8c92371568p184e13jsn31a73a90a274",
          "X-RapidAPI-Host": "bdapi.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setDivisions(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // get all districkt
  useEffect(() => {
    if (division) {
      const fetchData = async () => {
        const options = {
          method: "GET",
          url: `https://bdapi.p.rapidapi.com/v1.1/division/${division}`,
          headers: {
            "X-RapidAPI-Key":
              "3cf92c7a23msh629dd8c92371568p184e13jsn31a73a90a274",
            "X-RapidAPI-Host": "bdapi.p.rapidapi.com",
          },
        };

        try {
          const response = await axios.request(options);
          setDistricts(response.data.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [division]);

  // formik state
  const initialValues = {
    villageHouseEnglish: "",
    villageHouseBangla: "",
    roadBlockSectorEnglish: "",
    roadBlockSectorBangla: "",
    division: "",
    district: "",
    thana: "",
    postCode: "",
  };

  // FORMIK FORM VALIDATION
  const validationSchema = Yup.object({
    villageHouseEnglish: Yup.string().required("required"),
    roadBlockSectorEnglish: Yup.string().required("required"),
    division: Yup.string().required("required"),
    district: Yup.string().required("required"),
    thana: Yup.string().required("required"),
  });

  // FORMIK SUBMIT
  const onSubmit = async (values) => {
    const prev = JSON.parse(localStorage.getItem("application"));
    localStorage.setItem("application", JSON.stringify({ ...prev, ...values }));
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
            <Field name="villageHouseEnglish">
              {({ form, field }) => (
                <FormControl fullWidth>
                  <FormLabel>Village Name/House No (English)</FormLabel>
                  <TextField {...field} />
                  <FormHelperText error>
                    {form.touched.villageHouseEnglish &&
                    form.errors.villageHouseEnglish
                      ? form.errors.villageHouseEnglish
                      : null}
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Field name="villageHouseBangla">
              {({ form, field }) => (
                <FormControl fullWidth>
                  <FormLabel>Village Name/House No (Bengali)</FormLabel>
                  <TextField {...field} />
                </FormControl>
              )}
            </Field>
            <Field name="roadBlockSectorEnglish">
              {({ form, field }) => (
                <FormControl fullWidth>
                  <FormLabel>Road/Block/Sector (English)</FormLabel>
                  <TextField {...field} />
                  <FormHelperText error>
                    {form.touched.roadBlockSectorEnglish &&
                    form.errors.roadBlockSectorEnglish
                      ? form.errors.roadBlockSectorEnglish
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
            <Field name="roadBlockSectorBangla">
              {({ form, field }) => (
                <FormControl fullWidth>
                  <FormLabel>Road/Block/Sector (Bengali)</FormLabel>
                  <TextField {...field} />
                </FormControl>
              )}
            </Field>
            <Field name="division">
              {({ form }) => (
                <FormControl fullWidth>
                  <FormLabel>Division</FormLabel>
                  <Select
                    label="Division"
                    onChange={(e) => {
                      setDivision(e.target.value);
                      form.setFieldValue("division", e.target.value);
                    }}
                    value={division}
                  >
                    {divisions &&
                      divisions.map((div, i) => (
                        <MenuItem key={i} value={div.division}>
                          {`${div?.division}`}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText error>
                    {form.touched.division && form.errors.division
                      ? form.errors.division
                      : null}
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Field name="district">
              {({ form }) => (
                <FormControl fullWidth>
                  <FormLabel>District</FormLabel>
                  <Select
                    label="District"
                    onChange={(e) => {
                      setDistrict(e.target.value);
                      form.setFieldValue("district", e.target.value);
                    }}
                    value={district}
                  >
                    {districts &&
                      districts.map((di, i) => (
                        <MenuItem key={i} value={di.district}>
                          {`${di?.district}`}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText error>
                    {form.touched.district && form.errors.district
                      ? form.errors.district
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
            <Field name="thana">
              {({ form, field }) => (
                <FormControl fullWidth>
                  <FormLabel>Thana</FormLabel>
                  <TextField {...field} />
                  <FormHelperText error>
                    {form.touched.thana && form.errors.thana
                      ? form.errors.thana
                      : null}
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Field name="postCode">
              {({ form, field }) => (
                <FormControl fullWidth>
                  <FormLabel>Post Code</FormLabel>
                  <TextField {...field} />
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
            <Button variant="outlined" color="warning" onClick={handleBack}>
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

export default Address;
