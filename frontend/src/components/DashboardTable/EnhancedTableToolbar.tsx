import { Toolbar, alpha, Typography, CircularProgress, Tooltip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";

type EnhancedTableToolbarProps = {
  isFetching: boolean;
  numSelected: number;
  handleDeleteSelectedAstronauts: () => void;
  isFilterEnabled: boolean;
  setIsFilterEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EnhancedTableToolbar = ({
  isFetching,
  numSelected,
  handleDeleteSelectedAstronauts,
  isFilterEnabled,
  setIsFilterEnabled,
}: EnhancedTableToolbarProps) => {
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
};
