import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

export const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1.4),
      width: "76%",
    },
  },

  button: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    margin: theme.spacing(1.4),
    width: "76%",
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
