import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: "36ch",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },

    divider: {
      marginBottom: "0.5rem",
      marginTop: "0.3rem",
    },
    avatar: {
      width: "5rem",
      height: "5rem",
      marginRight: "1.4rem",
    },
    paper: {
      marginBottom: "1.8rem",
      padding: "0.4rem 1rem 1rem 0",
    },
    list_item: {
      marginLeft: "2rem",
    },
    order_summary: {
      fontSize: "1.6rem",
      margin: "auto",
    },

    order_link: {
      textDecoration: "none",
    },

    message: {
      paddingLeft: "2rem",
      marginTop: "0.8rem",
      width: "100%",
    },

    shipping: {
      marginRight: "2.8rem",
    },

    email: {
      color: "#000",
      textDecoration: "none",
    },
  })
);
