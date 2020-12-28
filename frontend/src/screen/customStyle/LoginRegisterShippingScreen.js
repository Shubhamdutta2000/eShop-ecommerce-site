import { makeStyles } from "@material-ui/core/styles";

//////////////////////////////    CUSTOM STYLES   /////////////////////////////

export const useStyle = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(2.6),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    width: "46%",
    margin: "auto",
    marginTop: "0.4rem",

    paddingTop: theme.spacing(2.4),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  avatar: {
    width: "3.1rem",
    height: "3.1rem",
    marginLeft: "50%",
    marginBottom: "0.8rem",
    transform: "translateX(-50%)",
    backgroundImage: "linear-gradient(45deg, #2196f3,  70%, #045694 90%)",
  },

  heading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  input: {
    "& label": {
      color: theme.palette.info.main,
      fontWeight: "550",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#21CBF3",
      },
    },
    paddingBottom: theme.spacing(2.8),
    width: "80%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  button: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    width: "76%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  icon: {
    width: "1.2rem",
  },

  register: {
    paddingTop: theme.spacing(2.8),
    marginLeft: "6rem",

    [theme.breakpoints.down("sm")]: {
      marginLeft: "auto",
    },
  },
}));
