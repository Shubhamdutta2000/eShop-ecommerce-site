import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
      width: "80rem",
      display: "flex",
      justifyContent: "center",
    },
  },
}));

export default function BasicPagination({ totalPage, setPaginate, isMobile }) {
  const classes = useStyles();

  const handleChange = (event, page) => {
    setPaginate((prev) => ({
      ...prev,
      currentPage: page,
    }));
    window.scrollTo(0, 3000);
  };

  return (
    <div className={classes.root}>
      <Pagination
        className={classes.paginate}
        count={totalPage}
        onChange={handleChange}
        shape="rounded"
        color="primary"
        size="large"
      />
    </div>
  );
}
