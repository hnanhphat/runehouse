import noimg from "../noimg.jpeg";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentActions } from "../redux/actions/appointment.actions";
import socketIOClient from "socket.io-client";

import { Modal } from "react-bootstrap";

import MainVisual from "../components/MainVisual";
import Breadcrumb from "../components/Breadcrumb";
import PaginationBar from "../components/PaginationBar";
import Loading from "../components/Loading";

// IMAGES
import all from "../img/categoris/infinity.svg";
import advisory from "../img/categoris/advisory.svg";
import recruitment from "../img/categoris/recruitment.svg";
import requesting from "../img/categoris/requesting.svg";
import processing from "../img/categoris/processing.svg";
import completed from "../img/categoris/completed.svg";
import cancelled from "../img/categoris/cancel.svg";

import { withNamespaces } from "react-i18next";

let socket;
const BE_URL = process.env.REACT_APP_BACKEND_API;
const AppointmentPage = ({ t }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser.data);
  const singleAppointment = useSelector(
    (state) => state.appointment.singleAppointment.data
  );
  const loadingSingle = useSelector((state) => state.appointment.loadingSingle);

  const [appointments, setAppointments] = useState([]);
  const [loadingAppointment, setLoadingAppointment] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [filterStt, setFilterStt] = useState("All");
  const [searchInput, setSearchInput] = useState("");

  const [showDelete, setShowDelete] = useState(false);
  const [target, setTarget] = useState("");
  const [showDetail, setShowDetail] = useState(false);

  const [showMore, setShowMore] = useState(false);

  const filter = [
    { title: "All", image: all, search: "" },
    { title: "Advisory", image: advisory, search: "&serviceType=Advisory" },
    {
      title: "Recruitment",
      image: recruitment,
      search: "&serviceType=Recruitment",
    },
    { title: "Requesting", image: requesting, search: "&status=Requesting" },
    { title: "Processing", image: processing, search: "&status=Processing" },
    { title: "Completed", image: completed, search: "&status=Completed" },
    { title: "Cancelled", image: cancelled, search: "&status=Cancelled" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target.searchInput.value) {
      setSearchInput({ _id: e.target.searchInput.value });
      setFilterStt("");
    } else {
      setSearchInput("");
      setFilterStt("All");
    }
    e.target.reset();
  };

  const handleDelete = (id) => {
    socket.emit("apm.change", {
      id: id,
      status: "Cancelled",
    });
  };

  useEffect(() => {
    socket = socketIOClient(BE_URL);
    socket.emit("apm.user_init", {
      id: currentUser && currentUser.data._id,
      ...searchInput,
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser, searchInput]);

  useEffect(() => {
    setLoadingAppointment(true);
    if (socket) {
      socket.on("apm.request", (apm) => {
        console.log(("I got it from backend", apm));
        setAppointments((state) => [apm, ...state]);
        setLoadingAppointment(false);
      });

      socket.on("apm.receive", (apm) => {
        console.log(("I got it from backend", apm));
        setAppointments((state) => {
          state.forEach((el) => {
            if (el._id === apm._id) {
              el.status = apm.status;
            }
          });
          return [...state];
        });
        setLoadingAppointment(false);
      });

      socket.on("apm.deleted", (apm) => {
        console.log(("I got it from backend", apm));
        setAppointments((state) => {
          const index = state.findIndex((el) => el._id === apm._id);
          state.splice(index, 1);
          return [...state];
        });
        setLoadingAppointment(false);
      });

      socket.on("apm.user_noti", (apm) => {
        console.log(("I got it from backend", apm));
        setAppointments(apm.appointments);
        setTotalPage(apm.totalPages);
        setLoadingAppointment(false);
      });
    }
  }, [currentUser, searchInput]);

  return (
    <div id="order-page" className="order-page bg-grey">
      <MainVisual heading={t("uapm.Appointments")} />
      <Breadcrumb leaf={t("uapm.Appointments")} />
      <div className="container">
        <div className="order-page__controller">
          <form onSubmit={handleSearch} className="search">
            <input
              type="text"
              name="searchInput"
              placeholder={t("uapm.Search by ID")}
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
                  <span>{t(`uapm.${item.title}`)}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className={`show ${showMore ? "show--active" : ""}`}>
            <button
              onClick={() => setShowMore((state) => (state ? false : true))}
            >
              <span></span>
            </button>
          </div>
        </div>
        {loadingAppointment ? (
          <Loading />
        ) : appointments.length > 0 ? (
          <div className="order-page__list">
            <ul>
              <li>
                <div className="col col--01">
                  <strong>#</strong>
                </div>
                <div className="col col--02">
                  <strong>{t("uapm.Appointment")}</strong>
                </div>
                <div className="col col--03">
                  <strong>{t("uapm.Date")}</strong>
                </div>
                <div className="col col--04">
                  <strong>{t("uapm.Type")}</strong>
                </div>
                <div className="col col--05">
                  <strong>{t("uapm.Status")}</strong>
                </div>
                <div className="col col--06"></div>
              </li>
              {appointments.map((appointment, i) => (
                <li key={appointment._id}>
                  <div className="col col--01">
                    <span>{i + 1}</span>
                  </div>
                  <div className="col col--02">
                    <button
                      onClick={() => {
                        setShowDetail(true);
                        dispatch(
                          appointmentActions.getSingleAppointment(
                            appointment._id
                          )
                        );
                      }}
                    >
                      <span>#{appointment._id}</span>
                    </button>
                  </div>
                  <div className="col col--03">
                    <span>{appointment.appointmentDate}</span>
                  </div>
                  <div className="col col--04">
                    <span>{t(`uapm.${appointment.serviceType}`)}</span>
                  </div>
                  <div className="col col--05">
                    <span
                      className={`status ${appointment.status.toLowerCase()}`}
                    >
                      {t(`uapm.${appointment.status}`)}
                    </span>
                  </div>
                  <div className="col col--06">
                    {appointment.status !== "Completed" ? (
                      <button
                        className="trash"
                        onClick={() => {
                          setShowDelete(true);
                          setTarget(appointment._id);
                        }}
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="trash-alt"
                          className="svg-inline--fa fa-trash-alt fa-w-14"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="currentColor"
                            d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                          ></path>
                        </svg>
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="container">
            <p className="cart-page__no-item">
              {t("uapm.Do not have any Appointments.")}
              <button
                onClick={() => {
                  setFilterStt("All");
                  setSearchInput("");
                }}
              >
                {t("o.Go Back")}
              </button>
            </p>
          </div>
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

      {/* DELETE  */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {t("apm.Do you wish to delete this appointment?")}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="group-btn">
            <button
              onClick={() => {
                handleDelete(target);
                setShowDelete(false);
              }}
            >
              {t("apm.Delete")}
            </button>
            <button onClick={() => setShowDelete(false)}>
              {t("apm.Cancel")}
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* DETAIL  */}
      <Modal show={showDetail} onHide={() => setShowDetail(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("apm.Summary Appointment")}</Modal.Title>
        </Modal.Header>

        {loadingSingle ? (
          <Loading />
        ) : (
          <>
            {singleAppointment ? (
              <Modal.Body>
                <div className="reader">
                  <div className="reader__appointment">
                    <div className="img">
                      <div
                        className="img__item"
                        style={{
                          backgroundImage: `url('${
                            singleAppointment.data.from.avatar
                              ? singleAppointment.data.from.avatar
                              : noimg
                          }')`,
                        }}
                      ></div>
                      <div
                        className="img__item"
                        style={{
                          backgroundImage: `url('${
                            singleAppointment.data.to.avatar
                              ? singleAppointment.data.to.avatar
                              : noimg
                          }')`,
                        }}
                      ></div>
                    </div>
                    <div className="info">
                      <div className="info__item">
                        <p className="name">
                          {singleAppointment.data.from.fullname}
                        </p>
                        <p className="position">
                          {singleAppointment.data.from.position}{" "}
                          {singleAppointment.data.from.role === "Reader"
                            ? "Reader"
                            : ""}
                        </p>
                      </div>
                      <div className="info__item">
                        <p className="name">
                          {singleAppointment.data.to.fullname}
                        </p>
                        <p className="position">
                          {singleAppointment.data.to.position}{" "}
                          {singleAppointment.data.to.position === "Admin"
                            ? ""
                            : "Reader"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order order--admin order--appointment">
                  <div className="order__heading">
                    <p>
                      {t("apm.Phone")}:{" "}
                      <strong>{singleAppointment.data.clientPhone}</strong>
                    </p>
                    <p>
                      {t("apm.Status")}:{" "}
                      <strong
                        className={`status-other ${singleAppointment.data.status
                          .toLowerCase()
                          .replace(" ", "")}`}
                      >
                        {singleAppointment.data.status}
                      </strong>
                    </p>
                  </div>
                  <ul className="order__info">
                    <li>
                      <div className="col col--half">
                        <strong>{t("apm.Date")}</strong>
                      </div>
                      <div className="col col--half">
                        <strong>{t("apm.Type")}</strong>
                      </div>
                    </li>
                    <li>
                      <div className="col col--half">
                        <span>{singleAppointment.data.appointmentDate}</span>
                      </div>
                      <div className="col col--half">
                        <span>
                          {t(`apm.${singleAppointment.data.serviceType}`)}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </Modal.Body>
            ) : (
              ""
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default withNamespaces()(AppointmentPage);
