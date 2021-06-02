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
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [showComment, setShowComment] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [showReaction, setShowReaction] = useState(false);
  const [showReviewReaction, setShowReviewReaction] = useState(false);

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
              {isAuth ? (
                <>
                  <div className="bot__lower">
                    <div className="group">
                      <button
                        className={`upper ${showReaction ? "active" : ""}`}
                        onClick={() =>
                          setShowReaction((state) => (state ? false : true))
                        }
                      >
                        Like
                      </button>
                      <div className={`icons ${showReaction ? "active" : ""}`}>
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
                      <div
                        className={`list ${showAllComments ? "list--all" : ""}`}
                      >
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
                                    className={`upper ${
                                      showReviewReaction ? "active" : ""
                                    }`}
                                    onClick={() =>
                                      setShowReviewReaction((state) =>
                                        state ? false : true
                                      )
                                    }
                                  >
                                    Like
                                  </button>
                                  <div
                                    className={`icons ${
                                      showReviewReaction ? "active" : ""
                                    }`}
                                  >
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
                        <button type="submit">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="paper-plane"
                            className="svg-inline--fa fa-paper-plane fa-w-16"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      <p className="note">Press Enter to post.</p>
                    </form>
                  </div>
                </>
              ) : (
                <div
                  className={`bot__hidden bot__hidden--show ${
                    singleNews.data.reviews.length ? "" : "bot__hidden--no-item"
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
                    <div
                      className={`list ${showAllComments ? "list--all" : ""}`}
                    >
                      {singleNews.data.reviews.map((review) => (
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
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NewsDetailPage;
