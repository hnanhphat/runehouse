import noimg from "../noimg.jpeg";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/user.actions";

import PaginationBar from "../components/PaginationBar";

// IMAGES
import all from "../img/categoris/infinity.svg";
import admin from "../img/categoris/admin.svg";
import reader from "../img/categoris/reader.svg";
import user from "../img/categoris/user.svg";

const AdminUsersPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.allUser.data);
  const totalPage = useSelector((state) => state.user.totalPages);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filterStt, setFilterStt] = useState("All");

  const filter = [
    { title: "All", image: all, search: "" },
    { title: "Admin", image: admin, search: "&role=Admin" },
    { title: "Reader", image: reader, search: "&role=Reader" },
    { title: "User", image: user, search: "&role=User" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(`&fullname=${e.target.searchInput.value}`);
    if (e.target.searchInput.value) {
      setFilterStt("");
    } else {
      setFilterStt("All");
    }
    e.target.reset();
  };

  useEffect(() => {
    dispatch(userActions.getListOfUsers(currentPage, searchInput));
  }, [dispatch, searchInput, currentPage]);

  return (
    <div id="admin-users" className="admin__content">
      <div className="admin__controller">
        <form onSubmit={handleSearch} className="search">
          <input type="text" name="searchInput" placeholder="Search" />
          <button>
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
        <ul className="filter filter--four">
          {filter.map((item) => (
            <li key={item.title}>
              <button
                className={`${filterStt === item.title ? "active" : ""}`}
                onClick={() => {
                  setFilterStt(item.title);
                  setSearchInput(item.search);
                }}
              >
                <img src={item.image} alt={item.title} />
                <span>{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {users && users.data.users.length ? (
        <ul className="admin__users">
          {users.data.users.map((user) => (
            <li key={user._id}>
              <div className="user">
                <div className="user__avatar">
                  <div
                    className="circle"
                    style={{
                      backgroundImage: `url('${
                        user.avatar ? user.avatar : noimg
                      }')`,
                    }}
                  ></div>
                </div>
                <div className="user__info user__info--un-bd">
                  <div className="name">{user.fullname}</div>
                  <div className="position">
                    {user.position === "User" || user.position === "Admin"
                      ? user.position
                      : `${user.position} Reader`}
                  </div>
                </div>
                {/* <button>Manage</button> */}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="admin__no-item">Don't have any Orders.</p>
      )}

      {totalPage > 1 ? (
        <PaginationBar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={totalPage}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminUsersPage;
