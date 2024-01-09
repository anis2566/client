import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Box, Breadcrumbs, Stack } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

const BreadCumb = ({ data }) => {
  const { pathname } = useLocation();

  return (
    <Stack spacing={2} bgcolor="#fff" py={2} px={2}>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
        {data.map((data, i) => (
          <Box
            component={Link}
            to={data.path}
            sx={{
              textDecoration: "none",
              color: pathname === data.path ? "inherit" : "tomato",
              fontWeight: "bold",
              pointerEvents: pathname === data.path ? "none" : "all",
              textTransform: "capitalize",
              ":hover": {
                textDecoration: pathname === data.path ? "none" : "underline",
              },
            }}
            key={i}
          >
            {data.label}
          </Box>
        ))}
      </Breadcrumbs>
    </Stack>
  );
};

export default BreadCumb;

// BREADCUMD DATA
// const data = [
//   {
//     label: "Dashboard",
//     path: "/",
//   },
//   {
//     label: "Student",
//     path: "/student",
//   },
// ];
