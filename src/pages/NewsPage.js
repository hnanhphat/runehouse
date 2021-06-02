import noimg from "../noimg.jpeg";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newsActions } from "../redux/actions/news.actions";

import Moment from "react-moment";
import LinesEllipsis from "react-lines-ellipsis";

import MainVisual from "../components/MainVisual";
import Breadcrumb from "../components/Breadcrumb";
import PaginationBar from "../components/PaginationBar";

const NewsPage = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news.data);
  const totalPage = useSelector((state) => state.news.totalPages);
  const currentUser = useSelector((state) => state.user.currentUser.data);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [currentPage, setCurrentPage] = useState(1);
  const [showComment, setShowComment] = useState(Array(10).fill(false));
  const [showAllComments, setShowAllComments] = useState(Array(10).fill(false));
  const [searchInput, setSearchInput] = useState("");
  const [cateStt, setCateStt] = useState("All");

  console.log(showAllComments);

  const handleReaction = (typeVal, idVal, emojiVal) => {
    const { targetType, targetId, emoji } = {
      targetType: typeVal,
      targetId: idVal,
      emoji: emojiVal,
    };
    dispatch(
      newsActions.createReaction(
        { targetType, targetId, emoji },
        currentPage,
        searchInput,
        ""
      )
    );
  };

  const handleReview = (e, id) => {
    e.preventDefault();
    const { targetType, targetId, content } = {
      targetType: "News",
      targetId: id,
      content: e.target.comment.value,
    };
    dispatch(
      newsActions.createReview(
        { targetType, targetId, content },
        currentPage,
        searchInput,
        ""
      )
    );
    e.target.reset();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(`&title=${e.target.searchInput.value}`);
    if (e.target.searchInput.value) {
      setCateStt("");
    } else {
      setCateStt("All");
    }
    e.target.reset();
  };

  useEffect(() => {
    dispatch(newsActions.getListOfNews(currentPage, searchInput));
  }, [dispatch, currentPage, searchInput]);

  return (
    <div id="news-page" className="news-page bg-grey">
      <MainVisual heading="News" />
      {cateStt && cateStt !== "All" ? (
        <Breadcrumb branch="news" leaf={cateStt} />
      ) : (
        <Breadcrumb leaf="news" />
      )}
      <div className="container">
        <ul className="news-page__sidebar">
          <li className="search">
            <form onSubmit={handleSearch} className="search__form">
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
          </li>
          <li className="filter">
            <button
              className={`${cateStt === "All" ? "active" : ""}`}
              onClick={() => {
                setCateStt("All");
                setSearchInput(``);
              }}
            >
              All
            </button>
          </li>
          <li className="filter">
            <h3 className="tit">Categories</h3>
            {news &&
              news.data.categories.map((cate) => (
                <button
                  key={cate._id}
                  className={`${cateStt === cate._id ? "active" : ""}`}
                  onClick={() => {
                    setCateStt(cate._id);
                    setSearchInput(`&category=${cate._id}`);
                  }}
                >
                  {cate._id}
                </button>
              ))}
          </li>
        </ul>
        {news && news.data.news.length ? (
          <ul className="news-page__list">
            {news &&
              news.data.news.map((el, i) => (
                <li key={el._id}>
                  <div className="top">
                    <div className="top__left">
                      <div
                        className="avatar"
                        style={{
                          backgroundImage: `url(${
                            el.author.avatar ? el.author.avatar : noimg
                          })`,
                        }}
                      ></div>
                      <div className="info">
                        <p className="name">{el.author.fullname}</p>
                        <p className="time">
                          <Moment fromNow>{el.createdAt}</Moment>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mid">
                    <div className="content">
                      <Link to={`/news/${el._id}`} className="tit">
                        {el.title}
                      </Link>
                      <LinesEllipsis
                        className="txt"
                        text={el.content}
                        maxLine="3"
                        ellipsis="..."
                        trimRight
                        basedOn="letters"
                      />
                    </div>
                    <div className="img">
                      {el.image ? <img src={el.image} alt={el.title} /> : ""}
                    </div>
                  </div>
                  <div className="bot">
                    <div className="bot__upper">
                      <div className="reactions">
                        <div className="reactions__icon">
                          {Object.entries(el.reactions)
                            .sort(([, a], [, b]) => b - a)
                            .map((arr) =>
                              arr[1] ? (
                                <div className="box" key={arr[0]}>
                                  <div className={`icon icon--${arr[0]}`}></div>
                                  <div className="bg"></div>
                                </div>
                              ) : (
                                ""
                              )
                            )}
                        </div>
                        <p className="reactions__txt">
                          {Object.values(el.reactions).reduce(
                            (a, b) => a + b,
                            0
                          )
                            ? Object.values(el.reactions).reduce(
                                (a, b) => a + b,
                                0
                              )
                            : ""}
                        </p>
                      </div>
                      {el.reviews.length ? (
                        <p className="comments">
                          {el.reviews.length} comment
                          {el.reviews.length === 1 ? "" : "s"}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    {isAuth ? (
                      <>
                        <div className="bot__lower">
                          <div className="group">
                            <button
                              className="upper"
                              onClick={() =>
                                handleReaction("News", el._id, "like")
                              }
                            >
                              Like
                            </button>
                            <div className="icons">
                              <button
                                className="lower lower--like"
                                onClick={() =>
                                  handleReaction("News", el._id, "like")
                                }
                              ></button>
                              <button
                                className="lower lower--love"
                                onClick={() =>
                                  handleReaction("News", el._id, "love")
                                }
                              ></button>
                              <button
                                className="lower lower--care"
                                onClick={() =>
                                  handleReaction("News", el._id, "care")
                                }
                              ></button>
                              <button
                                className="lower lower--laugh"
                                onClick={() =>
                                  handleReaction("News", el._id, "laugh")
                                }
                              ></button>
                              <button
                                className="lower lower--wow"
                                onClick={() =>
                                  handleReaction("News", el._id, "wow")
                                }
                              ></button>
                              <button
                                className="lower lower--sad"
                                onClick={() =>
                                  handleReaction("News", el._id, "sad")
                                }
                              ></button>
                              <button
                                className="lower lower--angry"
                                onClick={() =>
                                  handleReaction("News", el._id, "angry")
                                }
                              ></button>
                            </div>
                          </div>
                          <div className="group">
                            {showComment[i] ? (
                              <button
                                className="upper"
                                onClick={() => {
                                  let arr = [...showComment];
                                  arr[i] = false;
                                  setShowComment(arr);
                                }}
                              >
                                Hide
                              </button>
                            ) : (
                              <button
                                className="upper"
                                onClick={() => {
                                  let arr = [...showComment];
                                  arr[i] = true;
                                  setShowComment(arr);
                                }}
                              >
                                Comment
                              </button>
                            )}
                          </div>
                          <div className="group">
                            <a
                              href={`https://www.facebook.com/sharer/sharer.php?u=https%3A//hnanhphatecommerce.netlify.app/news/${el._id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="upper"
                            >
                              Share
                            </a>
                          </div>
                        </div>
                        <div
                          className={`bot__hidden ${
                            showComment[i] ? "bot__hidden--show" : ""
                          }`}
                        >
                          {el.reviews.length > 1 ? (
                            <div className="setting">
                              {showAllComments[i] ? (
                                <button
                                  onClick={() => {
                                    let arr = [...showAllComments];
                                    arr[i] = false;
                                    setShowAllComments(arr);
                                  }}
                                >
                                  Hide comments
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    let arr = [...showAllComments];
                                    arr[i] = true;
                                    setShowAllComments(arr);
                                  }}
                                >
                                  See all comments
                                </button>
                              )}
                            </div>
                          ) : (
                            ""
                          )}
                          {el.reviews.length ? (
                            <div
                              className={`list ${
                                showAllComments[i] ? "list--all" : ""
                              }`}
                            >
                              {el.reviews.map((review) => (
                                <div className="list__item" key={review._id}>
                                  <div
                                    className="avatar"
                                    style={{
                                      backgroundImage: `url('${
                                        review.author.avatar
                                          ? review.author.avatar
                                          : noimg
                                      }')`,
                                    }}
                                  ></div>
                                  <div className="content">
                                    <div className="info">
                                      <strong className="name">
                                        {review.author.username}
                                      </strong>
                                      <p className="txt">{review.content}</p>
                                      {Object.values(review.reactions).reduce(
                                        (a, b) => a + b,
                                        0
                                      ) ? (
                                        <div className="reactions">
                                          <div className="reactions__icon">
                                            {Object.entries(review.reactions)
                                              .sort(([, a], [, b]) => b - a)
                                              .map((arr) =>
                                                arr[1] ? (
                                                  <div
                                                    className="box"
                                                    key={arr[0]}
                                                  >
                                                    <div
                                                      className={`icon icon--${arr[0]}`}
                                                    ></div>
                                                    <div className="bg"></div>
                                                  </div>
                                                ) : (
                                                  ""
                                                )
                                              )}
                                          </div>
                                          <p className="reactions__txt">
                                            {Object.values(
                                              review.reactions
                                            ).reduce((a, b) => a + b, 0)}
                                          </p>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                    <div className="other">
                                      <div className="group">
                                        <button
                                          className="upper"
                                          onClick={() =>
                                            handleReaction(
                                              "Review",
                                              review._id,
                                              "like"
                                            )
                                          }
                                        >
                                          Like
                                        </button>
                                        <div className="icons">
                                          <button
                                            className="lower lower--like"
                                            onClick={() =>
                                              handleReaction(
                                                "Review",
                                                review._id,
                                                "like"
                                              )
                                            }
                                          ></button>
                                          <button
                                            className="lower lower--love"
                                            onClick={() =>
                                              handleReaction(
                                                "Review",
                                                review._id,
                                                "love"
                                              )
                                            }
                                          ></button>
                                          <button
                                            className="lower lower--care"
                                            onClick={() =>
                                              handleReaction(
                                                "Review",
                                                review._id,
                                                "care"
                                              )
                                            }
                                          ></button>
                                          <button
                                            className="lower lower--laugh"
                                            onClick={() =>
                                              handleReaction(
                                                "Review",
                                                review._id,
                                                "laugh"
                                              )
                                            }
                                          ></button>
                                          <button
                                            className="lower lower--wow"
                                            onClick={() =>
                                              handleReaction(
                                                "Review",
                                                review._id,
                                                "wow"
                                              )
                                            }
                                          ></button>
                                          <button
                                            className="lower lower--sad"
                                            onClick={() =>
                                              handleReaction(
                                                "Review",
                                                review._id,
                                                "sad"
                                              )
                                            }
                                          ></button>
                                          <button
                                            className="lower lower--angry"
                                            onClick={() =>
                                              handleReaction(
                                                "Review",
                                                review._id,
                                                "angry"
                                              )
                                            }
                                          ></button>
                                        </div>
                                      </div>
                                      <p className="time">
                                        -{" "}
                                        <Moment fromNow>
                                          {review.createdAt}
                                        </Moment>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            ""
                          )}
                          <form
                            onSubmit={(e) => handleReview(e, el._id)}
                            className="form"
                          >
                            <div className="group">
                              <div
                                className="avatar"
                                style={{
                                  backgroundImage: `url(${
                                    currentUser && currentUser.data.avatar
                                      ? currentUser.data.avatar
                                      : noimg
                                  })`,
                                }}
                              ></div>
                              <input
                                type="text"
                                name="comment"
                                placeholder="Write a comment ..."
                              />
                            </div>
                            <p className="note">Press Enter to post.</p>
                          </form>
                        </div>
                      </>
                    ) : (
                      <div
                        className={`bot__hidden bot__hidden--show ${
                          el.reviews.length ? "" : "bot__hidden--no-item"
                        }`}
                      >
                        {el.reviews.length > 1 ? (
                          <div className="setting">
                            {showAllComments[i] ? (
                              <button
                                onClick={() => {
                                  let arr = [...showAllComments];
                                  arr[i] = false;
                                  setShowAllComments(arr);
                                }}
                              >
                                Hide comments
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  let arr = [...showAllComments];
                                  arr[i] = true;
                                  setShowAllComments(arr);
                                }}
                              >
                                See all comments
                              </button>
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                        {el.reviews.length ? (
                          <div
                            className={`list ${
                              showAllComments[i] ? "list--all" : ""
                            }`}
                          >
                            {el.reviews.map((review) => (
                              <div
                                className="list__item list__item--space"
                                key={review._id}
                              >
                                <div
                                  className="avatar"
                                  style={{
                                    backgroundImage: `url('${
                                      review.author.avatar
                                        ? review.author.avatar
                                        : noimg
                                    }')`,
                                  }}
                                ></div>
                                <div className="content">
                                  <div className="info">
                                    <strong className="name">
                                      {review.author.username}
                                    </strong>
                                    <p className="txt">{review.content}</p>
                                    {Object.values(review.reactions).reduce(
                                      (a, b) => a + b,
                                      0
                                    ) ? (
                                      <div className="reactions">
                                        <div className="reactions__icon">
                                          {Object.entries(review.reactions)
                                            .sort(([, a], [, b]) => b - a)
                                            .map((arr) =>
                                              arr[1] ? (
                                                <div
                                                  className="box"
                                                  key={arr[0]}
                                                >
                                                  <div
                                                    className={`icon icon--${arr[0]}`}
                                                  ></div>
                                                  <div className="bg"></div>
                                                </div>
                                              ) : (
                                                ""
                                              )
                                            )}
                                        </div>
                                        <p className="reactions__txt">
                                          {Object.values(
                                            review.reactions
                                          ).reduce((a, b) => a + b, 0)}
                                        </p>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <p className="news-page__no-item">
            Don't have any news post.
            {searchInput ? (
              <button
                onClick={() => {
                  setCateStt("All");
                  setSearchInput(``);
                }}
              >
                Go back
              </button>
            ) : (
              <Link to="/">Go home</Link>
            )}
          </p>
        )}
        {totalPage > 1 && news && news.data.news.length ? (
          <PaginationBar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NewsPage;
