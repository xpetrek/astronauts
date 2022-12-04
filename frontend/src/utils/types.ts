export type Astronaut = AstronautDraft & {
  id: number;
};

export type AstronautDraft = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  superpower: string;
};

export type Filter = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  superpower: string;
};

export type Order = "asc" | "desc";

export type ColorPalette = {
  helmet: string;
  backpack: string;
  suit: string;
  gloves: string;
  pants: string;
  boots: string;
};

export type AstronautsGetResponse = {
  total: number;
  page: number;
  lastPage: number;
  rowsPerPage: number;
  astronauts: Astronaut[];
};
