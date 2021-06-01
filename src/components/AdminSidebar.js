import noimg from "../noimg.jpeg";
import React, { useEffect } from "react";
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
import interviews from "../img/categoris/interviews.svg";

const AdminSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser.data);

  const directory = [
    { title: "users", image: users },
    { title: "cards", image: cards },
    { title: "products", image: products },
    { title: "news", image: news },
    { title: "orders", image: orders },
    { title: "appointments", image: appointments },
    { title: "interviews", image: interviews },
  ];

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
            <p className="position">{currentUser.data.position}</p>
            <em className="quote">{currentUser.data.quote}</em>
          </div>
        </div>
      ) : (
        ""
      )}
      <ul className="directory">
        {directory.map((link) => (
          <li>
            <Link
              to={`/admin/${link.title}`}
              className={
                location.pathname.replace("/admin/", "") === link.title
                  ? "active"
                  : ""
              }
            >
              <img src={link.image} alt={link.title} />
              <span>{link.title[0].toUpperCase() + link.title.slice(1)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
