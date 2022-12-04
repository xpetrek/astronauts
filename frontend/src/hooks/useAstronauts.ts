import axios from "axios";
import {
  Astronaut,
  AstronautDraft,
  AstronautsGetResponse,
  Filter,
  Order,
} from "../utils/types";

function createData(
  id: number,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  superpower: string
): Astronaut {
  return {
    id: id,
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: dateOfBirth,
    superpower: superpower,
  };
}

const astronauts = [
  createData(1, "Julius", "Frederick", "10.02.1990", "super strength"),
  createData(2, "Ivan", "Wert", "23.02.1991", "good listener"),
  createData(3, "Alan", "Klopner", "12.08.1988", "scientist"),
  createData(4, "Jurij", "Uberus", "22.12.1986", "ventropologist"),
  createData(5, "Xavier", "Warko", "11.04.1985", "father"),
  createData(6, "Ironia", "Polart", "01.07.1988", "single mother"),
  createData(7, "Villam", "Hublibo", "06.05.1979", "super sight"),
  createData(8, "Budek", "Huugand", "11.04.1989", "gymnast"),
  createData(9, "Vermnon", "Freund", "24.02.1992", "Phd"),
  createData(10, "Ivan", "Zacher", "28.01.1993", "long arms"),
  createData(11, "Karl", "Arepo", "04.01.1980", "180IQ"),
  createData(12, "Lary", "Lopetz", "09.11.1980", "surgeon"),
  createData(13, "Piotr", "Ibramov", "10.10.1996", "head scientist"),
  createData(14, "Leon", "Urakov", "19.10.1981", "doctor"),
  createData(15, "Lukas", "Operov", "27.11.1988", "mathematician"),
  createData(16, "Martin", "Lukas", "19.21.1984", "doctor"),
  createData(17, "Keith", "Bryant", "09.01.1990", "mathematician"),
  createData(18, "Russel", "Westside", "10.08.1991", "engeneer"),
  createData(19, "Denzel", "Gigilov", "03.06.1992", "doctor"),
  createData(20, "Tom", "Hanks", "02.04.1987", "theoretical physicist"),
  createData(21, "Rook", "Lopez", "02.05.1977", "mathematician"),
  createData(22, "Kelly", "Oldreman", "09.04.1987", "theoretical physicist"),
  createData(23, "Joleen", "Watt", "11.05.1989", "astrolog"),
  createData(24, "Joy", "Poerk", "14.03.1993", "theoretical physicist"),
  createData(25, "Celestine", "Claystene", "05.10.1985", "mathematician"),
  createData(26, "Grant", "Kurly", "17.12.1984", "theoretical physicist"),
  createData(27, "Harry", "White", "26.08.1984", "experimental physicist"),
  createData(28, "Meghan", "Trashcan", "24.02.1986", "mathematician"),
  createData(29, "Elizabeth", "Second", "23.01.1988", "scientist"),
  createData(30, "Charles", "King", "17.10.19870", "scientist"),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const isFilterSufficient = (astronaut: Astronaut, filter: Filter) => {
  if (
    astronaut.firstName !== "" &&
    !astronaut.firstName.includes(filter.firstName)
  )
    return false;
  if (
    astronaut.lastName !== "" &&
    !astronaut.lastName.includes(filter.lastName)
  )
    return false;
  if (
    astronaut.superpower !== "" &&
    !astronaut.superpower.includes(filter.superpower)
  )
    return false;
  return true;
};

export const backendFetchAstronauts = async ({
  orderBy,
  order,
  page,
  rowsPerPage,
  filter,
}: Props) => {
  const computedAstronauts = astronauts
    .filter((astronaut) => isFilterSufficient(astronaut, filter))
    .sort(getComparator(order, orderBy));
  await delay(2000);

  const obj = {
    total: computedAstronauts.length,
    page: page,
    lastPage: Math.ceil(computedAstronauts.length / rowsPerPage),
    rowsPerPage: rowsPerPage,
    astronauts: computedAstronauts.slice(
      (page - 1) * rowsPerPage,
      (page - 1) * rowsPerPage + rowsPerPage
    ),
  };

  return obj;
};

export const backendFetchAstronaut = async (id: number) => {
  const selectedAstronaut = astronauts
    .filter((astronaut) => astronaut.id === id);
  await delay(2000);
  return selectedAstronaut;
};

type Props = {
  orderBy: keyof Astronaut;
  order: Order;
  page: number;
  rowsPerPage: number;
  filter: Filter;
};

const getAstronauts = async (params: Props) => {
  const response = await axios.get<AstronautsGetResponse>(`/api/astronauts?\
  orderBy=${params.orderBy}&\
  order=${params.order}&\
  page=${params.page}&\
  rowsPerPage=${params.rowsPerPage}&\
  firstName=${params.filter.firstName}&\
  lastName=${params.filter.lastName}&\
  dateOfBirth=${params.filter.dateOfBirth}&\
  superpower=${params.filter.superpower}`);
  return response.data;
};
const getAstronaut = (id: number) =>
  axios.get<Astronaut>(`/api/astronauts/${id}`);

const putAstronaut = (id: number) =>
  axios.put<Astronaut>(`/api/astronauts/${id}`);

const newAstronaut = (astronaut: AstronautDraft) =>
  axios.post<Astronaut>("/api/astronauts", astronaut);

const deleteAstronaut = (id: number) =>
  axios.delete<Astronaut>(`/api/astronauts/${id}`);

export const useAstronauts = {
  getAstronauts,
  getAstronaut,
  putAstronaut,
  newAstronaut,
  deleteAstronaut,
};
