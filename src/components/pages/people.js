import React, { useEffect } from "react";
import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";

import { withJsonPlaceholderService } from "../hoc";
import { ErrorIndicator, GoBack, Spinner } from "../utility";
import "./people.scss";
function People({ jsonPlaceholderService, history, location }) {
  const [fetch, setFetch] = useState({ loading: true, error: false });
  const [users, setUsers] = useState({});
  useEffect(() => {
    jsonPlaceholderService.getAllUsers().then((data) => {
      setUsers(data);
      setFetch({ loading: false, error: false });
    });
  }, []);
  if (fetch.loading) {
    return <Spinner />;
  }
  if (fetch.error) {
    return <ErrorIndicator />;
  }

  const listItem = users.map((item) => {
    return (
      <li className="peoples__item" key={item.id}>
        <Link to={`home/${item.id}`} className="peoples__item-value">
          Name: {item.name}
        </Link>
        <span className="peoples__item-value">email: {item.email}</span>
      </li>
    );
  });

  return (
    <section className="peoples">
      <div className="container">
        <div className="peoples__inner">
          <GoBack  path="/" />
          <h1 className="peoples__title title">People Page</h1>
          <ul className="peoples__list">{listItem}</ul>
        </div>
      </div>
    </section>
  );
}
export default compose(withRouter, withJsonPlaceholderService())(People);
