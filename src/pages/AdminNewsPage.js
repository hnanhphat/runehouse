import noimg from "../noimg.jpeg";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newsActions } from "../redux/actions/news.actions";
import Moment from "react-moment";
import PaginationBar from "../components/PaginationBar";

// IMAGES
import all from "../img/categoris/infinity.svg";
import sharing from "../img/categoris/sharing.svg";
import researching from "../img/categoris/researching.svg";
import rating from "../img/categoris/rating.svg";
import review from "../img/categoris/review.svg";

const AdminNewsPage = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news.data);
  const totalPage = useSelector((state) => state.news.totalPages);
  const [searchInput, setSearchInput] = useState("");
  const [filterStt, setFilterStt] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  console.log(news);

  const filter = [
    { title: "All", image: all, search: "" },
    { title: "Sharing", image: sharing, search: "&category=Sharing" },
    {
      title: "Researching",
      image: researching,
      search: "&category=Researching",
    },
    { title: "Rating", image: rating, search: "&category=Rating" },
    { title: "Review", image: review, search: "&category=Review" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(`&title=${e.target.searchInput.value}`);
    if (e.target.searchInput.value) {
      setFilterStt("");
    } else {
      setFilterStt("All");
    }
    e.target.reset();
  };

  useEffect(() => {
    dispatch(newsActions.getListOfNews(currentPage, searchInput));
  }, [dispatch, currentPage, searchInput]);

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
      {news && news.data.news.length ? (
        <ul className="admin__news">
          {news.data.news.map((item) => (
            <li key={item._id}>
              {item.image ? (
                <div
                  className="img"
                  style={{ backgroundImage: `url('${item.image}')` }}
                ></div>
              ) : (
                <div
                  className="img img--noimg"
                  style={{ backgroundImage: `url('${noimg}')` }}
                ></div>
              )}
              <p className="tit">{item.title}</p>
              <div className="group">
                <span className="time">
                  <Moment format="MMM D, YYYY" withTitle={item.createdAt} />
                </span>
                <span className="comments">
                  {item.reviews.length ? item.reviews.length : 0} Comment(s)
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="admin__no-item">Don't have any News.</p>
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

export default AdminNewsPage;
