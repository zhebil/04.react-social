import React  from "react";
import Header from "../header";
import "../scss/app.scss";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Home, People, Todos, Welcome, Photos } from "../pages";
import Footer from "../footer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getId } from "../../actions";

function App({ userId, getId }) {
  if (!userId) {
    getId();
  }
  
  return (
    <Router>
      {/* {userId ? null : <Redirect to="/sign-up" />} */}

      <Header />

      <Switch>
        <Route exact path="/">
          <Redirect to="/home/" />
        </Route>
        <Route path="/sign-up">
          <Welcome />
        </Route>
        <Route
          path="/home"
          exact
          render={() => {
            return <Home id={userId} />;
          }}
        />
        <Route
          path="/home/:id"
          exact
          render={({ match }) => {
            const { id } = match.params;
            return <Home id={id} />;
          }}
        />
        <Route path="/people" component={People} />
        <Route path="/:id/todos">
          <Todos/>
        </Route>
        <Route path="/:id/photos">
          <Photos/>
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
