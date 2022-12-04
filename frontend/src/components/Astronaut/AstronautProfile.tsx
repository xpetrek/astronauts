import { Grid, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Astronaut, ColorPalette } from "../../utils/types";
import { AstronautColorSvg } from "./AstronautColorSvg";
import { EditorAstronautData } from "./EditorAstronautData";
import { ShowAstronautData } from "./ShowAstronautData";

type Props = {
  astronaut: Astronaut;
  setAstronaut: React.Dispatch<React.SetStateAction<Astronaut>>;
  handleCreateOrEditAstronaut: () => void;
  isEditingAstronaut: boolean;
};
export const AstronautProfile = ({
  astronaut,
  setAstronaut,
  handleCreateOrEditAstronaut,
  isEditingAstronaut,
}: Props) => {
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

  const handleChangePart = (clickedOn: keyof ColorPalette) => {
    setCurrentPart(clickedOn);
  };

  return (
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
        {isEditingAstronaut ? (
          <EditorAstronautData
            isHelmDown={isHelmDown}
            setIsHelmDown={setIsHelmDown}
            color={color}
            setColor={setColor}
            currentPart={currentPart}
            setCurrentPart={setCurrentPart}
            colorPalette={colorPalette}
            setColorPalette={setColorPalette}
            astronaut={astronaut}
            setAstronaut={setAstronaut}
            handleCreateOrEditAstronaut={handleCreateOrEditAstronaut}
          />
        ) : (
          <ShowAstronautData astronaut={astronaut} />
        )}
      </Grid>
    </Grid>
  );
};
