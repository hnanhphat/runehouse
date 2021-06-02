import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentActions } from "../redux/actions/appointment.actions";

import PaginationBar from "../components/PaginationBar";

// IMAGES
import all from "../img/categoris/infinity.svg";
import requesting from "../img/categoris/requesting.svg";
import processing from "../img/categoris/processing.svg";
import completed from "../img/categoris/completed.svg";
import cancelled from "../img/categoris/cancel.svg";

const AdminAppointmentsPage = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(
    (state) => state.appointment.appointments.data
  );
  const totalPage = useSelector((state) => state.appointment.totalPages);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filterStt, setFilterStt] = useState("All");

  console.log(appointments);

  const filter = [
    { title: "All", image: all, search: "" },
    { title: "Requesting", image: requesting, search: "&role=Admin" },
    { title: "Processing", image: processing, search: "&role=Reader" },
    { title: "Completed", image: completed, search: "&role=User" },
    { title: "Cancelled", image: cancelled, search: "&role=User" },
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
    dispatch(
      appointmentActions.getListOfAppointments(currentPage, searchInput)
    );
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
      {appointments && appointments.data.appointments.length ? (
        <ul className="admin__appointments">
          <li>
            <div className="col col--01">
              <strong>#</strong>
            </div>
            <div className="col col--02">
              <strong>Order</strong>
            </div>
            <div className="col col--03">
              <strong>Date</strong>
            </div>
            <div className="col col--04">
              <strong>Type</strong>
            </div>
            <div className="col col--05">
              <strong>Status</strong>
            </div>
            <div className="col col--06"></div>
          </li>
          {appointments.data.appointments.map((appointment, i) => (
            <li key={appointment._id}>
              <div className="col col--01">
                <span>{i + 1}</span>
              </div>
              <div className="col col--02">
                <button>
                  <span>#{appointment._id}</span>
                </button>
              </div>
              <div className="col col--03">
                <span>{appointment.appointmentDate}</span>
              </div>
              <div className="col col--04">
                <span>{appointment.serviceType}</span>
              </div>
              <div className="col col--05">
                <span className={`status ${appointment.status.toLowerCase()}`}>
                  {appointment.status}
                </span>
              </div>
              <div className="col col--06">
                <button
                  className="edit"
                  onClick={() => {
                    // setShowDelete(true);
                    // setTarget(order._id);
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
                <button
                  className="trash"
                  onClick={() => {
                    // setShowDelete(true);
                    // setTarget(order._id);
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
      ) : (
        <p className="admin__no-item">Don't have any Appointments.</p>
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

export default AdminAppointmentsPage;
