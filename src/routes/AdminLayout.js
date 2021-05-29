import React from "react";
import { Route, Switch } from "react-router";

// PAGES
import AdminPage from "../pages/AdminPage";

const AdminLayout = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/admin/profile" component={AdminPage} />
      </Switch>
    </div>
  );
};

export default AdminLayout;
