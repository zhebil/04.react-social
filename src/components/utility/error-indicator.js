import React from "react";
export default function ErrorIndicator() {
  return (
    <div className="error">
      <div className="container">
        <h1 className="title error__title">Ошибка!</h1>
        <p className="error__message">
          Что-то пошло не так. Попробуйте позже и{" "}
          <a href="https://t.me/zhebil" className="link">
            сообщите об ошибке
          </a>
        </p>
      </div>
    </div>
  );
}
