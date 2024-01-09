import { Box } from "@mui/material";

const FlexCenter = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
      {...props}
    >
      {props.children}
    </Box>
  );
};

export default FlexCenter;
