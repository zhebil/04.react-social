import React from "react";
import Header from "../header";
import "../scss/app.scss";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Home, People, Todos, Welcome, PhotoPage, PhotoSearch } from "../pages";
import Footer from "../footer";
import { PrivateRoute } from "../utility";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getId } from "../../actions";

function App({ userId, getId }) {
  // if (!userId) {
  getId();
  // if (userId === null) {
  // console.log(history);
  // history.push("/sign-up");
  // }
  // console.log(userId);
  // }

  return (
    <Router>
      {/* {!userId? <Redirect to="/sign-up"/> : null} */}
      <Header />

      <Switch>
        <Route exact path="/">
          <Redirect to="/home/" />
        </Route>
        <Route path="/sign-up">
          <Welcome />
        </Route>
        <PrivateRoute userId={userId} path="/home" exact>
          <Home id={userId} />
        </PrivateRoute>
        <PrivateRoute userId={userId} path="/home/:id" exact>
          <Home />
        </PrivateRoute>
        <Route path="/people" component={People} />
        <Route path="/:id/todos">
          <Todos />
        </Route>
        <Route path="/:id/photos">
          <PhotoPage />
        </Route>
        <Route path="/photos/start">
          <PhotoSearch />
        </Route>
        <Route path="/photos/:params">
          <PhotoSearch />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

const mapStateToProps = (state, ownProps) => {
  return { userId: state.userInfo.userId };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getId: getId,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
