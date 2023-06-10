import { Box, Typography } from "@mui/material";
import React from "react";

function Top() {
  return (
    <Box sx={{ paddingTop: "30px", borderRadius: 1, height: "100px" }}>
      <Typography
        variant="h2"
        sx={{ color: "white", fontWeight: "800", letterSpacing: "5px" }}
      >
        Touch Typing
      </Typography>
    </Box>
  );
}

export default Top;
