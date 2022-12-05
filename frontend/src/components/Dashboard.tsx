import { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Astronaut,
  AstronautsGetResponse,
  Filter,
  Order,
} from "../utils/types";
import { backendFetchAstronauts, useAstronauts } from "../hooks/useAstronauts";

import { EnhancedTableToolbar } from "./DashboardTable/EnhancedTableToolbar";
import { EnhancedTableHead } from "./DashboardTable/EnhancedTableHead";
import { EnhancedTableFooter } from "./DashboardTable/EnhancedTableFooter";
import { EnhancedTableBody } from "./DashboardTable/EnhancedTableBody";

export const Dashboard = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Astronaut>("id");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(1);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isFilterEnabled, setIsFilterEnabled] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter>({
    id: 0,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    superpower: "",
  });
  const queryClient = useQueryClient();
  const { isLoading, isError, refetch, data, isFetching, isPreviousData } =
    useQuery<AstronautsGetResponse>(
      ["/astronauts", { page, order, orderBy, rowsPerPage, filter }],
      () =>
        // Mockup method for use without DB
        // backendFetchAstronauts({
        //   order,
        //   orderBy,
        //   page,
        //   rowsPerPage,
        //   filter,
        // }),
        useAstronauts.getAstronauts({
          order,
          orderBy,
          page,
          rowsPerPage,
          filter,
        }),
      { keepPreviousData: true }
    );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Astronaut
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDeleteAstronaut = (id: number) => {
    useAstronauts.deleteAstronaut(id);
    setSelected([]);
    queryClient.invalidateQueries();
    refetch();
  };

  const handleDeleteSelectedAstronauts = () => {
    console.log(selected);
    selected.forEach((id) =>
      useAstronauts.deleteAstronaut(id).finally(() => refetch())
    );
    setSelected([]);
    queryClient.invalidateQueries();
    refetch();
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data?.astronauts.map(
        (astronaut: Astronaut) => astronaut.id
      );
      setSelected(newSelected ?? []);
      return;
    }
    setSelected([]);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          handleDeleteSelectedAstronauts={handleDeleteSelectedAstronauts}
          isFetching={isFetching}
          isFilterEnabled={isFilterEnabled}
          setIsFilterEnabled={setIsFilterEnabled}
          numSelected={selected.length}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              handleSelectAllClick={handleSelectAllClick}
              filter={filter}
              setFilter={setFilter}
              isFilterEnabled={isFilterEnabled}
              selected={selected}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data?.astronauts.length ?? 0}
            />
            <EnhancedTableBody
              astronauts={data?.astronauts}
              dense={dense}
              handleDeleteAstronaut={handleDeleteAstronaut}
              rowsPerPage={rowsPerPage}
              selected={selected}
              setSelected={setSelected}
            />
          </Table>
        </TableContainer>
        <EnhancedTableFooter
          lastPage={data?.lastPage ?? 1}
          dense={dense}
          setDense={setDense}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
