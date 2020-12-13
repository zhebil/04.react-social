import React from "react";
import { Link } from "react-router-dom";

import "./menu.scss";

const Menu = ({ myId, closeMenu }) => {
  if (myId) {
    return (
      <>
        <nav className={`menu`}>
          <ul className="menu__list">
            <li className="menu__item">
              <Link to="/home" className="menu__link">
                Домой
              </Link>
            </li>
            <li className="menu__item">
              <Link to={`/${myId}/photos`} className="menu__link">
                Мои фото
              </Link>
            </li>
            <li className="menu__item">
              <Link to={`/${myId}/todos`} className="menu__link">
                Todos
              </Link>
            </li>
            <li className="menu__item">
              <Link to={`/people`} className="menu__link">
                Люди
              </Link>
            </li>
            <li className="menu__item">
              <Link to={`/photos/start`} className="menu__link">
                Найти фото
              </Link>
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
            <Link to={`/people`} className="menu__link">
              Люди
            </Link>
          </li>
          <li className="menu__item">
            <Link to={`photos/start`} className="menu__link">
              Найти фото
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Menu;
