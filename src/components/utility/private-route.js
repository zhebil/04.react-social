import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ userId, children, ...rest }) => {
  return (
    <Route {...rest}>
      {userId !== null ? children : <Redirect to="/sign-up" />}
    </Route>
  );
};

export default PrivateRoute;
