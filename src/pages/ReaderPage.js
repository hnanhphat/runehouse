import noimg from "../noimg.jpeg";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/user.actions";
// import { appointmentActions } from "../redux/actions/appointment.actions";
import socketIOClient from "socket.io-client";

import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import MainVisual from "../components/MainVisual";
import Breadcrumb from "../components/Breadcrumb";
import PaginationBar from "../components/PaginationBar";
import Loading from "../components/Loading";

// IMAGES
import all from "../img/categoris/infinity.svg";
import tarot from "../img/categoris/tarot.svg";
import oracle from "../img/categoris/crystal-ball.svg";
import lenormand from "../img/categoris/hour-glass.svg";
import iching from "../img/categoris/ouroboros.svg";
import tealeaf from "../img/categoris/wall-clock.svg";

import { withNamespaces } from "react-i18next";

let socket;
const BE_URL = process.env.REACT_APP_BACKEND_API;
const ReaderPage = ({ t }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.allUser.data);
  const loading = useSelector((state) => state.user.loading);
  const singleUser = useSelector((state) => state.user.singleUser.data);
  const currentUser = useSelector((state) => state.user.currentUser.data);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const totalPage = useSelector((state) => state.user.totalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [positionStt, setPositionStt] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [formInput, setFormInput] = useState({
    serviceType: "Offline Advisory",
    appointmentDate: "",
    clientPhone: "",
  });

  const [showApply, setShowApply] = useState(false);
  const [formApply, setFormApply] = useState({
    serviceType: "Recruitment",
    position: "Tarot",
    appointmentDate: "",
    clientPhone: "",
  });

  const [showMore, setShowMore] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(`&fullname=${e.target.searchInput.value}`);
    if (e.target.searchInput.value) {
      setPositionStt("");
    } else {
      setPositionStt("All");
    }
    e.target.reset();
  };

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleApplyChange = (e) => {
    setFormApply({ ...formApply, [e.target.name]: e.target.value });
  };

  const handleSend = (id) => {
    const { serviceType, appointmentDate, clientPhone } = formInput;
    socket.emit("apm.create", {
      fromId: currentUser && currentUser.data._id,
      toId: id,
      serviceType,
      appointmentDate,
      clientPhone,
    });
    setShowModal(false);
  };

  const handleApplySend = () => {
    const { serviceType, position, appointmentDate, clientPhone } = formApply;
    socket.emit("apm.create", {
      fromId: currentUser && currentUser.data._id,
      toId: "60a1440bf93fdb1099248396",
      serviceType,
      position,
      appointmentDate,
      clientPhone,
    });
    setShowApply(false);
  };

  useEffect(() => {
    dispatch(
      userActions.getListOfUsers(currentPage, `&isReader=true${searchInput}`)
    );
  }, [dispatch, currentPage, searchInput]);

  useEffect(() => {
    socket = socketIOClient(BE_URL);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("apm.request", (apm) => {
        console.log(("I got it from backend", apm));
        if (apm.sent) {
          toast.success("The request has been sent!");
        }
      });
    }
  }, []);

  return (
    <div id="readers" className="readers bg-grey">
      <MainVisual heading={t("rd.Readers")} />
      <Breadcrumb leaf={t("rd.Readers")} />
      <div className="container">
        <div className="readers__controller">
          <form onSubmit={handleSearch} className="search">
            <input
              type="text"
              name="searchInput"
              placeholder={t("rd.Search")}
            />
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
          <ul className={`filter ${showMore ? "filter--active" : ""}`}>
            <li>
              <button
                className={`${positionStt === "All" ? "active" : ""}`}
                onClick={() => {
                  setPositionStt("All");
                  setSearchInput("");
                }}
              >
                <img src={all} alt="All" />
                <span>{t("rd.All")}</span>
              </button>
            </li>
            <li>
              <button
                className={`${positionStt === "Tarot" ? "active" : ""}`}
                onClick={() => {
                  setPositionStt("Tarot");
                  setSearchInput("&position=Tarot");
                }}
              >
                <img src={tarot} alt="Tarot" />
                <span>Tarot</span>
              </button>
            </li>
            <li>
              <button
                className={`${positionStt === "Oracle" ? "active" : ""}`}
                onClick={() => {
                  setPositionStt("Oracle");
                  setSearchInput("&position=Oracle");
                }}
              >
                <img src={oracle} alt="Oracle" />
                <span>Oracle</span>
              </button>
            </li>
            <li>
              <button
                className={`${positionStt === "Lenormand" ? "active" : ""}`}
                onClick={() => {
                  setPositionStt("Lenormand");
                  setSearchInput("&position=Lenormand");
                }}
              >
                <img src={lenormand} alt="Lenormand" />
                <span>Lenormand</span>
              </button>
            </li>
            <li>
              <button
                className={`${positionStt === "I Ching" ? "active" : ""}`}
                onClick={() => {
                  setPositionStt("I Ching");
                  setSearchInput("&position=I%20Ching");
                }}
              >
                <img src={iching} alt="I Ching" />
                <span>I Ching</span>
              </button>
            </li>
            <li>
              <button
                className={`${positionStt === "Tea Leaf" ? "active" : ""}`}
                onClick={() => {
                  setPositionStt("Tea Leaf");
                  setSearchInput("&position=Tea%20Leaf");
                }}
              >
                <img src={tealeaf} alt="Tea Leaf" />
                <span>Tea Leaf</span>
              </button>
            </li>
          </ul>
          <div className={`show ${showMore ? "show--active" : ""}`}>
            <button
              onClick={() => setShowMore((state) => (state ? false : true))}
            >
              <span></span>
            </button>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <ul className="readers__list">
            {users && users.data.users.length ? (
              users.data.users.map((user) => (
                <li key={user._id}>
                  <div className="avatar">
                    <div
                      className="avatar__circle"
                      style={{
                        backgroundImage: `url('${
                          user.avatar ? user.avatar : noimg
                        }')`,
                      }}
                    ></div>
                  </div>
                  <div className="info">
                    <Link to={`readers/${user._id}`} className="name">
                      {user.fullname}
                    </Link>
                    <p className="position">{user.position} Reader</p>
                    <em className="quote">{user.quote}</em>
                    {isAuth ? (
                      <button
                        onClick={() => {
                          dispatch(userActions.getSingleUser(user._id));
                          setShowModal(true);
                        }}
                      >
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
                        <span>{t("rd.Make an appointment")}</span>
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="no-item">
                {t(`rd.Do not have any Reader.`)}
                {searchInput ? (
                  <button
                    onClick={() => {
                      setPositionStt("All");
                      setSearchInput(``);
                    }}
                  >
                    {t("rd.Go Back")}
                  </button>
                ) : (
                  <Link to="/">{t("rd.Go Home")}</Link>
                )}
              </li>
            )}
          </ul>
        )}
        {totalPage > 1 && users && users.data.users.length ? (
          <PaginationBar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
          />
        ) : (
          ""
        )}
      </div>

      <div className="readers__hiring">
        <p className="heading">{t("rd.Join Our Team!")}</p>
        <button onClick={() => setShowApply(true)}>{t("rd.Apply Now")}</button>
      </div>

      {/* APPOINTMENT */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("rd.Make an appointment")}</Modal.Title>
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
                  <option value="Offline Advisory">
                    {t("rd.Offline Advisory")}
                  </option>
                  <option value="Online Advisory">
                    {t("rd.Online Advisory")}
                  </option>
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
                  placeholder={t("rd.Phone Number")}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button
            onClick={() => handleSend(singleUser && singleUser.data._id)}
            className={
              formInput.appointmentDate && formInput.clientPhone ? "active" : ""
            }
          >
            {t("rd.Send")}
          </button>
        </Modal.Footer>
      </Modal>

      {/* APPLY */}
      <Modal show={showApply} onHide={() => setShowApply(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("rd.Apply to Rune House")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="reader">
            <div
              className="reader__avatar"
              style={{
                backgroundImage: `url('${
                  currentUser && currentUser.data.avatar
                    ? currentUser.data.avatar
                    : noimg
                }')`,
              }}
            ></div>
            <div className="reader__info">
              <p className="name">{currentUser && currentUser.data.fullname}</p>
              <p className="position">
                {currentUser && currentUser.data.position}
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
                <select name="position" onChange={handleApplyChange}>
                  <option value="Tarot">Tarot Reader</option>
                  <option value="Oracle">Oracle Reader</option>
                  <option value="Lenormand">Lenormand Reader</option>
                  <option value="I Ching">I Ching Reader</option>
                  <option value="Tea Leaf">Tea Leaf Reader</option>
                </select>
              </div>
            </div>
            <div className="form__group">
              <div className="item">
                <input
                  type="date"
                  name="appointmentDate"
                  onChange={handleApplyChange}
                />
              </div>
              <div className="item">
                <input
                  type="number"
                  name="clientPhone"
                  placeholder={t("rd.Phone Number")}
                  onChange={handleApplyChange}
                />
              </div>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button
            onClick={handleApplySend}
            className={
              formApply.appointmentDate && formApply.clientPhone ? "active" : ""
            }
          >
            {t("rd.Send")}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default withNamespaces()(ReaderPage);
