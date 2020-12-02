import React from "react";

import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import { IconButton, makeStyles } from "@material-ui/core";

import { Link, withRouter } from "react-router-dom";
const useStyles = makeStyles(() => ({
  arrowBack: {
    transform: "rotate(180deg)",
    padding: "5px",
    marginRight: "10px",
    color: "inherit",
  },
}));
function GoBack({ path, history }) {
  const classes = useStyles();
  return (
    <a
      href="/"
      onClick={(e) => {
        e.preventDefault();
        history.goBack();
      }}
      className="icon-link"
      to={path}
    >
      <IconButton className={classes.arrowBack} aria-label="go back">
        <TrendingFlatIcon />
      </IconButton>
      Go back
    </a>
  );
}
export default withRouter(GoBack);
