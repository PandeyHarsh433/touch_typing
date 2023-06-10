import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Typo = () => {
  const { presentText } = useSelector((store) => store.AppReducer);
  return (
    <Box
      sx={{
        backgroundColor: "rgb(52, 79, 235)", // Dark purple background color
        boxShadow:
          "0px 4px 6px rgba(0, 0, 0, 0.5), 0px 6px 12px rgba(0, 0, 0, 0.3)", // Customized box shadow
        border: "none", // Removed the black border
        maxWidth: "44.5%",
        margin: "auto",
        padding: "2rem", // Replaced paddingBottom with padding for consistent spacing
        marginTop: "3rem",
        marginBottom: "40px",
        borderRadius: "10px",
      }}
    >
      <Typography sx={{ fontSize: "35px", color: "#FFFFFF" }}>
        {" "}
        {/* White text color */}
        {presentText}
      </Typography>
    </Box>
  );
};

export default Typo;
