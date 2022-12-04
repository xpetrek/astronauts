import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Groups2Icon from "@mui/icons-material/Groups2";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import Person from "@mui/icons-material/Person";

import { CustomDrawerStyled } from "./CustomDrawerStyled";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { FemaleAvatarSvg } from "../FemaleAvatarSvg";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const navigationItems = [
  { label: "Home", link: "/", icon: <HomeIcon /> },
  {
    label: "Astronauts",
    link: "/astronautsDashboard",
    icon: <Groups2Icon />,
  },
  { label: "New astronaut", link: "/newAstronaut", icon: <PersonAddIcon /> },
];

const profileItems = [
  { label: "Edit profile", link: "/", icon: <Person /> },
  { label: "Logout", link: "/", icon: <LogoutIcon /> },
];

const getListButton = (
  open: boolean,
  listItems: {
    label: string;
    link: string;
    icon: JSX.Element;
  }[]
) => {
  return (
    <>
      {listItems.map((item, index) => (
        <ListItem key={item.label} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            component={Link}
            to={item.link}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
};

type Props = {
  open: boolean;
  handleDrawerClose: () => void;
};

export const CustomDrawer = ({ open, handleDrawerClose }: Props) => {
  return (
    <CustomDrawerStyled variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton
          onClick={handleDrawerClose}
          sx={{ marginTop: "4px", marginLeft: "2px" }}
        >
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <List>{getListButton(open, navigationItems)}</List>
      <Divider />
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box sx={{ flexGrow: 2 }} />
        <Box sx={{ flexGrow: 3 }}>
          <FemaleAvatarSvg />
        </Box>
        <Box sx={{ flexGrow: 2 }} />
      </Box>
      <List>{getListButton(open, profileItems)}</List>
      {/*
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </CustomDrawerStyled>
  );
};
