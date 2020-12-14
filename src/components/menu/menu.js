import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { Mobile } from "../utility/media";

import "./menu.scss";
const useStyles = makeStyles(() => ({
  myPageButton: {
    backgroundColor: "#ff9331",
    color: "white",
    width: 110,
    height: 40,
    marginTop: 20,
    "&:hover": {
      backgroundColor: "#a65810",
    },
  },
}));
const Menu = ({ myId, closeMenu, openMenu, logOut }) => {
  const classes = useStyles();
  if (myId) {
    return (
      <>
        <nav className={`menu ${openMenu && "menu--active"}`}>
          <ul className="menu__list">
            <li className="menu__item">
              <Link to="/home" onClick={closeMenu} className="menu__link">
                Домой
              </Link>
            </li>
            <li className="menu__item">
              <Link
                to={`/${myId}/photos`}
                onClick={closeMenu}
                className="menu__link"
              >
                Мои фото
              </Link>
            </li>
            <li className="menu__item">
              <Link
                to={`/${myId}/todos`}
                onClick={closeMenu}
                className="menu__link"
              >
                Todos
              </Link>
            </li>
            <li className="menu__item">
              <Link to={`/people`} onClick={closeMenu} className="menu__link">
                Люди
              </Link>
            </li>
            <li className="menu__item">
              <Link
                to={`/photos/start`}
                onClick={closeMenu}
                className="menu__link"
              >
                Найти фото
              </Link>
            </li>
            <li className="menu__button">
              <Mobile>
                <Button
                  component={Link}
                  to={`/sign-up`}
                  variant="contained"
                  className={`${classes.myPageButton}`}
                  onClick={() => {
                    logOut();
                    closeMenu();
                  }}
                >
                  Выход
                </Button>
              </Mobile>
            </li>
          </ul>
        </nav>
      </>
    );
  } else {
    return (
      <nav className="menu">
        <ul className="menu__list">
          <li className="menu__item">
            <Link onClick={closeMenu} to={`/people`} className="menu__link">
              Люди
            </Link>
          </li>
          <li className="menu__item">
            <Link
              onClick={closeMenu}
              to={`photos/start`}
              className="menu__link"
            >
              Найти фото
            </Link>
          </li>
          <li className="menu__button">
            <Mobile>
              <Button
                variant="contained"
                component={Link}
                to={`/sign-up`}
                onClick={closeMenu}
                className={classes.myPageButton}
              >
                Регистрация
              </Button>
            </Mobile>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Menu;
