import React from "react";
import { Route, Switch } from "react-router";

// PAGES
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

import ProductPage from "../pages/ProductPage";
import ProductDetailPage from "../pages/ProductDetailPage";

import NewsPage from "../pages/NewsPage";

import ReaderPage from "../pages/ReaderPage";

import CartPage from "../pages/CartPage";

import VerifyPage from "../pages/VerifyPage";

import NotFoundPage from "../pages/NotFoundPage";

const PublicLayout = () => {
  return (
    <div id="wrap">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />

        {/* PRODUCTS */}
        <Route exact path="/products" component={ProductPage} />
        <Route exact path="/products/:id" component={ProductDetailPage} />

        {/* NEWS */}
        <Route exact path="/news" component={NewsPage} />

        {/* READERS */}
        <Route exact path="/readers" component={ReaderPage} />

        {/* CARTS */}
        <Route exact path="/cart" component={CartPage} />

        <Route exact path="/verify/:code" component={VerifyPage} />

        <Route path="*" component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default PublicLayout;
