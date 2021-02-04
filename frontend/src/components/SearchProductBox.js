import React, { useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from "./CustomStyles/header";
import { Button } from "@material-ui/core";

export default function SearchBox({ history }) {
  const classes = useStyles();

  const [keyword, setKeyword] = useState("");

  const submitHandler = () => {
    if (keyword.trim()) {
      history.push(`/search?name=${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      <Button
        className="ml-4"
        style={{
          backgroundColor: "#fff",
          boxShadow: "inset 0 0 6px #0267B5",
          color: "#0267B5",
        }}
        variant="contained"
        onClick={submitHandler}
      >
        Search
      </Button>
    </>
  );
}
