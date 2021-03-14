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

export const useStyles = makeStyles((theme) => ({
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
    marginBottom: "2rem",
    letterSpacing: "-0.018em",
    background: "linear-gradient(90deg, #0063bbdb 0%, #4ca8efcc 86.54%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    [theme.breakpoints.down("xs")]: {
      fontSize: "3rem",
    },
  },
  check: {
    color: "#0e890a",
    fontWeight: "bolder",
  },
  cross: {
    fontWeight: "bolder",
  },

  // for product list screen only
  createProductButton: {
    width: "18rem",
    height: "3.6rem",
    border: "none",
    outline: "none",
    marginBottom: "2rem",
    float: "right",
    background:
      "linear-gradient( 90deg,  #0663af, 0%, rgba(0, 149, 255, 0.582) 106.57%)",
    borderRadius: "2.6rem",
    justifyContent: "center",
    fontFamily: "Montserrat, sans-serif",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "1.25rem",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    letterSpacing: "0.005em",
    color: "#ffffff",
    filter: "drop-shadow(12px 12px 10px rgba(0, 0, 0, 0.42))",

    [theme.breakpoints.down("xs")]: {
      width: "14rem",
      height: "3rem",
      fontSize: "1rem",
    },
  },
}));
