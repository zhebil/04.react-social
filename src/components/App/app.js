import React, { useEffect, useState } from "react";
import Header from "../header";
import "../scss/app.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, People, Welcome } from "../pages";
import Footer from "../footer";

function App() {
  window.localStorage.setItem("myId", 1);
  
  return (
    <Router>
      <Header />

      <Switch>
        <Route path="/" component={Welcome} exact />
        <Route
          path="/home/:id"
          exact
          render={({ match }) => {
            const { id } = match.params;
            return <Home id={id} />;
          }}
        />
        <Route path="/people" component={People} />
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
