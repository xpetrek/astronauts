import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { Astronaut, ColorPalette } from "../../utils/types";

type Props = {
  isHelmDown: boolean;
  setIsHelmDown: (value: React.SetStateAction<boolean>) => void;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  currentPart: string;
  setCurrentPart: React.Dispatch<React.SetStateAction<keyof ColorPalette>>;
  colorPalette: ColorPalette;
  setColorPalette: React.Dispatch<React.SetStateAction<ColorPalette>>;
  astronaut: Astronaut;
  setAstronaut: React.Dispatch<React.SetStateAction<Astronaut>>;
  handleCreateOrEditAstronaut: () => void;
};
export const EditorAstronautData = ({
  isHelmDown,
  setIsHelmDown,
  color,
  setColor,
  currentPart,
  setCurrentPart,
  colorPalette,
  setColorPalette,
  astronaut,
  setAstronaut,
  handleCreateOrEditAstronaut,
}: Props) => {
  const [dateOfBirthValidation, setDateOfBirthValidation] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "dateOfBirth")
      setDateOfBirthValidation(checkDateOfBirth);
    setAstronaut((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const handleChangeColor = (pickedColor: ColorResult) => {
    setColor(pickedColor.hex);
    setColorPalette((old) => ({ ...old, [currentPart]: pickedColor.hex }));
  };

  const checkDateOfBirth = () => {
    const dateReg = /^\d{2}([.])\d{2}\1\d{4}$/;
    return !dateReg.test(astronaut.dateOfBirth);
  };

  return (
    <>
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
          {Object.keys(colorPalette).map((part, index) => (
            <Button
              key={index}
              variant={currentPart === part ? "contained" : "outlined"}
              onClick={() => setCurrentPart(part as keyof ColorPalette)}
            >
              {part}
            </Button>
          ))}
        </Box>
        <SketchPicker width="50%" color={color} onChange={handleChangeColor} />
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
          error={dateOfBirthValidation}
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
            <Switch
              checked={isHelmDown}
              onChange={() => setIsHelmDown((old) => !old)}
            />
          }
          label="Helmet"
        />
        <Button variant="contained" onClick={handleCreateOrEditAstronaut}>
          {astronaut.id > 0 ? "Edit astronaut" : "Create astronaut"}
        </Button>
      </Box>
    </>
  );
};
