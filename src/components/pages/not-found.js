import React from "react";
import { Link } from "react-router-dom";
import "./scss/not-found.scss"
export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
      <p className="not-found__number">404</p>
        <h1 className="not-found__text">
          Страница не найдена. Проверьте адрес или{" "}
          <Link to="/" className="link">
            вернитесь на главную страницу
          </Link>
        </h1>
      </div>
    </section>
  );
}
