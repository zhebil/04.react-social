import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import "./header.scss";
import { makeStyles } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { Logo } from "../icons";
import Menu from "../menu";
import { withJsonPlaceholderService } from "../hoc";
import { Mobile } from "../utility/media";
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
  secondButton: {
    backgroundColor: "#a65810",
    marginLeft: "15px",
    "&:hover": {
      backgroundColor: "#ff9331",
    },
  },
}));
function Header(props) {
  const myId = window.localStorage.getItem("myId");

  const [openMenu, setOpenMenu] = useState(false);
  const [userPhoto, setPhoto] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (myId) {
      props.jsonPlaceholderService.getUserPhoto(myId).then((data) => {
        setPhoto(data.hits[0].webformatURL);
      });
    }
  }, [props.jsonPlaceholderService, myId]);
  const classes = useStyles();
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Link className="header__logo" to="/">
            <div className="logo">
              <Logo />
            </div>
            <p>React Social</p>
          </Link>
          <Menu
            closeMenu={() => {
              setOpenMenu(false);
            }}
            myId={myId}
          />
          {myId ? (
            <>
              <Avatar src={userPhoto} alt="ava" className={classes.avatar} />
              <Button
                variant="contained"
                component={Link}
                to={`/home/${myId}`}
                className={classes.myPageButton}
              >
                Моя страничка
              </Button>

              <Button
                component={Link}
                to={`/sign-up`}
                variant="contained"
                className={`${classes.myPageButton} ${classes.secondButton}`}
                onClick={() => {
                  localStorage.removeItem("myId");

                  history.push("/");
                  setPhoto("");
                }}
              >
                Выход
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                component={Link}
                to={`/sign-up`}
                className={classes.myPageButton}
              >
                Регистрация
              </Button>
            </>
          )}
          <Mobile>
            <button
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
              className={`menu__burger ${openMenu && "manu__burger--active"}`}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </Mobile>
        </div>
      </div>
    </header>
  );
}
export default withJsonPlaceholderService()(Header);
