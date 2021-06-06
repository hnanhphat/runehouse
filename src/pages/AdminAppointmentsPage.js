import noimg from "../noimg.jpeg";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentActions } from "../redux/actions/appointment.actions";
import { userActions } from "../redux/actions/user.actions";

import { Modal } from "react-bootstrap";

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

const AdminAppointmentsPage = ({ t }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser.data);
  const singleUser = useSelector((state) => state.user.singleUser.data);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const appointments = useSelector(
    (state) => state.appointment.appointments.data
  );
  const singleAppointment = useSelector(
    (state) => state.appointment.singleAppointment.data
  );
  const loadingList = useSelector((state) => state.appointment.loadingList);
  const loadingSingle = useSelector((state) => state.appointment.loadingSingle);
  const totalPage = useSelector((state) => state.appointment.totalPages);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filterStt, setFilterStt] = useState("All");

  const [showEdit, setShowEdit] = useState(false);

  const [formEdit, setFormEdit] = useState({
    status: "",
  });

  const [formApply, setFormApply] = useState({});
  const [targetApply, setTargetApply] = useState("");

  const [showDelete, setShowDelete] = useState(false);
  const [target, setTarget] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const [showDetail, setShowDetail] = useState(false);

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
    setSearchInput(`&fullname=${e.target.searchInput.value}`);
    if (e.target.searchInput.value) {
      setFilterStt("");
    } else {
      setFilterStt("All");
    }
    e.target.reset();
  };

  const handleDelete = (id) => {
    dispatch(
      appointmentActions.deleteAppointment(id, currentPage, searchInput)
    );
  };

  const handleChange = (e) => {
    setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
  };

  const handleEdit = (id) => {
    const { status } = formEdit;
    dispatch(
      appointmentActions.editAppointment(
        { status },
        id,
        currentPage,
        searchInput
      )
    );
    setShowEdit(false);
  };

  const handleAccept = (val) => {
    const { avatar, fullname, username, position, role } = formApply;
    dispatch(
      userActions.updateSinlgeUser(val, {
        avatar,
        fullname,
        username,
        position,
        role,
      })
    );
    setShowDetail(false);
  };

  useEffect(() => {
    if (isAdmin === "Admin") {
      dispatch(
        appointmentActions.getListOfAppointments(
          currentPage,
          searchInput,
          false
        )
      );
    } else {
      if (currentUser) {
        dispatch(
          appointmentActions.getListOfAppointments(
            currentPage,
            `&to=${currentUser.data._id}${searchInput}`,
            true
          )
        );
      }
    }
  }, [dispatch, searchInput, currentPage, currentUser, isAdmin]);

  useEffect(() => {
    setFormEdit({
      status: singleAppointment && singleAppointment.data.status,
    });
  }, [singleAppointment]);

  useEffect(() => {
    setFormApply({
      avatar: singleUser && singleUser.data.avatar,
      fullname: singleUser && singleUser.data.fullname,
      username: singleUser && singleUser.data.username,
      position: singleAppointment && singleAppointment.data.position,
      role: "Reader",
    });
  }, [singleUser, singleAppointment]);

  return (
    <div id="admin-users" className="admin__content">
      <div className="admin__controller">
        <form onSubmit={handleSearch} className="search">
          <input type="text" name="searchInput" placeholder={t("apm.Search")} />
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
                <span>{t(`apm.${item.title}`)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {loadingList ? (
        <Loading />
      ) : appointments && appointments.data.appointments.length ? (
        <div className="admin__appointments">
          <ul>
            <li>
              <div className="col col--01">
                <strong>#</strong>
              </div>
              <div className="col col--02">
                <strong>{t("apm.Order")}</strong>
              </div>
              <div className="col col--03">
                <strong>{t("apm.Date")}</strong>
              </div>
              <div className="col col--04">
                <strong>{t("apm.Type")}</strong>
              </div>
              <div className="col col--05">
                <strong>{t("apm.Status")}</strong>
              </div>
              <div className="col col--06"></div>
            </li>
            {appointments.data.appointments.map((appointment, i) => (
              <li key={appointment._id}>
                <div className="col col--01">
                  <span>{i + 1}</span>
                </div>
                <div className="col col--02">
                  <button
                    onClick={() => {
                      setShowDetail(true);
                      dispatch(
                        appointmentActions.getSingleAppointment(appointment._id)
                      );
                      dispatch(userActions.getSingleUser(appointment.from));
                      setTargetApply(appointment.from);
                    }}
                  >
                    <span>#{appointment._id}</span>
                  </button>
                </div>
                <div className="col col--03">
                  <span>{appointment.appointmentDate}</span>
                </div>
                <div className="col col--04">
                  <span>{t(`apm.${appointment.serviceType}`)}</span>
                </div>
                <div className="col col--05">
                  <span
                    className={`status ${appointment.status.toLowerCase()}`}
                  >
                    {t(`apm.${appointment.status}`)}
                  </span>
                </div>
                <div className="col col--06">
                  {appointment.status !== "Completed" ? (
                    <button
                      className="edit"
                      onClick={() => {
                        setShowEdit(true);
                        setEditStatus(appointment.status);
                        setTarget(appointment._id);
                        dispatch(
                          appointmentActions.getSingleAppointment(
                            appointment._id
                          )
                        );
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="sliders-h"
                        className="svg-inline--fa fa-sliders-h fa-w-16"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M496 384H160v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h80v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h336c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160h-80v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h336v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h80c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160H288V48c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16C7.2 64 0 71.2 0 80v32c0 8.8 7.2 16 16 16h208v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h208c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16z"
                        ></path>
                      </svg>
                    </button>
                  ) : (
                    ""
                  )}
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
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="admin__no-item">
          {t("apm.Do not have any Appointments.")}
        </p>
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

      {/* EDIT  */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("apm.Change Status")}</Modal.Title>
        </Modal.Header>

        {loadingSingle ? (
          <Loading />
        ) : (
          <>
            <Modal.Body>
              {singleAppointment ? (
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
              ) : (
                ""
              )}
              <form className="form">
                <div className="form__group">
                  <div className="item item--full">
                    <select
                      name="status"
                      value={formEdit.status}
                      onChange={handleChange}
                    >
                      <option value="Requesting">{t("apm.Requesting")}</option>
                      <option value="Processing">{t("apm.Processing")}</option>
                      <option value="Completed">{t("apm.Completed")}</option>
                      <option value="Cancelled">{t("apm.Cancelled")}</option>
                    </select>
                  </div>
                </div>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <button
                className={formEdit.status !== editStatus ? "active" : ""}
                onClick={() => handleEdit(target)}
              >
                {t("apm.Change")}
              </button>
            </Modal.Footer>
          </>
        )}
      </Modal>

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

            {singleAppointment &&
            singleAppointment.data.serviceType === "Recruitment" &&
            singleUser &&
            singleUser.data.position === "User" ? (
              <Modal.Footer>
                <button
                  className={
                    singleAppointment.data.status === "Completed"
                      ? "active"
                      : ""
                  }
                  onClick={() => handleAccept(targetApply)}
                >
                  {t("apm.Accept")}
                </button>
              </Modal.Footer>
            ) : (
              ""
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default withNamespaces()(AdminAppointmentsPage);
