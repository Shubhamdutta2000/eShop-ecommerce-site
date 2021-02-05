import React, { useEffect, useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from "./CustomStyles/header";
import { Button } from "@material-ui/core";

export default function SearchBox({ history }) {
  const classes = useStyles();

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (keyword.trim()) {
      history.push(`/search?name=${keyword}`);
    } else {
      history.push("/");
    }
  }, [keyword, history]);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          value={keyword}
          onChange={handleSearchChange}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </>
  );
}
