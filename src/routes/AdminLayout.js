import React from "react";
import { Route, Switch } from "react-router";
import { useLocation } from "react-router-dom";

// COMPONENTS
import MainVisual from "../components/MainVisual";
import Breadcrumb from "../components/Breadcrumb";
import AdminSidebar from "../components/AdminSidebar";

// PAGES
import AdminUsersPage from "../pages/AdminUsersPage";
import AdminCardsPage from "../pages/AdminCardsPage";

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div id="admin" className="admin bg-grey">
      <MainVisual
        heading={
          location.pathname === "/admin"
            ? "Admin"
            : location.pathname.replace("/admin/", "")[0].toUpperCase() +
              location.pathname.replace("/admin/", "").slice(1)
        }
      />
      {location.pathname === "/admin" ? (
        <Breadcrumb leaf="admin" />
      ) : (
        <Breadcrumb
          branch="admin"
          leaf={location.pathname.replace("/admin/", "")}
        />
      )}
      <div className="admin__container">
        <AdminSidebar />
        <Switch>
          <Route exact path="/admin/users" component={AdminUsersPage} />
          <Route exact path="/admin/cards" component={AdminCardsPage} />
        </Switch>
      </div>
    </div>
  );
};

export default AdminLayout;
