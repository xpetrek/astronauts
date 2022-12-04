import {
  Stack,
  FormControlLabel,
  Switch,
  Pagination,
  Box,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";

type Props = {
  lastPage: number;
  dense: boolean;
  setDense: (value: React.SetStateAction<boolean>) => void;
  page: number;
  setPage: (value: React.SetStateAction<number>) => void;
  rowsPerPage: number;
  setRowsPerPage: (value: React.SetStateAction<number>) => void;
};

export const EnhancedTableFooter = ({
  lastPage,
  dense,
  setDense,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}: Props) => {
  return (
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
        control={
          <Switch checked={dense} onChange={() => setDense((old) => !old)} />
        }
        label="Dense padding"
      />
      <Pagination
        page={page}
        count={lastPage}
        showFirstButton
        showLastButton
        onChange={(event: React.ChangeEvent<unknown>, selectedPage: number) =>
          setPage(selectedPage)
        }
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
  );
};
