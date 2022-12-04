import { useState } from "react";
import { alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import CircularProgress from "@mui/material/CircularProgress";
import { visuallyHidden } from "@mui/utils";
import {
  Stack,
  Pagination,
  TextField,
  InputAdornment,
  styled,
  Button,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

import {
  backendFetchAstronauts,
  useAstronauts,
} from "../../hooks/useAstronauts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Astronaut,
  AstronautsGetResponse,
  Filter,
  Order,
} from "../../utils/types";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

interface HeadCell {
  disablePadding: boolean;
  id: keyof Astronaut;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
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

interface EnhancedTableProps {
  isFilterEnabled: boolean;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Astronaut
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    isFilterEnabled,
    onSelectAllClick,
    filter,
    setFilter,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Astronaut) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      {isFilterEnabled && (
        <EnhancedTableHeadFilter
          isFilterEnabled={isFilterEnabled}
          onSelectAllClick={onSelectAllClick}
          filter={filter}
          setFilter={setFilter}
          numSelected={numSelected}
          rowCount={rowCount}
        />
      )}
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all astronauts",
            }}
          />
        </TableCell>
        {headCells.map((headCell, key) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              sx={{ fontWeight: "bold" }}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell padding="checkbox" />
        <TableCell padding="checkbox" />
      </TableRow>
    </TableHead>
  );
}

type Props = {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  isFilterEnabled: boolean;
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
};
//This filter might be moved within application state/context
const EnhancedTableHeadFilter = ({
  isFilterEnabled,
  onSelectAllClick,
  filter,
  setFilter,
  numSelected,
  rowCount,
}: Props) => {
  const handleChangeFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const handleRemoveFilter = (filterKey: string) => {
    setFilter((old) => ({ ...old, [filterKey]: "" }));
  };

  const handleClearFilter = () => {
    setFilter({
      id: -1,
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      superpower: "",
    });
  };

  return (
    <TableRow>
      <TableCell padding="checkbox"></TableCell>
      {headCells.map((headCell, key) => (
        <TableCell
          key={headCell.id}
          align="left"
          padding={headCell.disablePadding ? "none" : "normal"}
        >
          <TextField
            variant="standard"
            label={headCell.label}
            name={headCell.id}
            value={filter[headCell.id] === -1 ? "" : filter[headCell.id]}
            onChange={handleChangeFilterChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleRemoveFilter(headCell.id)}>
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </TableCell>
      ))}
      <TableCell align="center">
        <Button variant="contained" onClick={handleClearFilter}>
          <Typography>Clear filter</Typography>
          <CloseIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

interface EnhancedTableToolbarProps {
  handleDeleteSelectedAstronauts: () => void;
  isFetching: boolean;
  isFilterEnabled: boolean;
  setIsFilterEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {
    handleDeleteSelectedAstronauts,
    isFetching,
    isFilterEnabled,
    setIsFilterEnabled,
    numSelected,
  } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <>
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Astronauts
          </Typography>
          {isFetching && <CircularProgress />}
        </>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete selected astronauts">
          <IconButton onClick={() => handleDeleteSelectedAstronauts()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={isFilterEnabled ? "Disable filter" : "Enable filter"}>
          <IconButton onClick={() => setIsFilterEnabled((old) => !old)}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

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
        backendFetchAstronauts({
          order,
          orderBy,
          page,
          rowsPerPage,
          filter,
        }),
      // useAstronauts.getAstronauts({
      //   order,
      //   orderBy,
      //   page,
      //   rowsPerPage,
      //   filter,
      // }),
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

  const handleSelect = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) =>
    selected.find((num) => num === id) === undefined ? false : true;

  const emptyRows =
    data?.astronauts === undefined
      ? rowsPerPage
      : rowsPerPage - data.astronauts?.length;

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
              filter={filter}
              setFilter={setFilter}
              isFilterEnabled={isFilterEnabled}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data?.astronauts.length ?? 0}
            />
            <TableBody>
              {data?.astronauts?.map((astronaut: Astronaut, index: number) => {
                const isItemSelected = isSelected(astronaut.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={astronaut.id}
                    selected={isItemSelected}
                  >
                    <TableCell
                      padding="checkbox"
                      onClick={(event) => handleSelect(event, astronaut.id)}
                    >
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {astronaut.id}
                    </TableCell>
                    <TableCell align="left">{astronaut.firstName}</TableCell>
                    <TableCell align="left">{astronaut.lastName}</TableCell>
                    <TableCell align="left">{astronaut.dateOfBirth}</TableCell>
                    <TableCell align="left"> {astronaut.superpower}</TableCell>
                    <TableCell
                      align="left"
                      sx={{ display: "flex", flexDirection: "row" }}
                    >
                      <Button
                        component={Link}
                        to={`/astronaut/${astronaut.id}`}
                        sx={{ borderRadius: "100%" }}
                      >
                        <AccountBoxIcon />
                      </Button>
                      <Button
                        component={Link}
                        to={`/editAstronaut/${astronaut.id}`}
                        sx={{ borderRadius: "100%" }}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        onClick={() => handleDeleteAstronaut(astronaut.id)}
                        sx={{ borderRadius: "100%" }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
          <Pagination
            page={page}
            count={data?.lastPage}
            showFirstButton
            showLastButton
            onChange={handleChangePage}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: 1,
            }}
          >
            <Typography>Rows per page</Typography>
            <TextField
              sx={{ padding: 1 }}
              id="outlined-select-rows-per-page"
              variant="standard"
              select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(parseInt(e.target.value));
                setPage(1);
              }}
            >
              {[5, 10, 15, 25, 50].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};
