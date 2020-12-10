import React, { useState } from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import "./menu.scss";
import { makeStyles } from "@material-ui/core";
// Домашняя страница
// Мои фотографии
// Мои дела
// Люди
// Поиск фотографий
// Выход
const useStyle = makeStyles(() => ({
  button: {
    backgroundColor: "#ff9331",
    color: "white",
    width: "100%",
    height: "50px",
    "&:hover": {
      backgroundColor: "#a65810",
    },
  },
}));
const Menu = ({ myId,isOpen, closeMenu }) => {
  const classes = useStyle()
  if (myId) {
    return (
      <>
        <nav className={`menu ${isOpen && "menu--active"}`}>
          <ul className="menu__list">
            <li className="menu__item">
              <Link to="/home" className="menu__link">
                Домашняя страница
              </Link>
            </li>
            <li className="menu__item">
              <Link to={`/${myId}/photos`} className="menu__link">
                Мои фотографии
              </Link>
            </li>
            <li className="menu__item">
              <Link to={`/${myId}/todos`} className="menu__link">
                Мои дела
              </Link>
            </li>
            <li className="menu__item">
              <Link to={`/people`} className="menu__link">
                Люди
              </Link>
            </li>
            <li className="menu__item">
              <Link to={`photos/start`} className="menu__link">
                Поиск фотографий
              </Link>
            </li>
            <li className="menu__item-button">
              <Button variant="contained" className={classes.button}>
                Выход
              </Button>
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
            <Link to={`/peoples`} className="menu__link">
              Люди
            </Link>
          </li>
          <li className="menu__item">
            <Link to={`photos/start`} className="menu__link">
              Поиск фотографий
            </Link>
          </li>
          <li className="menu__item-button">
            <Button
              component={Link}
              to={`/sign-up`}
              variant="contained"

              className={classes.button}
            >
              Регистрация
            </Button>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Menu;
