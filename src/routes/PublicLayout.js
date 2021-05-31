import React from "react";
import { Route, Switch } from "react-router";

// PAGES
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

import ProfilePage from "../pages/ProfilePage";

import ProductPage from "../pages/ProductPage";
import CollectionPage from "../pages/CollectionPage";
import ProductDetailPage from "../pages/ProductDetailPage";

import NewsPage from "../pages/NewsPage";
import NewsDetailPage from "../pages/NewsDetailPage";

import ReaderPage from "../pages/ReaderPage";
import ReaderDetailPage from "../pages/ReaderDetailPage";

import CartPage from "../pages/CartPage";

import OrderPage from "../pages/OrderPage";

import VerifyPage from "../pages/VerifyPage";

import NotFoundPage from "../pages/NotFoundPage";

const PublicLayout = () => {
  return (
    <div id="wrap">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />

        {/* PROFILE */}
        <Route exact path="/profile" component={ProfilePage} />

        {/* PRODUCTS */}
        <Route exact path="/products" component={ProductPage} />
        <Route exact path="/collection" component={CollectionPage} />
        <Route exact path="/products/:id" component={ProductDetailPage} />
        {/* <Route exact path="/products/:id" component={ProductDetailPage} /> */}

        {/* NEWS */}
        <Route exact path="/news" component={NewsPage} />
        <Route exact path="/news/:id" component={NewsDetailPage} />

        {/* READERS */}
        <Route exact path="/readers" component={ReaderPage} />
        <Route exact path="/readers/:id" component={ReaderDetailPage} />

        {/* CARTS */}
        <Route exact path="/cart" component={CartPage} />

        {/* ORDER */}
        <Route exact path="/orders" component={OrderPage} />

        {/* VERIFY */}
        <Route exact path="/verify/:code" component={VerifyPage} />

        <Route path="*" component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default PublicLayout;
