import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { badges, memberTypes, roles, sectionTypes } from "../../../utills";
import { useDispatch, useSelector } from "react-redux";
import { getUnits } from "../../../store/reducers/unit";

const ScoutInfo = ({ handleBack, handleNext }) => {
  const [scoutPriority, setScoutPriority] = useState("forMember");
  const [experiences, setexperiences] = useState([]);
  const [date, setDate] = useState(dayjs("2022-04-17"));
  const [memberType, setMemberType] = useState("");
  const [sectionType, setSectionType] = useState("");
  const [scoutBadge, setScoutBadge] = useState("");
  const [scoutRole, setScoutRole] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [division, setDivision] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [unit, setUnit] = useState("");

  const dispatch = useDispatch();

  // GET ALL UNITS
  useEffect(() => {
    dispatch(
      getUnits({
        page: 1,
        perPage: 100,
        search: "",
      })
    );
  }, []);

  const { units } = useSelector((state) => state.unit);

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
    priority: "forMember",
    experience: "",
    joinDate: "",
    memberType: "",
    scoutSectionType: "",
    scoutBadge: "",
    scoutRole: "",
    scoutRegion: "",
    scoutDistrict: "",
    scoutUpazilla: "",
    unit: "",
    presentInstitute: "",
    presentClass: "",
    presentRoll: "",
    personalOrganization: "",
    presentDesignation: "",
  };

  const handleCheckboxToggle = (value) => {
    if (experiences.includes(value)) {
      setexperiences(experiences.filter((item) => item !== value));
    } else {
      setexperiences([...experiences, value]);
    }
  };

  // FORMIK FORM VALIDATION
  const validationSchema = Yup.object({
    joinDate: Yup.string().required("required"),
    memberType: Yup.string().required("required"),
    scoutSectionType: Yup.string().required("required"),
    scoutRegion: Yup.string().required("required"),
    scoutDistrict: Yup.string().required("required"),
    unit: Yup.string().required("required"),
  });

  // FORMIK SUBMIT
  const onSubmit = async (values) => {
    const prev = JSON.parse(localStorage.getItem("application"));
    localStorage.setItem(
      "application",
      JSON.stringify({ ...prev, ...values, experience: experiences })
    );
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
          <Field name="priority">
            {({ form }) => (
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={scoutPriority}
                  onChange={(e) => {
                    setScoutPriority(e.target.value);
                    form.setFieldValue("priority", e.target.value);
                  }}
                  row
                >
                  <FormControlLabel
                    value="forMember"
                    control={<Radio />}
                    label="For Scouts member"
                  />
                  <FormControlLabel
                    value="interestMember"
                    control={<Radio />}
                    label="For interested to be scouts member"
                  />
                </RadioGroup>
              </FormControl>
            )}
          </Field>

          <Typography
            fontSize={18}
            mt={2}
            fontWeight={600}
            fontStyle="italic"
            color={grey[700]}
          >
            Experience
          </Typography>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={experiences.includes("cubScouts")}
                  onChange={() => handleCheckboxToggle("cubScouts")}
                />
              }
              label="Cub Scouts Experience"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={experiences.includes("scouts")}
                  onChange={() => handleCheckboxToggle("scouts")}
                />
              }
              label="Scouts Experience"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={experiences.includes("roverScouts")}
                  onChange={() => handleCheckboxToggle("roverScouts")}
                />
              }
              label="Rover Scouts Experience"
            />
          </FormGroup>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              justifyContent: "space-between",
              gap: 2,
              mt: 2,
            }}
          >
            <Field name="joinDate">
              {({ form }) => (
                <FormControl fullWidth>
                  <FormLabel>Scout Join Date</FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["DatePicker", "DatePicker"]}
                      sx={{ paddingTop: "0px" }}
                    >
                      <DatePicker
                        value={date}
                        onChange={(newValue) => {
                          setDate(newValue);
                          form.setFieldValue("joinDate", newValue.$d);
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
                    {form.touched.joinDate && form.errors.joinDate
                      ? form.errors.joinDate
                      : null}
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Field name="memberType">
              {({ form }) => (
                <FormControl fullWidth>
                  <FormLabel>Member Type</FormLabel>
                  <Select
                    value={memberType}
                    label="Member Type"
                    onChange={(e) => {
                      setMemberType(e.target.value);
                      form.setFieldValue("memberType", e.target.value);
                    }}
                  >
                    {memberTypes.map((rel, i) => (
                      <MenuItem key={i} value={rel.value}>
                        {rel.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>
                    {form.touched.memberType && form.errors.memberType
                      ? form.errors.memberType
                      : null}
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Field name="scoutSectionType">
              {({ form }) => (
                <FormControl fullWidth>
                  <FormLabel>Scout Section Type</FormLabel>
                  <Select
                    value={sectionType}
                    label="Religion"
                    onChange={(e) => {
                      setSectionType(e.target.value);
                      form.setFieldValue("scoutSectionType", e.target.value);
                    }}
                  >
                    {memberType !== "" &&
                      sectionTypes.map((rel, i) => (
                        <MenuItem key={i} value={rel.value}>
                          {rel.label}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText error>
                    {form.touched.scoutSectionType &&
                    form.errors.scoutSectionType
                      ? form.errors.scoutSectionType
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
            <Field name="scoutBadge">
              {({ form }) => (
                <FormControl fullWidth>
                  <FormLabel>Scout Badge</FormLabel>
                  <Select
                    value={scoutBadge}
                    label="Scout Badge"
                    onChange={(e) => {
                      setScoutBadge(e.target.value);
                      form.setFieldValue("scoutBadge", e.target.value);
                    }}
                  >
                    {badges.map((rel, i) => (
                      <MenuItem key={i} value={rel.value}>
                        {rel.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Field>
            <Field name="scoutRole">
              {({ form }) => (
                <FormControl fullWidth>
                  <FormLabel>Scout Role</FormLabel>
                  <Select
                    value={scoutRole}
                    label="Scout Role"
                    onChange={(e) => {
                      setScoutRole(e.target.value);
                      form.setFieldValue("scoutRole", e.target.value);
                    }}
                  >
                    {roles.map((rel, i) => (
                      <MenuItem key={i} value={rel.value}>
                        {rel.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Field>
            <Field name="scoutRegion">
              {({ form }) => (
                <FormControl fullWidth>
                  <FormLabel>Scout Region</FormLabel>
                  <Select
                    value={division}
                    label="Scout Region"
                    onChange={(e) => {
                      setDivision(e.target.value);
                      form.setFieldValue("scoutRegion", e.target.value);
                    }}
                  >
                    {divisions &&
                      divisions.map((div, i) => (
                        <MenuItem key={i} value={div.division}>
                          {`Bangladesh Scout, ${div?.division} Region`}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText error>
                    {form.touched.scoutRegion && form.errors.scoutRegion
                      ? form.errors.scoutRegion
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
            <Field name="scoutDistrict">
              {({ form }) => (
                <FormControl fullWidth>
                  <FormLabel>Scout District</FormLabel>
                  <Select
                    value={district}
                    label="Scout District"
                    onChange={(e) => {
                      setDistrict(e.target.value);
                      form.setFieldValue("scoutDistrict", e.target.value);
                    }}
                  >
                    {districts &&
                      districts.map((dis, i) => (
                        <MenuItem key={i} value={dis.district}>
                          {`Bangladesh Scout, ${dis?.district} District`}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText error>
                    {form.touched.scoutDistrict && form.errors.scoutDistrict
                      ? form.errors.scoutDistrict
                      : null}
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Field name="scoutUpazilla">
              {({ form, field }) => (
                <FormControl fullWidth>
                  <FormLabel>Scout Upazilla</FormLabel>
                  <TextField {...field} />
                </FormControl>
              )}
            </Field>
            <Field name="unit">
              {({ form, field }) => (
                <FormControl fullWidth>
                  <FormLabel>Scout Unit</FormLabel>
                  <Select
                    value={unit}
                    label="Scout Unit"
                    onChange={(e) => {
                      setUnit(e.target.value);
                      form.setFieldValue("unit", e.target.value);
                    }}
                  >
                    {units &&
                      units.map((unit, i) => (
                        <MenuItem key={i} value={unit.name}>
                          {unit.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText error>
                    {form.touched.unit && form.errors.unit
                      ? form.errors.unit
                      : null}
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
          </Box>

          <Typography
            fontSize={18}
            mt={2}
            fontWeight={600}
            fontStyle="italic"
            color={grey[700]}
          >
            Others Information
          </Typography>
          {memberType === "new" || memberType === "scout" ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "column", md: "row" },
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Field name="presentInstitute">
                {({ form, field }) => (
                  <FormControl fullWidth>
                    <FormLabel>Present Institute</FormLabel>
                    <TextField {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="presentClass">
                {({ form, field }) => (
                  <FormControl fullWidth>
                    <FormLabel>Present Class</FormLabel>
                    <TextField {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="presentRoll">
                {({ form, field }) => (
                  <FormControl fullWidth>
                    <FormLabel>Present Roll</FormLabel>
                    <TextField type="number" {...field} />
                  </FormControl>
                )}
              </Field>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "column", md: "row" },
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Field name="personalOrganization">
                {({ form, field }) => (
                  <FormControl fullWidth>
                    <FormLabel>
                      Personal Organization (Office/Business) Name
                    </FormLabel>
                    <TextField {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="presentDesignation">
                {({ form, field }) => (
                  <FormControl fullWidth>
                    <FormLabel>Present Designation</FormLabel>
                    <TextField {...field} />
                  </FormControl>
                )}
              </Field>
            </Box>
          )}

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

export default ScoutInfo;
