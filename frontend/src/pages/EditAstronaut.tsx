import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { ColorResult, SketchPicker } from "react-color";

import { AstronautColorSvg } from "../components/AstronautColorSvg";
import { Astronaut, AstronautDraft, ColorPalette } from "../utils/types";
import { useAstronauts } from "../hooks/useAstronauts";
import { useLocation } from "react-router-dom";

export const EditAstronaut = () => {
  const location = useLocation();
  const data: Astronaut = location.state?.data;
  
  const [astronaut, setAstronaut] = useState<AstronautDraft>({
    firstName: data.firstName ?? "",
    lastName: data.lastName ?? "",
    dateOfBirth: data.dateOfBirth ?? "",
    superpower: data.superpower ?? "",
  });
  const [color, setColor] = useState("");
  const [isHelmDown, setIsHelmDown] = useState(false);
  const [currentPart, setCurrentPart] = useState<keyof ColorPalette>("helmet");
  const [colorPalette, setColorPalette] = useState({
    helmet: "#fff",
    backpack: "#fff",
    suit: "#fff",
    gloves: "#fff",
    pants: "#fff",
    boots: "#fff",
  });

  useEffect(() => {
    setColor(colorPalette[currentPart]);
  }, [currentPart, colorPalette]);

  const handleChangeColor = (pickedColor: ColorResult) => {
    setColor(pickedColor.hex);
    setColorPalette((old) => ({ ...old, [currentPart]: pickedColor.hex }));
  };

  const handleChangePart = (clickedOn: keyof ColorPalette) => {
    setCurrentPart(clickedOn);
  };

  const handleHelmetPosition = () => {
    setIsHelmDown((old) => !old);
  };

  const handleCreateAstronaut = () => {
    useAstronauts.newAstronaut(astronaut);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAstronaut((old) => ({ ...old, [e.target.name]: e.target.value }));
    console.log(astronaut);
  };

  return (
    <>
      <Typography variant="h1">Add new astronaut</Typography>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
          <Box
            sx={{
              width: "70%",
              marginLeft: 10,
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <AstronautColorSvg
              colorPalette={colorPalette}
              isHelmDown={isHelmDown}
              handleClick={handleChangePart}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingRight: 5,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              paddingBottom: "10px",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              {Object.keys(colorPalette).map((part) => (
                <Button
                  variant={currentPart === part ? "contained" : "outlined"}
                  onClick={() => handleChangePart(part as keyof ColorPalette)}
                >
                  {part}
                </Button>
              ))}
            </Box>
            <SketchPicker
              width="50%"
              color={color}
              onChange={handleChangeColor}
            />
          </Box>
          <Box>
            <TextField
              name="firstName"
              value={astronaut.firstName}
              sx={{ width: "100%", paddingTop: "5px" }}
              label={"First Name"}
              onChange={handleInputChange}
            />
            <TextField
              name="lastName"
              value={astronaut.lastName}
              sx={{ width: "100%", paddingTop: "5px" }}
              label={"Last Name"}
              onChange={handleInputChange}
            />
            <TextField
              name="dateOfBirth"
              value={astronaut.dateOfBirth}
              sx={{ width: "100%", paddingTop: "5px" }}
              label={"Date of birth"}
              onChange={handleInputChange}
            />
            <TextField
              name="superpower"
              value={astronaut.superpower}
              sx={{ width: "100%", paddingTop: "5px" }}
              label={"Superpower"}
              onChange={handleInputChange}
            />
          </Box>
          <Box
            sx={{
              paddingTop: "10px",
              width: "80%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <FormControlLabel
              control={
                <Switch checked={isHelmDown} onChange={handleHelmetPosition} />
              }
              label="Helmet"
            />
            <Button variant="contained" onClick={handleCreateAstronaut}>
              Create astronaut
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
