import { makeStyles } from "@material-ui/core/styles";

//////////////////////////////    CUSTOM STYLES   /////////////////////////////

export const useStyle = makeStyles((theme) => ({
  root: {
    // height: '100vh',
    background: "#fff",
  },
  image: {
    // height: '100vh',
    width: "100%",
    marginTop: "16%",
  },
  image2: {
    marginTop: "40vh",
    // height: '100vh',
    width: "100%",
  },
  display: {
    display: "none",
  },
  form: {
    padding: theme.spacing(2.6),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    width: "80%",
    margin: "auto",
    marginTop: "3rem",

    paddingTop: theme.spacing(2.4),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  // for user edit screen
  paperUserEdit: {
    width: "60%",
    margin: "auto",
    marginTop: "1.2rem",

    paddingTop: theme.spacing(2.4),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  // for product edit screen
  paperProductEdit: {
    width: "100%",
    margin: "auto",
    marginTop: "1rem",
    padding: "3.6rem",

    paddingTop: theme.spacing(2.4),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "1.6rem",
    },
  },

  avatar: {
    width: "3.1rem",
    height: "3.1rem",
    marginLeft: "50%",
    marginBottom: "0.6rem",
    transform: "translateX(-50%)",
    backgroundImage: "linear-gradient(45deg, #2196f3,  70%, #045694 90%)",
  },

  heading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "0.4rem",
    marginTop: "0.6rem",
    color: "#1853F3",
    fontSize: "2rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.4rem",
    },
  },

  input: {
    "& label": {
      color: theme.palette.info.main,
      fontSize: "1.2rem",
      fontWeight: "550",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#2196f3 ",
        paddingBottom: "2.8rem",
      },
    },
    paddingBottom: theme.spacing(2.8),
    width: "80%",

    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  // for product edit screen
  inputProduct: {
    "& label": {
      color: theme.palette.info.main,
      fontSize: "1.2rem",
      fontWeight: "550",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#2196f3 ",
        paddingBottom: "2.8rem",
      },
    },
    paddingBottom: theme.spacing(3.8),
    width: "100%",

    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  button: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    width: "80%",
    marginTop: "0.8rem",
    marginBottom: "0rem",

    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  // for product edit screen
  buttonProduct: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    width: "50%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem",

    [theme.breakpoints.down("xs")]: {
      width: "76%",
      marginBottom: "3rem",
    },
  },

  // upload image button
  uploadButton: {
    marginTop: "0.8rem",
    marginBottom: "0.4rem",
    marginRight: "0rem",
    width: "100%",
    "&:hover": {
      cursor: "pointer",
    },
  },

  icon: {
    width: "1.2rem",
  },

  register: {
    paddingTop: theme.spacing(2.8),
    marginLeft: "9rem",

    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
    },
  },

  login: {
    paddingTop: theme.spacing(2),
    marginLeft: "9rem",

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
