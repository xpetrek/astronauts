import { Box, Typography } from "@mui/material";

export const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h1">Astronauts core system network</Typography>
      <Typography align="center">
        Welcome to the characters database. User can browse characters of the
        implemented game. Create new ones, edit or even delete the existin
        characters in the database.
      </Typography>
      <Typography variant="h1">Future implementation</Typography>

      <Typography align="center">
        We are working into implementing different races, clothes customization
        or even multiple nationalities of the astronats characters.
      </Typography>
    </Box>
  );
};
