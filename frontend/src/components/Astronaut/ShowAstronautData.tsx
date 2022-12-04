import { Box, Typography } from "@mui/material";
import { Astronaut } from "../../utils/types";

type Props = {
  astronaut: Astronaut;
};
export const ShowAstronautData = ({ astronaut }: Props) => {
  return (
    <Box >
      <Typography variant="h4">
        Date of birth: {astronaut.dateOfBirth}
      </Typography>
      <Typography variant="h4">Superpower: {astronaut.superpower}</Typography>
    </Box>
  );
};
