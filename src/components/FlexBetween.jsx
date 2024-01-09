import React from "react";

const FlexBetween = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default FlexBetween;
