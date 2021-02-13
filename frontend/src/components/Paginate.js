import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
      width: "70rem",
      display: "flex",
      justifyContent: "center",
    },
  },
  mobile: {
    marginTop: theme.spacing(2),
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

export default function BasicPagination({ totalPage, setPaginate, isMobile }) {
  const classes = useStyles();

  const handleChange = (event, page) => {
    setPaginate((prev) => ({
      ...prev,
      currentPage: page,
    }));
    if (isMobile) {
      window.scrollTo(0, 2820);
    } else {
      window.scrollTo(0, 3000);
    }
  };

  return (
    <div className={isMobile ? classes.mobile : classes.root}>
      <Pagination
        className={classes.paginate}
        count={totalPage}
        onChange={handleChange}
        shape="rounded"
        color="primary"
        size={isMobile ? "small" : "large"}
      />
    </div>
  );
}
