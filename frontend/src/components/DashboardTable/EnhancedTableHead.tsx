import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
  Box,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

import { Astronaut, Filter, Order } from "../../utils/types";

import { EnhancedTableHeadFilter } from "./EnhancedTableHeadFilter";
import { tableHeadCells } from "./tableHeadCells";

type EnhancedTableProps = {
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFilterEnabled: boolean;
  selected: readonly number[];
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Astronaut
  ) => void;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  order: Order;
  orderBy: string;
  rowCount: number;
};

export const EnhancedTableHead = ({
  handleSelectAllClick,
  isFilterEnabled,
  selected,
  filter,
  setFilter,
  order,
  orderBy,
  rowCount,
  onRequestSort,
}: EnhancedTableProps) => {
  const createSortHandler =
    (property: keyof Astronaut) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      {isFilterEnabled && (
        <EnhancedTableHeadFilter filter={filter} setFilter={setFilter} />
      )}
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={selected.length > 0 && selected.length < rowCount}
            checked={rowCount > 0 && selected.length === rowCount}
            onChange={handleSelectAllClick}
            inputProps={{
              "aria-label": "select all astronauts",
            }}
          />
        </TableCell>
        {tableHeadCells.map((headCell, key) => (
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
};
