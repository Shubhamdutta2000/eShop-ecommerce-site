import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#2196f3",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  heading: {
    color: "#2196f3",
    fontFamily: "Merriweather Sans, sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "3.6rem",
    lineHeight: "7rem",
    letterSpacing: "-0.018em",
    background: "linear-gradient(90deg, #014581 0%, #5eb9ffec 86.54%)",
    backgroundClip: "text",
    webkitBackgroundClip: "text",
    webkitTextFillColor: "transparent",
  },
});
