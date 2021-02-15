import { createStyles, makeStyles } from "@material-ui/core/styles";

// MOBILE BREAKPOINT
const isMobile = window.innerWidth <= 768;
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
      width: isMobile ? "3.9rem" : "6.5rem",
      height: isMobile ? "3.9rem" : "6.5rem",
      marginRight: "1rem",
    },
    paper: {
      marginBottom: "1.8rem",
      padding: "0.4rem 1rem 1rem 0",
    },
    list_item: {
      paddingLeft: isMobile ? "1.2rem" : "3.4rem",
      paddingRight: "1rem",
      paddingBottom: "1.4rem",
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
      marginRight: isMobile ? "1.8rem" : "2.8rem",
    },

    email: {
      color: "#000",
    },

    qty: {
      fontSize: "1.3rem",
      fontWeight: "450",
    },
  })
);
