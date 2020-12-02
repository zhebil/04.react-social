import React from "react";

import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import { IconButton, makeStyles } from "@material-ui/core";

import { Link } from "react-router-dom";
const useStyles = makeStyles(() => ({
  arrowBack: {
    padding: "5px",
    marginLeft: "10px",
    color: "inherit",
  },
}));
export default function GoFull({ path }) {
  const classes = useStyles();
  return (
    <Link className="icon-link" to={path}>
      See all
      <IconButton className={classes.arrowBack} aria-label="see all">
        <TrendingFlatIcon />
      </IconButton>
    </Link>
  );
}
