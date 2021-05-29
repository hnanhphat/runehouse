import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { authActions } from "../redux/actions/auth.actions";
import Breadcrumb from "../components/Breadcrumb";

const VerifyPage = () => {
  const { code } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.verify(code));
  }, [dispatch, code]);
  return (
    <div id="verify" className="verify">
      <Breadcrumb leaf="verify" />
      <div className="verify__area">
        <div className="verify__container">
          <h3 className="tit">Verification</h3>
          <p className="content">
            Thank you for your interest in our products.
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
