import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PersonalInfo from "./PersonalInfo";
import { Send } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import Address from "./Address";
import ScoutInfo from "./ScoutInfo";
import Photo from "./Photo";

const steps = ["Personal Info", "Address", "Scout Info", "Photo"];

const Apply = () => {
  const [activeStep, setActiveStep] = useState(0);

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Box bgcolor="#fff" p={2}>
      <Box border="1px solid #BFD4DE" bgcolor="#EBF6FB" p={2}>
        <Typography fontSize={20} fontWeight={600} color="#5B6A8E" py={1}>
          Thank you for registration.
        </Typography>
        <Typography fontSize={14} color="#246A8E">
          To be an online scout member please provide your personal and scout
          information below.
        </Typography>
      </Box>

      <Box sx={{ width: "100%", mt: 3, bgcolor: grey[200], py: 2 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      {activeStep === 0 && <PersonalInfo handleNext={handleNext} />}
      {activeStep === 1 && (
        <Address handleBack={handleBack} handleNext={handleNext} />
      )}
      {activeStep === 2 && (
        <ScoutInfo handleBack={handleBack} handleNext={handleNext} />
      )}
      {activeStep === 3 && (
        <Photo handleBack={handleBack} handleNext={handleNext} />
      )}
      <Outlet />
    </Box>
  );
};

export default Apply;
