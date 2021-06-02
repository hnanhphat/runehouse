import React from "react";
import { Redirect, Route } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = (rest) => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isAuthenticated = isAdmin;
  if (isAuthenticated !== "User") return <Route {...rest} />;
  return <Redirect to="/login" />;
};

export default ProtectedRoute;
