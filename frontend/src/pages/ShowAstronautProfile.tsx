import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import { Astronaut, AstronautDraft, ColorPalette } from "../utils/types";
import { backendFetchAstronaut, useAstronauts } from "../hooks/useAstronauts";
import { useLocation, useParams } from "react-router-dom";
import { AstronautProfile } from "../components/Astronaut/AstronautProfile";

export const ShowAstronautProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const passedData: Astronaut | undefined = location.state?.data;
  const [isBeingEdited, setIsBeingEdited] = useState<boolean>(
    location.state?.edited ?? false
  );

  const [astronaut, setAstronaut] = useState<Astronaut>({
    id: passedData?.id ?? -1,
    firstName: passedData?.firstName ?? "",
    lastName: passedData?.lastName ?? "",
    dateOfBirth: passedData?.dateOfBirth ?? "",
    superpower: passedData?.superpower ?? "",
  });

  useEffect(() => {
    if (passedData === undefined && id !== undefined)
      backendFetchAstronaut(parseInt(id)).then((data) => {
        if (data !== undefined)
          setAstronaut({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: data.dateOfBirth,
            superpower: data.superpower,
          });
      });
    if (astronaut.id < 0) setIsBeingEdited(true);
  }, []);

  const handleEditAstronaut = () => {
    useAstronauts.putAstronaut(astronaut);
  };

  const handleCreateAstronaut = () => {
    useAstronauts.newAstronaut(astronaut);
  };
  console.log(astronaut.id);
  return (
    <>
      <Typography variant="h1">
        {astronaut.firstName !== ""
          ? `${astronaut.firstName} ${astronaut.lastName}`
          : "New astronaut"}
      </Typography>
      <AstronautProfile
        astronaut={astronaut}
        setAstronaut={setAstronaut}
        handleCreateOrEditAstronaut={() =>
          astronaut.id > 0 ? handleEditAstronaut() : handleCreateAstronaut()
        }
        isEditingAstronaut={isBeingEdited}
      />
      {!isBeingEdited && (
        <Button variant="contained" onClick={() => setIsBeingEdited(true)}>
          Edit
        </Button>
      )}
    </>
  );
};
