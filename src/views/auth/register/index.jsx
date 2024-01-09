import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Call,
  Email,
  Key,
  Person,
  Send,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { green, grey } from "@mui/material/colors";

import logo from "../../../assets/logo.png";
import { clearMsg, createUser } from "../../../store/reducers/auth";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Register = () => {
  // STATE
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState(dayjs("2022-04-17"));
  const [gender, setGender] = useState("");

  const isMobile = useMediaQuery("(max-width:600px)");

  // INVOKE
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // HANDLE DATE CHANGE
  const handleDateChange = (form, date) => {
    form.setFieldValue("dob", date);
  };

  // FORMIK STATE
  const initialValues = {
    name: "",
    email: "",
    password: "",
    dob: "",
    mobile: "",
    cMobile: "",
    gender: "",
  };

  // FORMIK FORM VALIDATION
  const validationSchema = Yup.object({
    name: Yup.string().min(4, "At least 4 characters").required("Required"),
    email: Yup.string().required("Required").email("Invalid email format"),
    password: Yup.string()
      .required("Required")
      .min(6, "Password must be at least 6 characters long"),
    dob: Yup.date().required("Required"),
    mobile: Yup.number()
      .required("Required")
      .min(11, "Invalid Mobile Number")
      .test("mobiles-match", "Mobile numbers must match", function (value) {
        return value === this.parent.cMobile;
      }),
    cMobile: Yup.number()
      .required("Required")
      .min(11, "Invalid Mobile Number")
      .test("mobiles-match", "Mobile numbers must match", function (value) {
        return value === this.parent.mobile;
      }),
    gender: Yup.string().required("Required"),
  });

  // FORMIK SUBMIT
  const onSubmit = (values) => {
    dispatch(createUser({ ...values, phone: values.cMobile }));
  };

  // GET STORE DATA
  const { loading, errorMsg, successMsg } = useSelector((store) => store.auth);

  // SHOW TOAST MESSAGE
  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg);
      dispatch(clearMsg());
    }
    if (successMsg) {
      toast.success(successMsg);
      navigate("/login");
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
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              width: "calc(100% - 20px)",
              maxWidth: "700px",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              mt: 3,
            }}
            elevation={3}
          >
            <CardContent>
              {/* HEADER */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
              >
                <img src={logo} alt="Logo" style={{ height: "50px" }} />

                <Box>
                  <Typography
                    fontWeight="bold"
                    fontSize={25}
                    color={grey[800]}
                    sx={{
                      background:
                        "linear-gradient(90deg, rgba(243,243,245,1) 0%, rgba(96,190,16,1) 0%, rgba(0,255,226,1) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                      display: "inline-block",
                    }}
                  >
                    APBN
                  </Typography>
                  <Typography
                    textAlign="center"
                    fontSize={18}
                    fontWeight={700}
                    color={green[700]}
                  >
                    Scout Dashboard
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Typography
                textAlign="center"
                my={1}
                fontSize={18}
                fontWeight={700}
                color={grey[700]}
              >
                Create an account
              </Typography>

              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row", md: "row" }}
                gap={2}
              >
                {/* NAME */}
                <Field name="name">
                  {({ form, field }) => (
                    <FormControl fullWidth>
                      <FormLabel>Name</FormLabel>
                      <TextField
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ backgroundColor: "transparent" }}
                        type="text"
                        {...field}
                      />
                      <FormHelperText error>
                        {form.touched.name && form.errors.name
                          ? form.errors.name
                          : null}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>

                {/* EMAIL */}
                <Field name="email">
                  {({ form, field }) => (
                    <FormControl fullWidth>
                      <FormLabel>Email</FormLabel>
                      <TextField
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ backgroundColor: "transparent" }}
                        type="text"
                        name="email"
                        {...field}
                        autoComplete="username"
                      />
                      <FormHelperText error>
                        {form.touched.email && form.errors.email
                          ? form.errors.email
                          : null}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row", md: "row" }}
                gap={2}
              >
                {/* PASSWORD */}
                <Field name="password">
                  {({ form, field }) => (
                    <FormControl fullWidth>
                      <FormLabel>Password</FormLabel>
                      <TextField
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Key />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{ backgroundColor: "transparent" }}
                        type={showPassword ? "text" : "password"}
                        {...field}
                        autoComplete="current-password"
                      />
                      <FormHelperText error>
                        {form.touched.password && form.errors.password
                          ? form.errors.password
                          : null}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>
                {/* Date of Birth */}
                <Field name="dob">
                  {({ form }) => (
                    <FormControl fullWidth>
                      <FormLabel>Date of Birth</FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={["DatePicker", "DatePicker"]}
                          sx={{ paddingTop: "0px" }}
                        >
                          <DatePicker
                            value={value}
                            onChange={(newValue) => {
                              setValue(newValue);
                              handleDateChange(form, newValue);
                            }}
                            sx={{
                              width: "100%",
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
                display="flex"
                flexDirection={{ xs: "column", sm: "row", md: "row" }}
                gap={2}
              >
                {/* Mobile */}
                <Field name="mobile">
                  {({ form, field }) => (
                    <Field name="mobile">
                      {({ form, field }) => (
                        <FormControl fullWidth>
                          <FormLabel>Mobile</FormLabel>
                          <TextField
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Call />
                                </InputAdornment>
                              ),
                            }}
                            sx={{ backgroundColor: "transparent" }}
                            type="number"
                            name="mobile"
                            {...field}
                          />
                          <FormHelperText error>
                            {form.touched.mobile && form.errors.mobile
                              ? form.errors.mobile
                              : null}
                          </FormHelperText>
                        </FormControl>
                      )}
                    </Field>
                  )}
                </Field>

                {/* Confirm Mobile */}
                <Field name="cMobile">
                  {({ form }) => (
                    <Field name="cMobile">
                      {({ form, field }) => (
                        <FormControl fullWidth>
                          <FormLabel>Confirm Mobile</FormLabel>
                          <TextField
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Call />
                                </InputAdornment>
                              ),
                            }}
                            sx={{ backgroundColor: "transparent" }}
                            type="cMobile"
                            name="email"
                            {...field}
                          />
                          <FormHelperText error>
                            {form.touched.cMobile && form.errors.cMobile
                              ? form.errors.cMobile
                              : null}
                          </FormHelperText>
                        </FormControl>
                      )}
                    </Field>
                  )}
                </Field>
              </Box>

              {/* Radio */}
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row", md: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center", md: "center" }}
                mt={1}
              >
                <Field name="gender">
                  {({ form }) => (
                    <FormControl>
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

                {/* BUTTON */}
                <LoadingButton
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<Send />}
                  variant="contained"
                  color="warning"
                  type="submit"
                  fullWidth={isMobile ? true : false}
                >
                  Register
                </LoadingButton>
              </Box>

              {/* RECCOMENDATION */}
              <Divider sx={{ my: 2 }} />
              <Box display="flex" alignItems="center">
                <Typography color={grey[700]}>
                  Already have an account?
                </Typography>
                <Button
                  type="text"
                  sx={{
                    bgcolor: "transparent",
                    "&:hover": {
                      bgcolor: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Form>
    </Formik>
  );
};

export default Register;
