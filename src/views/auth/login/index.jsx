import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import {
  Box,
  Button,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  Email,
  Key,
  Send,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { green, grey } from "@mui/material/colors";

import logo from "../../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { clearMsg, loginUser } from "../../../store/reducers/auth";

const Login = () => {
  // STATE
  const [showPassword, setShowPassword] = useState(false);

  // INVOKE
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // FORMIK STATE
  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  // FORMIK FORM VALIDATION
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    remember: Yup.boolean(),
  });

  // FORMIK SUBMIT
  const onSubmit = (values) => {
    dispatch(loginUser(values));
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
      navigate("/");
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
          <Box
            sx={{
              width: "calc(100% - 50px)",
              maxWidth: "400px",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
            boxShadow={3}
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
                Login in to Dashboard
              </Typography>

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

              {/* PASSWORD */}
              <Field name="password">
                {({ form, field }) => (
                  <FormControl fullWidth sx={{ mt: 2 }}>
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

              {/* FORGOT PASSWORD */}
              <Box mt={2} display="flex" justifyContent="justify-between">
                <Field name="remember">
                  {({ form }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) =>
                            form.setFieldValue("remember", e.target.checked)
                          }
                        />
                      }
                      label="Remember me"
                    />
                  )}
                </Field>
                <Button
                  type="text"
                  sx={{
                    bgcolor: "transparent",
                    ml: "auto",
                    fontSize: 14,
                    "&:hover": {
                      bgcolor: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                  LinkComponent={Link}
                  to="/forgot-password"
                >
                  Lost Password?
                </Button>
              </Box>

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
                Login
              </LoadingButton>

              {/* RECCOMENDATION */}
              <Divider sx={{ my: 2 }} />
              <Box display="flex" alignItems="center">
                <Typography color={grey[700]}>
                  Don't have an account?
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
                  to="/register"
                >
                  Register
                </Button>
              </Box>
            </CardContent>
          </Box>
        </Box>
      </Form>
    </Formik>
  );
};

export default Login;
