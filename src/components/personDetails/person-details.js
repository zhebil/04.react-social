import React, { useState } from "react";
import { SeeMore } from "../utility";
export default function PersonDetails({ peopleData, userPhoto }) {
  const [more, setMore] = useState(false);
  const {
    name,
    username,
    email,
    phone,
    address,
    company,
    // website,
  } = peopleData;
  const hidenContent = (
    <>
      <h2 className="home__subtitle page-block__title">Карьера:</h2>
      <table className="home__table">
        <tbody>
          <tr>
            <td className="home__prop">Компания:</td>
            <td className="home__value">
              <a className="link" href="/">
                
                {company.name}
              </a>
            </td>
          </tr>
          <tr>
            <td className="home__prop">Ключевые слова:</td>
            <td className="home__value">
              {company.catchPhrase.split(" ").map((item, idx) => {
                return (
                  <a className="link" key={idx} href="/">
                    {item}
                  </a>
                );
              })}
            </td>
          </tr>
          <tr>
            <td className="home__prop">Сфера занятости:</td>
            <td className="home__value">
              {company.bs.split(" ").map((item, idx) => {
                return (
                  <a className="link" key={idx} href="/">
                    {item}
                  </a>
                );
              })}{" "}
            </td>
          </tr>
        </tbody>
      </table>
      <h2 className="home__subtitle page-block__title">Адресс:</h2>
      <table className="home__table">
        <tbody>
          <tr>
            <td className="home__prop">Город:</td>
            <td className="home__value">
              <a className="link" href="/">
                {address.city}
              </a>
            </td>
          </tr>
          <tr>
            <td className="home__prop">Улица:</td>
            <td className="home__value">{address.street}</td>
          </tr>
          <tr>
            <td className="home__prop">Дом:</td>
            <td className="home__value">{address.suite}</td>
          </tr>
          <tr>
            <td className="home__prop">Почтовый индекс:</td>
            <td className="home__value">{address.zipcode}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
  let content = more ? hidenContent : null;
  return (
    <div className="home__person page-block">
      <h2 className="home__name">{username}</h2>

      <div className="home__img">
        <img src={userPhoto} alt="" />
      </div>

      <div className="home__details">
        <h2 className="home__subtitle page-block__title">Обо мне:</h2>
        <table className="home__table">
          <tbody>
            <tr>
              <td className="home__prop">Имя:</td>
              <td className="home__value">{name}</td>
            </tr>
            <tr>
              <td className="home__prop">Email:</td>
              <td className="home__value">
                <a className="link" href={`mailto:${email}`}>
                  {email}
                </a>
              </td>
            </tr>
            <tr>
              <td className="home__prop">Телефон:</td>
              <td className="home__value">
                <a className="link" href={`tel:${phone}`}>
                  {phone}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        {content}
        <div className="home__link">
          <SeeMore setMore={() => setMore(!more)} more={more} />
        </div>
      </div>
    </div>
  );
}
