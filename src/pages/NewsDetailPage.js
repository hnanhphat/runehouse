import noimg from "../noimg.jpeg";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { newsActions } from "../redux/actions/news.actions";

import Moment from "react-moment";

import MainVisual from "../components/MainVisual";
import Breadcrumb from "../components/Breadcrumb";

const NewsDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleNews = useSelector((state) => state.news.singleNews.data);
  const currentUser = useSelector((state) => state.user.currentUser.data);
  const [showComment, setShowComment] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  console.log(singleNews);

  const handleReaction = (typeVal, idVal, emojiVal) => {
    const { targetType, targetId, emoji } = {
      targetType: typeVal,
      targetId: idVal,
      emoji: emojiVal,
    };
    dispatch(
      newsActions.createReaction({ targetType, targetId, emoji }, "", "", id)
    );
  };

  const handleReview = (e, id) => {
    e.preventDefault();
    console.log(id);
    console.log(e.target.comment.value);
    const { targetType, targetId, content } = {
      targetType: "News",
      targetId: id,
      content: e.target.comment.value,
    };
    dispatch(
      newsActions.createReview({ targetType, targetId, content }, "", "", id)
    );
    e.target.reset();
  };

  useEffect(() => {
    dispatch(newsActions.getSingleNews(id));
  }, [dispatch, id]);

  return (
    <div id="news-detail" className="news-detail bg-grey">
      <MainVisual heading={singleNews && singleNews.data.title} />
      <Breadcrumb branch="news" leaf={singleNews && singleNews.data.title} />
      {singleNews ? (
        <div className="container">
          <div className="news-detail__box">
            <div className="top">
              <div className="top__left">
                <div
                  className="avatar"
                  style={{
                    backgroundImage: `url(${
                      singleNews.data.author.avatar
                        ? singleNews.data.author.avatar
                        : noimg
                    })`,
                  }}
                ></div>
                <div className="info">
                  <p className="name">{singleNews.data.author.fullname}</p>
                  <p className="time">
                    <Moment fromNow>{singleNews.data.createdAt}</Moment>
                  </p>
                </div>
              </div>
              <div className="top__right">
                <button className="edit">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="ellipsis-h"
                    className="svg-inline--fa fa-ellipsis-h fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="mid">
              <div className="content">
                <p className="tit">{singleNews.data.title}</p>
                <p className="txt">{singleNews.data.content}</p>
              </div>
              <div className="img">
                {singleNews.data.image ? (
                  <img
                    src={singleNews.data.image}
                    alt={singleNews.data.title}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="bot">
              <div className="bot__upper">
                <div className="reactions">
                  <div className="reactions__icon">
                    {Object.entries(singleNews.data.reactions)
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
                    {Object.values(singleNews.data.reactions).reduce(
                      (a, b) => a + b,
                      0
                    )
                      ? Object.values(singleNews.data.reactions).reduce(
                          (a, b) => a + b,
                          0
                        )
                      : ""}
                  </p>
                </div>
                {singleNews.data.reviews.length ? (
                  <p className="comments">
                    {singleNews.data.reviews.length} comment
                    {singleNews.data.reviews.length === 1 ? "" : "s"}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="bot__lower">
                <div className="group">
                  <button
                    className="upper"
                    onClick={() =>
                      handleReaction("News", singleNews.data._id, "like")
                    }
                  >
                    Like
                  </button>
                  <div className="icons">
                    <button
                      className="lower lower--like"
                      onClick={() =>
                        handleReaction("News", singleNews.data._id, "like")
                      }
                    ></button>
                    <button
                      className="lower lower--love"
                      onClick={() =>
                        handleReaction("News", singleNews.data._id, "love")
                      }
                    ></button>
                    <button
                      className="lower lower--care"
                      onClick={() =>
                        handleReaction("News", singleNews.data._id, "care")
                      }
                    ></button>
                    <button
                      className="lower lower--laugh"
                      onClick={() =>
                        handleReaction("News", singleNews.data._id, "laugh")
                      }
                    ></button>
                    <button
                      className="lower lower--wow"
                      onClick={() =>
                        handleReaction("News", singleNews.data._id, "wow")
                      }
                    ></button>
                    <button
                      className="lower lower--sad"
                      onClick={() =>
                        handleReaction("News", singleNews.data._id, "sad")
                      }
                    ></button>
                    <button
                      className="lower lower--angry"
                      onClick={() =>
                        handleReaction("News", singleNews.data._id, "angry")
                      }
                    ></button>
                  </div>
                </div>
                <div className="group">
                  {showComment ? (
                    <button
                      className="upper"
                      onClick={() => setShowComment(false)}
                    >
                      Hide
                    </button>
                  ) : (
                    <button
                      className="upper"
                      onClick={() => setShowComment(true)}
                    >
                      Comment
                    </button>
                  )}
                </div>
                <div className="group">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https%3A//hnanhphatecommerce.netlify.app/news/${singleNews.data._id}`}
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
                  showComment ? "bot__hidden--show" : ""
                }`}
              >
                {singleNews.data.reviews.length > 1 ? (
                  <div className="setting">
                    {showAllComments ? (
                      <button onClick={() => setShowAllComments(false)}>
                        Hide comments
                      </button>
                    ) : (
                      <button onClick={() => setShowAllComments(true)}>
                        See all comments
                      </button>
                    )}
                  </div>
                ) : (
                  ""
                )}
                {singleNews.data.reviews.length ? (
                  <div className={`list ${showAllComments ? "list--all" : ""}`}>
                    {singleNews.data.reviews.map((review) => (
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
                                        <div className="box" key={arr[0]}>
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
                                  {Object.values(review.reactions).reduce(
                                    (a, b) => a + b,
                                    0
                                  )}
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
                                  handleReaction("Review", review._id, "like")
                                }
                              >
                                Like
                              </button>
                              <div className="icons">
                                <button
                                  className="lower lower--like"
                                  onClick={() =>
                                    handleReaction("Review", review._id, "like")
                                  }
                                ></button>
                                <button
                                  className="lower lower--love"
                                  onClick={() =>
                                    handleReaction("Review", review._id, "love")
                                  }
                                ></button>
                                <button
                                  className="lower lower--care"
                                  onClick={() =>
                                    handleReaction("Review", review._id, "care")
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
                                    handleReaction("Review", review._id, "wow")
                                  }
                                ></button>
                                <button
                                  className="lower lower--sad"
                                  onClick={() =>
                                    handleReaction("Review", review._id, "sad")
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
                              - <Moment fromNow>{review.createdAt}</Moment>
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
                  onSubmit={(e) => handleReview(e, singleNews.data._id)}
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
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NewsDetailPage;
