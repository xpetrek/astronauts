import {
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link } from "react-router-dom";

import { Astronaut } from "../../utils/types";

type Props = {
  astronauts?: Astronaut[];
  dense: boolean;
  handleDeleteAstronaut: (id: number) => void;
  rowsPerPage: number;
  selected: readonly number[];
  setSelected: (value: React.SetStateAction<readonly number[]>) => void;
};
export const EnhancedTableBody = ({
  astronauts,
  dense,
  handleDeleteAstronaut,
  rowsPerPage,
  selected,
  setSelected,
}: Props) => {
  const emptyRows =
    astronauts === undefined ? rowsPerPage : rowsPerPage - astronauts.length;

  const isSelected = (id: number) =>
    selected.find((num) => num === id) === undefined ? false : true;

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

  return (
    <TableBody>
      {astronauts?.map((astronaut: Astronaut, index: number) => {
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
            <TableCell component="th" id={labelId} scope="row" padding="none">
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
              <Link
                state={{ data: astronaut, edited: false }}
                to={`/astronaut/${astronaut.id}`}
              >
                <Button sx={{ borderRadius: "100%" }}>
                  <AccountBoxIcon />
                </Button>
              </Link>
              <Link
                state={{ data: astronaut, edited: true }}
                to={`/astronaut/${astronaut.id}`}
              >
                <Button sx={{ borderRadius: "100%" }}>
                  <EditIcon />
                </Button>
              </Link>
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
  );
};
