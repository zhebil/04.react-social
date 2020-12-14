import React, { useEffect } from "react";
import { useState } from "react";
import { compose } from "redux";

import { withJsonPlaceholderService } from "../hoc";
import PeopleCard from "../people-card";
import { ErrorIndicator, GoBack, Spinner } from "../utility";
import "./scss/people.scss";
function People({ jsonPlaceholderService }) {
  const [fetch, setFetch] = useState({ loading: true, error: false });
  const [users, setUsers] = useState({});
  useEffect(() => {
    jsonPlaceholderService.getAllUsers().then((data) => {
      setUsers(data);
      setFetch({ loading: false, error: false });
    }).catch(e=> {
      console.log(e);
      setFetch({loading: false, error: true})
    });;
  }, [jsonPlaceholderService]);
  if (fetch.loading) {
    return <Spinner />;
  }
  if (fetch.error) {
    return <ErrorIndicator />;
  }

  return (
    <section className="peoples">
      <div className="container">
        <div className="peoples__inner">
          <GoBack path="/" />
          <h1 className="peoples__title title">Пользователи:</h1>
          <ul className="peoples__list">
            {users.map((item) => {
              return <PeopleCard key={item.id} people={item} />;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
export default compose(withJsonPlaceholderService())(People);
