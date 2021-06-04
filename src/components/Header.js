import logo from "../logo.svg";
import noimg from "../noimg.jpeg";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { userActions } from "../redux/actions/user.actions";
import { authActions } from "../redux/actions/auth.actions";
import { decksActions } from "../redux/actions/decks.actions";
import { cartActions } from "../redux/actions/cart.actions";
import { cardActions } from "../redux/actions/card.actions";
import { routeActions } from "../redux/actions/route.actions";
import { Modal, Tabs, Tab } from "react-bootstrap";

import us from "../img/us.svg";
import vn from "../img/vn.svg";

import i18n from "../i18n";
import { withNamespaces } from "react-i18next";
import Loading from "../components/Loading";

const Header = ({ t, status, setStatus }) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  // const [status, setHeaderStatus] = useState(false);
  // const [headerStatus, setHeaderStatus] = useState(false);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [daily, setDaily] = useState(false);
  const [form, setForm] = useState(false);
  const [online, setOnline] = useState(false);
  const [problem, setProblem] = useState("");

  const redirectTo = useSelector((state) => state.route.redirectTo);
  const currentUser = useSelector((state) => state.user.currentUser.data);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const carts = useSelector((state) => state.cart.carts.data);
  const card = useSelector((state) => state.card.random.data);
  const cardLoading = useSelector((state) => state.card.loading);

  const [random, setRandom] = useState(Math.floor(Math.random() * 2));
  const [randomArray, setRandomArray] = useState([
    Math.floor(Math.random() * 2),
    Math.floor(Math.random() * 2),
    Math.floor(Math.random() * 2),
  ]);

  const [hamberger, setHamberger] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(authActions.logout());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      history.push(`/`);
      dispatch(
        decksActions.getListOfDecks(1, `&limit=10&name=${search}`, "search")
      );
    } else {
      dispatch(decksActions.removeSearch());
    }
  };

  const handleDeleteCart = (val) => {
    dispatch(cartActions.deleteCart(val, 1, "&isOrdered=false"));
  };

  const handleUpdate = (quantity, id) => {
    dispatch(cartActions.updateCart({ quantity }, id, 1, "&isOrdered=false"));
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLanguage = (val) => {
    localStorage.setItem("language", val);
    changeLanguage(val);
  };

  const handleDaily = () => {
    setDaily(true);
    setRandom(Math.floor(Math.random() * 2));
    dispatch(cardActions.getRandomCard(1));
  };

  const handleBack = () => {
    setDaily(false);
    setForm(false);
    dispatch(cardActions.removeCard());
  };

  const handleOnline = (e) => {
    e.preventDefault();
    setRandomArray([
      Math.floor(Math.random() * 2),
      Math.floor(Math.random() * 2),
      Math.floor(Math.random() * 2),
    ]);
    setForm(false);
    setOnline(true);
    setProblem(e.target.problemInput.value);
    dispatch(cardActions.getRandomCard(3));
  };

  useEffect(() => {
    changeLanguage(localStorage.getItem("language"));
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(userActions.getCurrentUser());
    }
  }, [dispatch, isAuth]);

  useEffect(() => {
    if (isAuth) {
      dispatch(cartActions.getUserCart(1, "&isOrdered=false"));
    }
  }, [dispatch, isAuth]);

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      setStatus(false);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo, setStatus]);

  return (
    <header
      id="header"
      className={`header ${
        status || location.pathname.length > 1 ? "header--scroll" : ""
      }`}
    >
      <div className="header__container">
        <div className="directory">
          <div className="directory__item">
            <Link to="/products" className="upper">
              {t("hd.Products")}
            </Link>
          </div>
          <div className="directory__item">
            <Link to="/readers" className="upper">
              {t("hd.Readers")}
            </Link>
          </div>
          <div className="directory__item">
            <Link to="/news" className="upper">
              {t("hd.News")}
            </Link>
          </div>
        </div>
        {isAuth ? (
          <div className="user">
            <p className="user__name">
              {currentUser && currentUser.data.username}
            </p>
            <div
              className="user__avatar"
              style={{
                backgroundImage: `url('${
                  currentUser && currentUser.data.avatar
                    ? currentUser.data.avatar
                    : noimg
                }')`,
              }}
            ></div>
            <div className="user__dropdown">
              <div className="group">
                <button
                  className={
                    localStorage.getItem("language") === "en" ? "active" : ""
                  }
                  onClick={() => handleLanguage("en")}
                >
                  <img src={us} alt="United State" />
                  <span>EN</span>
                </button>
                <button
                  className={
                    localStorage.getItem("language") === "vn" ? "active" : ""
                  }
                  onClick={() => handleLanguage("vn")}
                >
                  <img src={vn} alt="Vietnamese" />
                  <span>VN</span>
                </button>
              </div>
              <Link to="/profile">
                <span>{t("hd.Profile")}</span>
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
              </Link>
              <Link to="/orders">
                <span>{t("hd.Orders")}</span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="shopping-bag"
                  className="svg-inline--fa fa-shopping-bag fa-w-14"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.29 28.71-64 64-64s64 28.71 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"
                  ></path>
                </svg>
              </Link>
              {isAdmin !== "User" ? (
                isAdmin === "Admin" ? (
                  <Link to="/admin/users">
                    <span>{t("hd.Dashboard")}</span>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="columns"
                      className="svg-inline--fa fa-columns fa-w-16"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64V160h160v256zm224 0H288V160h160v256z"
                      ></path>
                    </svg>
                  </Link>
                ) : (
                  <Link to="/admin/cards">
                    <span>{t("hd.Dashboard")}</span>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="columns"
                      className="svg-inline--fa fa-columns fa-w-16"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64V160h160v256zm224 0H288V160h160v256z"
                      ></path>
                    </svg>
                  </Link>
                )
              ) : (
                ""
              )}
              <Link to="/" onClick={handleLogout}>
                <span>{t("hd.Logout")}</span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="sign-out-alt"
                  className="svg-inline--fa fa-sign-out-alt fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          <div className="user">
            <Link to="/login" className="user__login">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="sign-in-alt"
                className="svg-inline--fa fa-sign-in-alt fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"
                ></path>
              </svg>
            </Link>
          </div>
        )}
        <Link to="/" className="logo">
          <img src={logo} alt="Rune House" />
        </Link>
        <div className={`search ${isAuth ? "" : "search--no-login"}`}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="searchInput"
              placeholder={t("hd.Find Your Deck")}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="svg-inline--fa fa-search fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </button>
          </form>
        </div>
        {isAuth ? (
          <div className="other">
            <div className="other__item">
              <button className="icon" onClick={() => setShowModal(true)}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="dice"
                  className="svg-inline--fa fa-dice fa-w-20"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="currentColor"
                    d="M592 192H473.26c12.69 29.59 7.12 65.2-17 89.32L320 417.58V464c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V240c0-26.51-21.49-48-48-48zM480 376c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm-46.37-186.7L258.7 14.37c-19.16-19.16-50.23-19.16-69.39 0L14.37 189.3c-19.16 19.16-19.16 50.23 0 69.39L189.3 433.63c19.16 19.16 50.23 19.16 69.39 0L433.63 258.7c19.16-19.17 19.16-50.24 0-69.4zM96 248c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="other__item">
              <Link to="/cart" className="icon">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="shopping-cart"
                  className="svg-inline--fa fa-shopping-cart fa-w-18"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
                  ></path>
                </svg>
                {isAuth && carts && carts.data.carts.length ? (
                  <span className="number">
                    {carts.data.carts.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                ) : (
                  ""
                )}
              </Link>

              {carts && carts.data.carts.length ? (
                <ul className="dropdown">
                  {carts &&
                    carts.data.carts.map((el) => (
                      <li key={el._id}>
                        <div
                          className="img"
                          style={{
                            backgroundImage: `url('${
                              el.decks.image ? el.decks.image : noimg
                            }')`,
                          }}
                        ></div>
                        <div className="content">
                          <p className="name">{el.decks.name}</p>
                          <p className="price">
                            {el.decks.defaultPrice ? (
                              <span className="price__before">
                                ${el.decks.defaultPrice}
                              </span>
                            ) : (
                              ""
                            )}
                            <span className="price__after">
                              ${el.decks.oficialPrice}
                            </span>
                          </p>
                          <p className="quantity">{el.quantity}pc</p>
                          <div className="btns">
                            <span className="number">{el.quantity}</span>
                            <div className="group">
                              <button
                                onClick={() => handleUpdate(-1, el._id)}
                                className={`down ${
                                  el.quantity <= 1 ? "hide" : ""
                                }`}
                              ></button>
                              <button
                                onClick={() => handleUpdate(1, el._id)}
                                className="up"
                              ></button>
                            </div>
                          </div>
                        </div>
                        <button onClick={() => handleDeleteCart(el._id)}>
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="times"
                            className="svg-inline--fa fa-times fa-w-11"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 352 512"
                          >
                            <path
                              fill="currentColor"
                              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                            ></path>
                          </svg>
                        </button>
                      </li>
                    ))}
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="hamberger">
          <button
            onClick={() => setHamberger((state) => (state ? false : true))}
            className={hamberger ? "active" : ""}
          >
            <span></span>
          </button>
        </div>

        <div className={`menu ${hamberger ? "show" : ""}`}>
          {currentUser ? (
            <div className="menu__user">
              <div
                className="avatar"
                style={{
                  backgroundImage: `url('${
                    currentUser.data.avatar ? currentUser.data.avatar : noimg
                  }')`,
                }}
              ></div>
              <div className="info">
                <p>{currentUser && currentUser.data.fullname}</p>
                <span>
                  {currentUser && currentUser.data.position}{" "}
                  {currentUser && currentUser.data.role === "Reader"
                    ? "Reader"
                    : ""}
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="menu__search">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
                setHamberger(false);
              }}
            >
              <input
                type="text"
                name="searchInput"
                placeholder={t("hd.Find Your Deck")}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="search"
                  className="svg-inline--fa fa-search fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                  ></path>
                </svg>
              </button>
            </form>
          </div>
          {isAuth ? (
            <div className="menu__language">
              <button
                className={
                  localStorage.getItem("language") === "en" ? "active" : ""
                }
                onClick={() => {
                  handleLanguage("en");
                  setHamberger(false);
                }}
              >
                <img src={us} alt="United State" />
                <span>EN</span>
              </button>
              <button
                className={
                  localStorage.getItem("language") === "vn" ? "active" : ""
                }
                onClick={() => {
                  handleLanguage("vn");
                  setHamberger(false);
                }}
              >
                <img src={vn} alt="Vietnamese" />
                <span>VN</span>
              </button>
            </div>
          ) : (
            ""
          )}
          <ul className="menu__list">
            <li>
              <button
                onClick={() => {
                  history.push("/");
                  setHamberger(false);
                }}
              >
                <span>{t("hd.Home")}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  history.push("/products");
                  setHamberger(false);
                }}
              >
                <span>{t("hd.Products")}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  history.push("/readers");
                  setHamberger(false);
                }}
              >
                <span>{t("hd.Readers")}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  history.push("/news");
                  setHamberger(false);
                }}
              >
                <span>{t("hd.News")}</span>
              </button>
            </li>
            {isAuth ? (
              <>
                <li>
                  <button
                    onClick={() => {
                      history.push("/profile");
                      setHamberger(false);
                    }}
                  >
                    <span>{t("hd.Profile")}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      history.push("/orders");
                      setHamberger(false);
                    }}
                  >
                    <span>{t("hd.Orders")}</span>
                  </button>
                </li>
                {isAdmin !== "User" ? (
                  <li className="full">
                    <button
                      onClick={() => {
                        history.push("/admin");
                        setHamberger(false);
                      }}
                    >
                      <span>{t("hd.Dashboard")}</span>
                    </button>
                  </li>
                ) : (
                  ""
                )}
              </>
            ) : (
              <li className="full">
                <button
                  onClick={() => {
                    history.push("/login");
                    setHamberger(false);
                  }}
                >
                  <span>{t("hd.Login")}</span>
                </button>
              </li>
            )}
          </ul>
          {isAuth ? (
            <ul className="menu__other">
              <div className="item">
                <button
                  onClick={() => {
                    setShowModal(true);
                    setHamberger(false);
                  }}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="dice"
                    className="svg-inline--fa fa-dice fa-w-20"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path
                      fill="currentColor"
                      d="M592 192H473.26c12.69 29.59 7.12 65.2-17 89.32L320 417.58V464c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V240c0-26.51-21.49-48-48-48zM480 376c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm-46.37-186.7L258.7 14.37c-19.16-19.16-50.23-19.16-69.39 0L14.37 189.3c-19.16 19.16-19.16 50.23 0 69.39L189.3 433.63c19.16 19.16 50.23 19.16 69.39 0L433.63 258.7c19.16-19.17 19.16-50.24 0-69.4zM96 248c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="item">
                <button
                  onClick={() => {
                    history.push("/cart");
                    setHamberger(false);
                  }}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="shopping-cart"
                    className="svg-inline--fa fa-shopping-cart fa-w-18"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
                    ></path>
                  </svg>
                </button>
                {carts && carts.data.carts.length ? (
                  <span>
                    {carts.data.carts.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="item">
                <button
                  onClick={() => {
                    handleLogout();
                    history.push("/");
                    setHamberger(false);
                  }}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="sign-out-alt"
                    className="svg-inline--fa fa-sign-out-alt fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
                    ></path>
                  </svg>
                </button>
              </div>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setDaily(false);
          setForm(false);
          setOnline(false);
          setProblem("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("hd.Choose One")}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body--large">
          {cardLoading ? (
            <Loading />
          ) : !daily && !form && !online ? (
            <div className="option">
              <button className="option__btn" onClick={handleDaily}>
                {t("hd.Daily Card")}
              </button>
              <button className="option__btn" onClick={() => setForm(true)}>
                {t("hd.Tarot Online")}
              </button>
            </div>
          ) : daily && card ? (
            <div className="card">
              <button className="card__btn" onClick={handleBack}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-circle-left"
                  className="svg-inline--fa fa-arrow-circle-left fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm28.9-143.6L209.4 288H392c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24H209.4l75.5-72.4c9.7-9.3 9.9-24.8.4-34.3l-11-10.9c-9.4-9.4-24.6-9.4-33.9 0L107.7 239c-9.4 9.4-9.4 24.6 0 33.9l132.7 132.7c9.4 9.4 24.6 9.4 33.9 0l11-10.9c9.5-9.5 9.3-25-.4-34.3z"
                  ></path>
                </svg>
              </button>
              <div
                className={`card__heading ${
                  random === 1 ? "card__heading--reversed" : ""
                }`}
              >
                <div className="img">
                  <img src={card.data.image} alt={card.data.title} />
                </div>
                <div className="info">
                  <p>
                    {card.data.title}
                    {random === 1 ? ` ${t("hd.Reversed")}` : ""}
                  </p>
                  <span>
                    {
                      card.data[
                        `element${localStorage
                          .getItem("language")
                          .toUpperCase()}`
                      ]
                    }
                  </span>
                </div>
              </div>
              <div className="card__info">
                <Tabs defaultActiveKey="introduce">
                  <Tab eventKey="introduce" title={t("hd.Introduce")}>
                    {random === 0
                      ? card.data[
                          `introduce${localStorage
                            .getItem("language")
                            .toUpperCase()}`
                        ]
                      : card.data[
                          `introduceReversed${localStorage
                            .getItem("language")
                            .toUpperCase()}`
                        ]}
                  </Tab>
                  <Tab eventKey="overview" title={t("hd.Overview")}>
                    {random === 0
                      ? card.data[
                          `overview${localStorage
                            .getItem("language")
                            .toUpperCase()}`
                        ]
                      : card.data[
                          `overviewReversed${localStorage
                            .getItem("language")
                            .toUpperCase()}`
                        ]}
                  </Tab>
                  <Tab eventKey="work" title={t("hd.Work")}>
                    {random === 0
                      ? card.data[
                          `work${localStorage
                            .getItem("language")
                            .toUpperCase()}`
                        ]
                      : card.data[
                          `workReversed${localStorage
                            .getItem("language")
                            .toUpperCase()}`
                        ]}
                  </Tab>
                  <Tab eventKey="love" title={t("hd.Love")}>
                    {random === 0
                      ? card.data[
                          `love${localStorage
                            .getItem("language")
                            .toUpperCase()}`
                        ]
                      : card.data[
                          `loveReversed${localStorage
                            .getItem("language")
                            .toUpperCase()}`
                        ]}
                  </Tab>
                  <Tab eventKey="finance" title={t("hd.Finance")}>
                    {random === 0
                      ? card.data[
                          `finance${localStorage
                            .getItem("language")
                            .toUpperCase()}`
                        ]
                      : card.data[
                          `financeReversed${localStorage
                            .getItem("language")
                            .toUpperCase()}`
                        ]}
                  </Tab>
                  <Tab eventKey="health" title={t("hd.Health")}>
                    {random === 0
                      ? card.data[
                          `health${localStorage
                            .getItem("language")
                            .toUpperCase()}`
                        ]
                      : card.data[
                          `healthReversed${localStorage
                            .getItem("language")
                            .toUpperCase()}`
                        ]}
                  </Tab>
                  <Tab eventKey="mentality" title={t("hd.Mentality")}>
                    {random === 0
                      ? card.data[
                          `mentality${localStorage
                            .getItem("language")
                            .toUpperCase()}`
                        ]
                      : card.data[
                          `mentalityReversed${localStorage
                            .getItem("language")
                            .toUpperCase()}`
                        ]}
                  </Tab>
                </Tabs>
              </div>
            </div>
          ) : form ? (
            <form onSubmit={handleOnline} className="form form--unbox">
              <button className="form__back" onClick={handleBack}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-circle-left"
                  className="svg-inline--fa fa-arrow-circle-left fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm28.9-143.6L209.4 288H392c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24H209.4l75.5-72.4c9.7-9.3 9.9-24.8.4-34.3l-11-10.9c-9.4-9.4-24.6-9.4-33.9 0L107.7 239c-9.4 9.4-9.4 24.6 0 33.9l132.7 132.7c9.4 9.4 24.6 9.4 33.9 0l11-10.9c9.5-9.5 9.3-25-.4-34.3z"
                  ></path>
                </svg>
              </button>
              <p className="form__heading">{t("hd.Choose Your Problem")}</p>
              <div className="form__group">
                <div className="item item--full">
                  <select name="problemInput">
                    <option value="overview">{t("hd.Overview")}</option>
                    <option value="work">{t("hd.Work")}</option>
                    <option value="love">{t("hd.Love")}</option>
                    <option value="finance">{t("hd.Finance")}</option>
                    <option value="health">{t("hd.Health")}</option>
                    <option value="mentality">{t("hd.Mentality")}</option>
                  </select>
                </div>
              </div>
              <button className="form__btn" type="submit">
                {t("hd.Send")}
              </button>
            </form>
          ) : online ? (
            <div className="results">
              <p className="results__title">
                {t("hd.Your Problem")}:{" "}
                {t("hd." + problem[0].toUpperCase() + problem.slice(1))}
              </p>
              <div className="results__tab">
                <Tabs defaultActiveKey="tab01">
                  {card &&
                    card.data.length &&
                    card.data.map((item, index) => (
                      <Tab
                        eventKey={`tab0${index + 1}`}
                        title={t(`hd.Card 0${index + 1}`)}
                        key={item._id}
                        className="tab-pane--large"
                      >
                        {randomArray[index] === 0 ? (
                          <div className="results__item">
                            <div className="heading">
                              <div className="img">
                                <img src={item.image} alt={item.title} />
                              </div>
                              <div className="info">
                                <p>{item.title}</p>
                                <span>
                                  {
                                    item[
                                      `element${localStorage
                                        .getItem("language")
                                        .toUpperCase()}`
                                    ]
                                  }
                                </span>
                              </div>
                            </div>
                            <p className="content">
                              {
                                item[
                                  `${
                                    problem +
                                    localStorage
                                      .getItem("language")
                                      .toUpperCase()
                                  }`
                                ]
                              }
                            </p>
                          </div>
                        ) : (
                          <div className="results__item">
                            <div className="heading">
                              <div className="img img--reversed">
                                <img src={item.image} alt={item.title} />
                              </div>
                              <div className="info">
                                <p>{item.title}</p>
                                <span>
                                  {
                                    item[
                                      `element${localStorage
                                        .getItem("language")
                                        .toUpperCase()}`
                                    ]
                                  }
                                </span>
                              </div>
                            </div>
                            <p className="content">
                              {
                                item[
                                  `${
                                    problem +
                                    "Reversed" +
                                    localStorage
                                      .getItem("language")
                                      .toUpperCase()
                                  }`
                                ]
                              }
                            </p>
                          </div>
                        )}
                      </Tab>
                    ))}
                </Tabs>
              </div>
            </div>
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>
    </header>
  );
};

export default withNamespaces()(Header);
