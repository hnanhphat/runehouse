import React from "react";
import { Redirect, Route } from "react-router";

const ProtectedRoute = (rest) => {
  const isAuthenticated = false;
  if (isAuthenticated) return <Route {...rest} />;
  return <Redirect to="/login" />;
};

export default ProtectedRoute;
