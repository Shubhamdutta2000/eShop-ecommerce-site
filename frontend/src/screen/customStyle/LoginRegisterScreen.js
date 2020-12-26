import { makeStyles } from "@material-ui/core/styles";

//////////////////////////////    CUSTOM STYLES   /////////////////////////////

export const useStyle = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    width: "40%",
    margin: "auto",
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
  },

  avatar: {
    width: "2.6rem",
    height: "2.6rem",
    marginLeft: "50%",
    marginButtom: "7rem",
    transform: "translateX(-50%)",
    backgroundColor: "#2196F0",
  },

  heading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  input: {
    "& label": {
      color: theme.palette.info.main,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#21CBF3",
      },
    },
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    paddingBottom: theme.spacing(2.8),
  },

  button: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    width: "76%",
  },

  lockIcon: {
    width: "1.2rem",
  },

  register: {
    padding: theme.spacing(2),
    marginLeft: "5rem",
  },
}));
