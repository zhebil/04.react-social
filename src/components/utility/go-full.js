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
  arrowLeft: {
    transform: "rotate(180deg)"
  }
}));
export default function GoFull({
  path,
  text = "Посмотреть всё",
  direction = "right",
}) {
  const classes = useStyles();
  return (
    <Link className="icon-link" to={path}>
      {direction === "right" ? text : null}
      <IconButton
        className={`${classes.arrowBack} ${
          direction === "left" ? classes.arrowLeft : null
        }`}
        aria-label={text}
      >
        <TrendingFlatIcon />
      </IconButton>
      {direction === "left" ? text : null}
    </Link>
  );
}
