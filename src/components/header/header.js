import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import "./header.scss";
import { IconButton, InputBase, makeStyles, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Logo } from "../icons";
import { withJsonPlaceholderService } from "../hoc";

const useStyles = makeStyles(() => ({
  avatar: {
    width: "70px",
    height: "70px",
    marginRight: "10px",
  },
  myPageButton: {
    backgroundColor: "#ff9331",
    color: "white",
    "&:hover": {
      backgroundColor: "#a65810",
    },
  },
  search: {
    padding: "0 10px",
  },
}));
function Header(props) {
  const myId = window.localStorage.getItem("myId");
  
  const [userPhoto, setPhoto] = useState("");
  useEffect(() => {
    props.jsonPlaceholderService.getUserPhoto(myId).then((data) => {
      setPhoto(data.hits[0].webformatURL);
    });
  }, []);
  const classes = useStyles();
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Link className="header__logo logo" to="/">
            <Logo />
          </Link>
          <div className="header__search">
            <Paper component="form" className={classes.search}>
              <InputBase
                className={classes.input}
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
              />
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
              ></IconButton>
            </Paper>
          </div>
          <Avatar src={userPhoto} alt="ava" className={classes.avatar}></Avatar>
          <Button
            variant="contained"
            component={Link}
            to={`/home/${myId}`}
            className={classes.myPageButton}
          >
            Моя страничка
          </Button>
        </div>
      </div>
    </header>
  );
}
export default withJsonPlaceholderService()(Header);
