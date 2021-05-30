import noimg from "../noimg.jpeg";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { userActions } from "../redux/actions/user.actions";
import { newsActions } from "../redux/actions/news.actions";
import { appointmentActions } from "../redux/actions/appointment.actions";

import { Modal } from "react-bootstrap";
import Moment from "react-moment";
import LinesEllipsis from "react-lines-ellipsis";

import MainVisual from "../components/MainVisual";
import Breadcrumb from "../components/Breadcrumb";
import PaginationBar from "../components/PaginationBar";

const ReaderDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleUser = useSelector((state) => state.user.singleUser.data);
  const news = useSelector((state) => state.news.news.data);
  const totalPage = useSelector((state) => state.news.totalPages);
  const currentUser = useSelector((state) => state.user.currentUser.data);
  const [currentPage, setCurrentPage] = useState(1);
  const [showComment, setShowComment] = useState(Array(10).fill(false));
  const [showAllComments, setShowAllComments] = useState(Array(10).fill(false));
  const [showModal, setShowModal] = useState(false);
  const [formInput, setFormInput] = useState({
    serviceType: "Offline",
    appointmentDate: "",
    clientPhone: "",
  });

  console.log(news);

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
        `&author=${id}`,
        ""
      )
    );
  };

  const handleReview = (e, postId) => {
    e.preventDefault();
    console.log(postId);
    console.log(e.target.comment.value);
    const { targetType, targetId, content } = {
      targetType: "News",
      targetId: postId,
      content: e.target.comment.value,
    };
    dispatch(
      newsActions.createReview(
        { targetType, targetId, content },
        currentPage,
        `&author=${id}`,
        ""
      )
    );
    e.target.reset();
  };

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    const { serviceType, appointmentDate, clientPhone } = formInput;
    dispatch(
      appointmentActions.sendAppointment(id, {
        serviceType,
        appointmentDate,
        clientPhone,
      })
    );
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(userActions.getSingleUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(newsActions.getListOfNews(currentPage, `&author=${id}`));
  }, [dispatch, id, currentPage]);
  return (
    <div id="reader-detail" className="reader-detail bg-grey">
      <MainVisual heading={singleUser && singleUser.data.fullname} />
      <Breadcrumb
        branch="Readers"
        leaf={singleUser && singleUser.data.fullname}
      />
      <div className="container">
        <div className="reader-detail__info">
          <div className="user">
            <div className="avatar">
              <div
                className="avatar__circle"
                style={{
                  backgroundImage: `url('${
                    singleUser && singleUser.data.avatar
                      ? singleUser.data.avatar
                      : noimg
                  }')`,
                }}
              ></div>
            </div>
            <div className="info">
              <p className="name">{singleUser && singleUser.data.fullname}</p>
              <p className="position">
                {singleUser && singleUser.data.position} Reader
              </p>
              <em className="quote">{singleUser && singleUser.data.quote}</em>
            </div>
            <button onClick={() => setShowModal(true)}>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="clock"
                className="svg-inline--fa fa-clock fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
                ></path>
              </svg>
              <span>Make an appointment</span>
            </button>
          </div>
        </div>
        <ul className="reader-detail__posts">
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
                        {Object.values(el.reactions).reduce((a, b) => a + b, 0)
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
                  <div className="bot__lower">
                    <div className="group">
                      <button
                        className="upper"
                        onClick={() => handleReaction("News", el._id, "like")}
                      >
                        Like
                      </button>
                      <div className="icons">
                        <button
                          className="lower lower--like"
                          onClick={() => handleReaction("News", el._id, "like")}
                        ></button>
                        <button
                          className="lower lower--love"
                          onClick={() => handleReaction("News", el._id, "love")}
                        ></button>
                        <button
                          className="lower lower--care"
                          onClick={() => handleReaction("News", el._id, "care")}
                        ></button>
                        <button
                          className="lower lower--laugh"
                          onClick={() =>
                            handleReaction("News", el._id, "laugh")
                          }
                        ></button>
                        <button
                          className="lower lower--wow"
                          onClick={() => handleReaction("News", el._id, "wow")}
                        ></button>
                        <button
                          className="lower lower--sad"
                          onClick={() => handleReaction("News", el._id, "sad")}
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
                        className={`list ${showAllComments ? "list--all" : ""}`}
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
                </div>
              </li>
            ))}
        </ul>
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Make an appointment</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="reader">
            <div
              className="reader__avatar"
              style={{
                backgroundImage: `url('${
                  singleUser && singleUser.data.avatar
                    ? singleUser.data.avatar
                    : noimg
                }')`,
              }}
            ></div>
            <div className="reader__info">
              <p className="name">{singleUser && singleUser.data.fullname}</p>
              <p className="position">
                {singleUser && singleUser.data.position} Reader
              </p>
            </div>
          </div>
          <form className="form">
            <div className="form__group">
              <div className="item">
                <input
                  type="text"
                  value={currentUser && currentUser.data.fullname}
                  disabled
                />
              </div>
              <div className="item">
                <select name="serviceType" onChange={handleChange}>
                  <option value="Offline">Offline</option>
                  <option value="Online">Online</option>
                </select>
              </div>
            </div>
            <div className="form__group">
              <div className="item">
                <input
                  type="date"
                  name="appointmentDate"
                  onChange={handleChange}
                />
              </div>
              <div className="item">
                <input
                  type="number"
                  name="clientPhone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button
            onClick={handleSend}
            className={
              formInput.appointmentDate && formInput.clientPhone ? "active" : ""
            }
          >
            Send
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReaderDetailPage;
