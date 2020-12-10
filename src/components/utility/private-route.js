import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ userId, children, ...rest }) => {
  console.log(children);
  console.log(userId);
  return (
    <Route {...rest}>
      {userId ? children : <Redirect to="/sign-up" />}
    </Route>
  );
};

export default PrivateRoute;
