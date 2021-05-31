import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { authActions } from "../redux/actions/auth.actions";
import { routeActions } from "../redux/actions/route.actions";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";

import MainVisual from "../components/MainVisual";
import Breadcrumb from "../components/Breadcrumb";

const LoginPage = () => {
  const FB_ID = process.env.REACT_APP_FACEBOOK_APP_ID;
  const GG_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const history = useHistory();
  const dispatch = useDispatch();
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const [status, setStatus] = useState(false);
  const [path, setPath] = useState("Sign In");
  const [formSignIn, setFormSignIn] = useState({ email: "", password: "" });
  const [formSignUp, setFormSignUp] = useState({
    avatar: "",
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSignInChange = (e) => {
    setFormSignIn({ ...formSignIn, [e.target.name]: e.target.value });
  };

  const handleSignUpChange = (e) => {
    setFormSignUp({ ...formSignUp, [e.target.name]: e.target.value });
  };

  const handleAvatar = (e) => {
    e.preventDefault();
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        multiple: false,
      },
      function (error, result) {
        if (!error) {
          if (result.event === "success") {
            setFormSignUp({ ...formSignUp, avatar: result.info.url });
          }
        } else {
          console.log(error);
        }
      }
    );
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formSignIn;
    dispatch(authActions.login({ email, password }));
    e.target.reset();
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const { fullname, username, email, password, avatar } = formSignUp;
    dispatch(
      authActions.register({ fullname, username, email, password, avatar })
    );
    e.target.reset();
  };

  const handleFacebookLogin = (user) => {
    dispatch(authActions.loginWithFb(user.accessToken));
  };

  const handleGoogleLogin = (user) => {
    dispatch(authActions.loginWithGg(user.accessToken));
  };

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      setStatus(false);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo]);

  return (
    <div id="login" className="login">
      <MainVisual heading={path} />
      <Breadcrumb leaf={path} />
      <div
        className={`account ${status ? "account--signup" : "account--signin"}`}
      >
        <div className="container container--small container--signin">
          <div className="account__form">
            <h3 className="title">Sign in to Rune House</h3>
            <div className="social">
              <div className="social__fb">
                <FacebookLogin
                  appId={FB_ID}
                  fields="name,email,picture"
                  callback={(user) => {
                    handleFacebookLogin(user);
                  }}
                  onFailure={(error) => {
                    console.log("Facebook login error:", error);
                  }}
                  cssClass=""
                  render={(renderProps) => (
                    <button onClick={renderProps.onClick}>
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="facebook-f"
                        className="svg-inline--fa fa-facebook-f fa-w-10"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path
                          fill="currentColor"
                          d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                        ></path>
                      </svg>
                    </button>
                  )}
                />
              </div>
              <div className="social__gg">
                <GoogleLogin
                  clientId={GG_ID}
                  onSuccess={(user) => {
                    handleGoogleLogin(user);
                  }}
                  onFailure={(error) => {
                    console.log("Google login error:", error);
                  }}
                  cookiePolicy={"single_host_origin"}
                  buttonText=""
                  className=""
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="google-plus-g"
                        className="svg-inline--fa fa-google-plus-g fa-w-20"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path
                          fill="currentColor"
                          d="M386.061 228.496c1.834 9.692 3.143 19.384 3.143 31.956C389.204 370.205 315.599 448 204.8 448c-106.084 0-192-85.915-192-192s85.916-192 192-192c51.864 0 95.083 18.859 128.611 50.292l-52.126 50.03c-14.145-13.621-39.028-29.599-76.485-29.599-65.484 0-118.92 54.221-118.92 121.277 0 67.056 53.436 121.277 118.92 121.277 75.961 0 104.513-54.745 108.965-82.773H204.8v-66.009h181.261zm185.406 6.437V179.2h-56.001v55.733h-55.733v56.001h55.733v55.733h56.001v-55.733H627.2v-56.001h-55.733z"
                        ></path>
                      </svg>
                    </button>
                  )}
                />
              </div>
            </div>
            <p className="note">or use your email account:</p>
            <form className="form" onSubmit={handleSignInSubmit}>
              <div className="form__group form__group--email">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="envelope"
                  className="svg-inline--fa fa-envelope fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                  ></path>
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleSignInChange}
                />
              </div>
              <div className="form__group form__group--password">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="lock"
                  className="svg-inline--fa fa-lock fa-w-14"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
                  ></path>
                </svg>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleSignInChange}
                />
              </div>
              <button type="submit">SIGN IN</button>
            </form>
          </div>
          <div className="account__shape">
            <h3 className="title">Hello, Friend!</h3>
            <p className="txt">
              Enter your personal details
              <br />
              and start journey with us
            </p>
            <button
              onClick={() => {
                setStatus(true);
                setPath("Sign Up");
              }}
            >
              SIGN UP
            </button>
          </div>
        </div>
        <div className="container container--small container--signup">
          <div className="account__shape">
            <h3 className="title">Welcome Back!</h3>
            <p className="txt">
              To keep connected with us please
              <br />
              login with your personal info
            </p>
            <button
              onClick={() => {
                setStatus(false);
                setPath("Sign In");
              }}
            >
              SIGN IN
            </button>
          </div>
          <div className="account__form">
            <h3 className="title">Create Account</h3>
            <p className="note">or use your email for registration:</p>
            <form className="form" onSubmit={handleSignUpSubmit}>
              <div className="form__group form__group--name">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="user"
                  className="svg-inline--fa fa-user fa-w-14"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                  ></path>
                </svg>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Fullname"
                  onChange={handleSignUpChange}
                />
                {formSignUp.avatar ? (
                  <button
                    type="button"
                    className="active"
                    style={{ backgroundImage: `url('${formSignUp.avatar}')` }}
                    onClick={handleAvatar}
                  ></button>
                ) : (
                  <button type="button" onClick={handleAvatar}>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="frown"
                      className="svg-inline--fa fa-frown fa-w-16"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512"
                    >
                      <path
                        fill="currentColor"
                        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 128c-40.2 0-78 17.7-103.8 48.6-8.5 10.2-7.1 25.3 3.1 33.8 10.2 8.4 25.3 7.1 33.8-3.1 16.6-19.9 41-31.4 66.9-31.4s50.3 11.4 66.9 31.4c8.1 9.7 23.1 11.9 33.8 3.1 10.2-8.5 11.5-23.6 3.1-33.8C326 321.7 288.2 304 248 304z"
                      ></path>
                    </svg>
                  </button>
                )}
              </div>
              <div className="form__group form__group--email">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="user-secret"
                  className="svg-inline--fa fa-user-secret fa-w-14"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M383.9 308.3l23.9-62.6c4-10.5-3.7-21.7-15-21.7h-58.5c11-18.9 17.8-40.6 17.8-64v-.3c39.2-7.8 64-19.1 64-31.7 0-13.3-27.3-25.1-70.1-33-9.2-32.8-27-65.8-40.6-82.8-9.5-11.9-25.9-15.6-39.5-8.8l-27.6 13.8c-9 4.5-19.6 4.5-28.6 0L182.1 3.4c-13.6-6.8-30-3.1-39.5 8.8-13.5 17-31.4 50-40.6 82.8-42.7 7.9-70 19.7-70 33 0 12.6 24.8 23.9 64 31.7v.3c0 23.4 6.8 45.1 17.8 64H56.3c-11.5 0-19.2 11.7-14.7 22.3l25.8 60.2C27.3 329.8 0 372.7 0 422.4v44.8C0 491.9 20.1 512 44.8 512h358.4c24.7 0 44.8-20.1 44.8-44.8v-44.8c0-48.4-25.8-90.4-64.1-114.1zM176 480l-41.6-192 49.6 32 24 40-32 120zm96 0l-32-120 24-40 49.6-32L272 480zm41.7-298.5c-3.9 11.9-7 24.6-16.5 33.4-10.1 9.3-48 22.4-64-25-2.8-8.4-15.4-8.4-18.3 0-17 50.2-56 32.4-64 25-9.5-8.8-12.7-21.5-16.5-33.4-.8-2.5-6.3-5.7-6.3-5.8v-10.8c28.3 3.6 61 5.8 96 5.8s67.7-2.1 96-5.8v10.8c-.1.1-5.6 3.2-6.4 5.8z"
                  ></path>
                </svg>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleSignUpChange}
                />
              </div>
              <div className="form__group form__group--email">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="envelope"
                  className="svg-inline--fa fa-envelope fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                  ></path>
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleSignUpChange}
                />
              </div>
              <div className="form__group form__group--password">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="lock"
                  className="svg-inline--fa fa-lock fa-w-14"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
                  ></path>
                </svg>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleSignUpChange}
                />
              </div>
              <button type="submit">SIGN UP</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
