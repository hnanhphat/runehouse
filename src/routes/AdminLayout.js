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
import AdminProductsPage from "../pages/AdminProductsPage";
import AdminNewsPage from "../pages/AdminNewsPage";
import AdminOrdersPage from "../pages/AdminOrdersPage";
import AdminAppointmentsPage from "../pages/AdminAppointmentsPage";

import { withNamespaces } from "react-i18next";

const AdminLayout = ({ t }) => {
  const location = useLocation();

  return (
    <div id="admin" className="admin bg-grey">
      <MainVisual
        heading={
          location.pathname === "/admin"
            ? t("a.Admin")
            : t(
                `asb.${
                  location.pathname.replace("/admin/", "")[0].toUpperCase() +
                  location.pathname.replace("/admin/", "").slice(1)
                }`
              )
        }
      />
      {location.pathname === "/admin" ? (
        <Breadcrumb leaf="admin" />
      ) : (
        <Breadcrumb
          branch="admin"
          branchTxt={t("a.Admin")}
          leaf={t(`a.${location.pathname.replace("/admin/", "")}`)}
        />
      )}
      <div className="admin__container">
        <AdminSidebar />
        <Switch>
          <Route exact path="/admin/users" component={AdminUsersPage} />
          <Route exact path="/admin/cards" component={AdminCardsPage} />
          <Route exact path="/admin/products" component={AdminProductsPage} />
          <Route exact path="/admin/news" component={AdminNewsPage} />
          <Route exact path="/admin/orders" component={AdminOrdersPage} />
          <Route
            exact
            path="/admin/appointments"
            component={AdminAppointmentsPage}
          />
        </Switch>
      </div>
    </div>
  );
};

export default withNamespaces()(AdminLayout);
