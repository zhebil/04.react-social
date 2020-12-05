import React, { useEffect, useState } from "react";
// import { useState } from "react";
import { ErrorIndicator, GoBack, Spinner } from "../utility";

import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withJsonPlaceholderService } from "../hoc";
import { todoLoaded } from "../../actions";
import "./home.scss";
import PersonDetails from "../personDetails";
import Todo from "../todo";
import { UserPhotos } from "../photo";
import UserPosts from "../posts";
function Home(props) {
  const {
    jsonPlaceholderService,
    id = props.userId,
    todoLoaded,
    todos,
  } = props;

  const [fetch, setFetch] = useState({ loading: true, error: false });
  const [userData, setUserData] = useState({});
  const [userPhoto, setPhoto] = useState("");

  useEffect(() => {
    jsonPlaceholderService.getUserPhoto(id).then((data) => {
      setPhoto(data.hits[0].webformatURL);
    });

    const fetching = async () => {
      setFetch({ loading: true, error: false });

      await jsonPlaceholderService
        .getUser(id)
        .then((data) => setUserData(data));
      await jsonPlaceholderService
        .getUserTodos(id)
        .then((data) => todoLoaded(data));
      setFetch({ loading: false, error: false });
    };
    fetching();
  }, [id, jsonPlaceholderService, todoLoaded]);
  if (fetch.loading) {
    return <Spinner />;
  }
  if (fetch.error) {
    return <ErrorIndicator />;
  }
  return (
    <section className="home">
      <div className="container">
        <div className="home__inner">
          <GoBack />
          <h1 className="title home__title">Home page</h1>
          <div className="home__wrapper">
            <div className="home__right">
              <PersonDetails peopleData={userData} userPhoto={userPhoto} />
            </div>
            <div className="home__left">
              <Todo isPage={false} id={id} todos={todos} />
              <UserPhotos id={id} />
              <UserPosts
                id={id}
                userPhoto={userPhoto}
                userName={userData.name}
                userMail={userData.email}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    userId: state.userInfo.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      todoLoaded: todoLoaded,
    },
    dispatch
  );
};

export default compose(
  withJsonPlaceholderService(),
  connect(mapStateToProps, mapDispatchToProps)
)(Home);
