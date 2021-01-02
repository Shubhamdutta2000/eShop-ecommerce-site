import { makeStyles, withStyles, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export const useStyles = makeStyles((theme) => ({
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1.4),
      width: "76%",
    },
    marginTop: "1.4rem",
  },

  heading: {
    // color: theme.palette.info.main,
    color: "#2071E3",
  },
  button: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    margin: theme.spacing(1.4),
    width: "76%",
  },

  table: {
    borderRadius: ".4rem",
    marginTop: "1.4rem",
  },
}));

/////////////////////////     CUSTOM STYLE TextField     ///////////////////////////
export const CssTextField = withStyles({
  root: {
    "& label": {
      color: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "green",
      },
    },
  },
})(TextField);

/////////////////////////     CUSTOM STYLE TABLE CELL     ///////////////////////////
export const StyledTableCell = withStyles((theme) =>
  createStyles({
    head: {
      background: "#21CBF3",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

/////////////////////////     CUSTOM STYLE TABLE ROW     ///////////////////////////
export const StyledTableRow = withStyles((theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);
