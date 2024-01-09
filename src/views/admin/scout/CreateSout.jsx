import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PersonalInfo from "../../scout/apply/PersonalInfo";
import { grey } from "@mui/material/colors";
import Address from "../../scout/apply/Address";
import ScoutInfo from "../../scout/apply/ScoutInfo";
import Photo from "../../scout/apply/Photo";

const steps = ["Personal Info", "Address", "Scout Info", "Photo"];

const CreateScout = () => {
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

export default CreateScout;
