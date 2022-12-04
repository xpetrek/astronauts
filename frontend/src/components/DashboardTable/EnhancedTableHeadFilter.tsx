import {
  TableRow,
  TableCell,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Filter } from "../../utils/types";

import { tableHeadCells } from "./tableHeadCells";

type Props = {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};
//This filter might be moved within application state/context
export const EnhancedTableHeadFilter = ({ filter, setFilter }: Props) => {
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
      {tableHeadCells.map((headCell, key) => (
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
