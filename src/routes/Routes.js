import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

// COMPONENTS
import AlertMsg from "../components/AlertMsg";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ROUTES
import AdminLayout from "./AdminLayout";
import PublicLayout from "./PublicLayout";
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    };
  }, [status]);

  return (
    <div>
      <AlertMsg />
      <Header status={status} setStatus={setStatus} />
      <Switch>
        <ProtectedRoute path="/admin" component={AdminLayout} />
        <Route path="/" component={PublicLayout} />
      </Switch>
      <Footer status={status} />
    </div>
  );
};

export default Routes;
