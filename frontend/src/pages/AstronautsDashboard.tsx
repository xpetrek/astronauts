import { Box, Typography } from "@mui/material";
import { Dashboard } from "../components/Dashboard";

export const AstronautsDashboard = () => {
  return (
    <Box width="100%">
      <Typography variant="h1" align="center">
        Astronauts dashboard
      </Typography>
      <Dashboard />
    </Box>
  );
};
