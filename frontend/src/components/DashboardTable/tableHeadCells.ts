import { Astronaut } from "../../utils/types";

type HeadCell = {
  disablePadding: boolean;
  id: keyof Astronaut;
  label: string;
  numeric: boolean;
}

export const tableHeadCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "firstName",
    numeric: false,
    disablePadding: false,
    label: "First name",
  },
  {
    id: "lastName",
    numeric: false,
    disablePadding: false,
    label: "Last name",
  },
  {
    id: "dateOfBirth",
    numeric: false,
    disablePadding: false,
    label: "Date of Birth",
  },
  {
    id: "superpower",
    numeric: false,
    disablePadding: false,
    label: "Superpower",
  },
];