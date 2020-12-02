import React from "react";

import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import { IconButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  arrowBack: {
    padding: "5px",
    margin: "5px",
    color: "inherit",
    transform: "rotate(90deg)",
    transition: "all 0.4s ease"
  },
  arrowRotate: {
    transform: "rotate(-90deg)",
    
  }
}));
export default function SeeMore({ setMore, more}) {
  const classes = useStyles();
  return (
    <div className="icon-link">
      {more ? "Hide" : "See more"}
      <IconButton
        onClick={() => {
          setMore();
        }}
        className={`${classes.arrowBack} ${more? classes.arrowRotate : ""}`}
        aria-label="see all"
      >
        <TrendingFlatIcon />
      </IconButton>
    </div>
  );
}
