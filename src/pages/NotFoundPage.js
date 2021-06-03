import React from "react";
import { Link } from "react-router-dom";
import MainVisual from "../components/MainVisual";
import Breadcrumb from "../components/Breadcrumb";

const NotFoundPage = () => {
  return (
    <div id="_404" className="_404">
      <MainVisual heading="404" />
      <Breadcrumb leaf="404" />
      <div className="_404__area">
        <div className="_404__container">
          <h3 className="tit">404</h3>
          <p className="content">
            Page not found.
            <Link to="/">Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
