import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#2196f3",
    color: theme.palette.common.white,
    paddingLeft: "1.8rem",
  },
  body: {
    fontSize: 14,
    paddingLeft: "1.4rem",
    padding: "0.6rem",
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.selected,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  tableHead: {
    fontSize: "1.2rem",
  },
  tableCol: {
    fontSize: "1rem",
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
  check: {
    color: "#0e890a",
    fontWeight: "bolder",
  },
  cross: {
    fontWeight: "bolder",
  },
});
