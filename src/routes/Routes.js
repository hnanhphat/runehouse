import React from "react";
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
  return (
    <div>
      <AlertMsg />
      <Header />
      <Switch>
        <ProtectedRoute path="/admin" component={AdminLayout} />
        <Route path="/" component={PublicLayout} />
      </Switch>
      <Footer />
    </div>
  );
};

export default Routes;
