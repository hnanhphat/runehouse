import React from "react";
import { Route, Switch } from "react-router";

// PAGES
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

import NewsPage from "../pages/NewsPage";

import NotFoundPage from "../pages/NotFoundPage";

const PublicLayout = () => {
  return (
    <div id="home">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />

        <Route exact path="/news" component={NewsPage} />

        <Route path="*" component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default PublicLayout;
