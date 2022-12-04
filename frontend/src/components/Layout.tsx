import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Container, Link } from "@mui/material";

import { CustomDrawer } from "./Navigation/CustomDrawer";
import { CustomAppBar } from "./Navigation/CustomAppBar";
import { CustomDrawerHeaderStyled } from "./Navigation/CustomDrawerHeaderStyled";

type Props = {
  children?: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  const [open, setIsOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CustomDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <CustomAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Container
        component="main"
        maxWidth="xl"
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          minHeight: "100%",
          pb: 6,
          gap: 2,
        }}
      >
        <>
          <CustomDrawerHeaderStyled />
          {children}
        </>
      </Container>
    </Box>
  );
};
