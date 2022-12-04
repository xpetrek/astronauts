import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
  },
});

theme.typography.h1 = {
  fontSize: "2.5rem",
  "@media (min-width:600px)": {
    fontSize: "3.0rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3.5rem",
  },
};

theme.typography.h2 = {
  fontSize: "2.0rem",
  "@media (min-width:600px)": {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3.0rem",
  },
};

theme.typography.h3 = {
  fontSize: "1.0rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.5rem",
  },
};
