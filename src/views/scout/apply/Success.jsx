import React from "react";
import { Link } from "react-router-dom";

import { Box, Button, Card, Fab, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { CheckCircleOutline } from "@mui/icons-material";

import FlexCenter from "../../../components/FlexCenter";

const Success = () => {
  return (
    <FlexCenter height="80vh" bgcolor="#fff">
      <Card sx={{ width: "calc(100% - 20px)", maxWidth: "400px", pb: 3 }}>
        <Box
          sx={{
            bgcolor: green[600],
            height: "20vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Fab size="large">
            <CheckCircleOutline fontSize="large" color="success" />
          </Fab>
          <Typography fontSize={20} fontWeight={600} color="#fff">
            Success
          </Typography>
        </Box>
        <Box>
          <Typography
            fontSize={17}
            fontWeight={700}
            color="green"
            textAlign="center"
            mt={2}
          >
            Thank You! Your request sent successfully.
          </Typography>
          <Typography textAlign="center" fontSize={14} color="gray">
            Please, wait for your approval.
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="contained"
            color="info"
            LinkComponent={Link}
            to="/scout/application/details"
          >
            Submitted Application
          </Button>
        </Box>
      </Card>
    </FlexCenter>
  );
};

export default Success;
