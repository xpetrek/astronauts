import { AstronautDraft } from "../../utils/types";

type AstronautForm = {
  id: keyof AstronautDraft;
  label: string;
  helperText: string;
};

export const astronautForm: readonly AstronautForm[] = [
  {
    id: "firstName",
    label: "First name",
    helperText: "Must be specified and shorter then 30 characters",
  },
  {
    id: "lastName",
    label: "Last name",
    helperText: "Must be specified and shorter then 30 characters",
  },
  {
    id: "superpower",
    label: "Superpower",
    helperText: "Must be specified and shorter then 30 characters",
  },
  {
    id: "dateOfBirth",
    label: "Date of birth",
    helperText: "Correct format dd.mm.yyyy",
  },
];
