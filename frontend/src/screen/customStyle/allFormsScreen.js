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
    width: "50%",
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
    marginBottom: "0.6rem",
    marginTop: "0.6rem",
    color: "#1853F3",
    fontSize: "1.7rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.4rem",
    },
  },

  input: {
    "& label": {
      color: theme.palette.info.main,
      fontWeight: "550",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#46BFE0",
      },
    },
    paddingBottom: theme.spacing(2.8),
    width: "80%",

    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  button: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    width: "80%",
    marginBottom: "0.8rem",

    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  icon: {
    width: "1.2rem",
  },

  register: {
    paddingTop: theme.spacing(2.8),
    marginLeft: "6rem",

    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
    },
  },

  login: {
    paddingTop: theme.spacing(2.8),
    marginLeft: "6rem",

    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
    },
  },

  selectLabel: {
    fontSize: "1.4rem",
    textAlign: "center",
    color: "#1853F3",
  },


  back: {
    marginLeft: "0.6rem",
    width: "2rem",
    height: "2rem",
    marginBottom: "-1rem",
    backgroundImage: "linear-gradient(45deg, #2196f3,  70%, #045694 90%)",
    borderRadius: "2rem",
    padding: "0.3rem 0 0.3rem 0.5rem",
    color: "white",
    cursor: "pointer",
  },
}));
