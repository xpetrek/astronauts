import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";

import { Astronaut, AstronautDraft, ColorPalette } from "../../utils/types";

import { astronautForm } from "./astronautForm";

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
  const [isFormValid, setIsFormValid] = useState({
    firstName: true,
    lastName: true,
    superpower: true,
    dateOfBirth: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAstronaut((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const handleChangeColor = (pickedColor: ColorResult) => {
    setColor(pickedColor.hex);
    setColorPalette((old) => ({ ...old, [currentPart]: pickedColor.hex }));
  };

  const checkStringInputs = (key: keyof AstronautDraft) => {
    if (key === "dateOfBirth") {
      const dateReg = /^\d{2}([.])\d{2}\1\d{4}$/;
      setIsFormValid((old) => ({
        ...old,
        dateOfBirth: dateReg.test(astronaut.dateOfBirth),
      }));
    } else {
      const isFaulty = astronaut[key] === "" || astronaut[key].length > 25;
      setIsFormValid((old) => ({
        ...old,
        [key]: !isFaulty,
      }));
    }
  };

  const submitIfValid = () => {
    if (
      isFormValid.firstName &&
      isFormValid.lastName &&
      isFormValid.superpower &&
      isFormValid.dateOfBirth
    )
      handleCreateOrEditAstronaut();
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
        {astronautForm.map((inputAttr) => (
          <TextField
            name={inputAttr.id}
            value={astronaut[inputAttr.id]}
            sx={{ width: "100%", marginTop: "10px" }}
            label={inputAttr.label}
            onChange={handleInputChange}
            error={!isFormValid[inputAttr.id]}
            onBlur={() => checkStringInputs(inputAttr.id)}
            helperText={!isFormValid[inputAttr.id] ? inputAttr.helperText : ""}
          />
        ))}
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
        <Button variant="contained" onClick={submitIfValid}>
          {astronaut.id > 0 ? "Edit astronaut" : "Create astronaut"}
        </Button>
      </Box>
    </>
  );
};
