import noimg from "../noimg.jpeg";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/user.actions";

// IMAGES
import users from "../img/categoris/users.svg";
import cards from "../img/categoris/cards.svg";
import products from "../img/categoris/products.svg";
import news from "../img/categoris/news.svg";
import orders from "../img/categoris/orders.svg";
import appointments from "../img/categoris/appointments.svg";

import { withNamespaces } from "react-i18next";

const AdminSidebar = ({ t }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser.data);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const [showMore, setShowMore] = useState(false);

  let directory;

  if (isAdmin === "Admin") {
    directory = [
      { title: "users", image: users },
      { title: "cards", image: cards },
      { title: "products", image: products },
      { title: "news", image: news },
      { title: "orders", image: orders },
      { title: "appointments", image: appointments },
    ];
  } else {
    directory = [
      { title: "cards", image: cards },
      { title: "news", image: news },
      { title: "appointments", image: appointments },
    ];
  }

  useEffect(() => {
    dispatch(userActions.getCurrentUser());
  }, [dispatch]);

  return (
    <div id="admin-sidebar" className="admin__sidebar">
      {currentUser ? (
        <div className="user">
          <div className="user__avatar">
            <div
              className="circle"
              style={{
                backgroundImage: `url('${
                  currentUser.data.avatar ? currentUser.data.avatar : noimg
                }')`,
              }}
            ></div>
          </div>
          <div className="user__info">
            <p className="name">{currentUser.data.fullname}</p>
            <p className="position">
              {currentUser.data.position === "Admin"
                ? currentUser.data.position
                : `${currentUser.data.position} Reader`}
            </p>
            <em className="quote">{currentUser.data.quote}</em>
          </div>
        </div>
      ) : (
        ""
      )}
      <ul className="directory">
        {directory.map((item) => (
          <li key={item.title} className={`${showMore ? "active" : ""}`}>
            <Link
              to={`/admin/${item.title}`}
              className={
                location.pathname.replace("/admin/", "") === item.title
                  ? "active"
                  : ""
              }
            >
              <img src={item.image} alt={item.title} />
              <span>
                {t(`asb.${item.title[0].toUpperCase() + item.title.slice(1)}`)}
              </span>
            </Link>
          </li>
        ))}
        <li className={`more ${showMore ? "more--active" : ""}`}>
          <button
            onClick={() => setShowMore((state) => (state ? false : true))}
          >
            <span></span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default withNamespaces()(AdminSidebar);
