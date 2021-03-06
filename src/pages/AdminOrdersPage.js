import noimg from "../noimg.jpeg";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../redux/actions/order.actions";
import socketIOClient from "socket.io-client";

import { Modal } from "react-bootstrap";
import Moment from "react-moment";

import PaginationBar from "../components/PaginationBar";
import Loading from "../components/Loading";

// IMAGES
import all from "../img/categoris/infinity.svg";
import wallet from "../img/categoris/wallet.svg";
import box from "../img/categoris/box.svg";
import truck from "../img/categoris/truck.svg";
import checked from "../img/categoris/checked.svg";
import cancel from "../img/categoris/cancel.svg";

import { withNamespaces } from "react-i18next";

let socket;
const BE_URL = process.env.REACT_APP_BACKEND_API;
const AdminOrdersPage = ({ t }) => {
  const dispatch = useDispatch();

  const loadingSingle = useSelector((state) => state.order.loadingSingle);
  const singleOrders = useSelector((state) => state.order.singleOrders.data);

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderStatus, setOrderStatus] = useState("All");
  const [searchInput, setSearchInput] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [formEdit, setFormEdit] = useState({
    status: "",
  });

  const [showDelete, setShowDelete] = useState(false);
  const [target, setTarget] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const [showDetail, setShowDetail] = useState(false);

  const filter = [
    { title: "All", image: all, search: "" },
    { title: "To Pay", image: wallet, search: { status: "To Pay" } },
    { title: "To Ship", image: box, search: { status: "To Ship" } },
    { title: "To Receive", image: truck, search: { status: "To Receive" } },
    { title: "Completed", image: checked, search: { status: "Completed" } },
    { title: "Cancelled", image: cancel, search: { status: "Cancelled" } },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput({ payment: e.target.searchInput.value });
    if (e.target.searchInput.value) {
      setOrderStatus("");
    } else {
      setOrderStatus("All");
    }
    e.target.reset();
  };

  const handleDelete = (id) => {
    socket.emit("od.delete", {
      id: id,
    });
  };

  const handleChange = (e) => {
    setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
  };

  const handleEdit = (id) => {
    const { status } = formEdit;
    socket.emit("od.change", {
      id: id,
      status: status,
    });
    setShowEdit(false);
  };

  useEffect(() => {
    setFormEdit({
      status: singleOrders && singleOrders.data.status,
    });
  }, [singleOrders]);

  useEffect(() => {
    socket = socketIOClient(BE_URL);
    socket.emit("od.init", {
      page: currentPage,
      ...searchInput,
    });

    return () => {
      socket.disconnect();
    };
  }, [currentPage, searchInput]);

  useEffect(() => {
    setLoadingOrders(true);
    if (socket) {
      socket.on("od.request", (od) => {
        console.log(("I got it from backend", od));
        setOrders((state) => [od.order, ...state]);
        setLoadingOrders(false);
      });

      socket.on("od.receive", (od) => {
        console.log(("I got it from backend", od));
        setOrders((state) => {
          state.forEach((el) => {
            if (el._id === od._id) {
              el.status = od.status;
            }
          });
          return [...state];
        });
        setLoadingOrders(false);
      });

      socket.on("od.deleted", (od) => {
        console.log(("I got it from backend", od));
        setOrders((state) => {
          const index = state.findIndex((el) => el._id === od._id);
          state.splice(index, 1);
          return [...state];
        });
        setLoadingOrders(false);
      });

      socket.on("od.noti", (od) => {
        console.log(("I got it from backend", od));
        setOrders(od.orders);
        setTotalPage(od.totalPages);
        setLoadingOrders(false);
      });
    }
  }, [currentPage, searchInput]);

  return (
    <div id="admin-cards" className="admin__content">
      <div className="admin__controller">
        <form onSubmit={handleSearch} className="search">
          <input
            type="text"
            name="searchInput"
            placeholder={t("ao.Search by Payment")}
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
        <ul className="filter filter--six">
          {filter.map((item) => (
            <li key={item.title}>
              <button
                className={`${orderStatus === item.title ? "active" : ""}`}
                onClick={() => {
                  setOrderStatus(item.title);
                  setSearchInput(item.search);
                }}
              >
                <img src={item.image} alt={item.title} />
                <span>{t(`ao.${item.title}`)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {loadingOrders ? (
        <Loading />
      ) : orders.length > 0 ? (
        <div className="admin__orders">
          <ul>
            <li>
              <div className="col col--01">
                <strong>#</strong>
              </div>
              <div className="col col--02">
                <strong>{t("ao.Order")}</strong>
              </div>
              <div className="col col--03">
                <strong>{t("ao.Payment")}</strong>
              </div>
              <div className="col col--04">
                <strong>{t("ao.Total")}</strong>
              </div>
              <div className="col col--05">
                <strong>{t("ao.Status")}</strong>
              </div>
              <div className="col col--06"></div>
            </li>
            {orders.map((order, i) => (
              <li key={i}>
                <div className="col col--01">
                  <span>{i + 1}</span>
                </div>
                <div className="col col--02">
                  <button
                    onClick={() => {
                      setShowDetail(true);
                      dispatch(orderActions.getSingleOrder(order._id));
                    }}
                  >
                    <span>#{order._id}</span>
                  </button>
                </div>
                <div className="col col--03">
                  <span>{t(`ao.${order.payment}`)}</span>
                </div>
                <div className="col col--04">
                  <span>${order.total}</span>
                </div>
                <div className="col col--05">
                  <span
                    className={`status ${order.status
                      .toLowerCase()
                      .replace(" ", "")}`}
                  >
                    {t(`ao.${order.status}`)}
                  </span>
                </div>
                <div className="col col--06">
                  {order.status !== "Completed" ? (
                    <button
                      className="edit"
                      onClick={() => {
                        setShowEdit(true);
                        setEditStatus(order.status);
                        setTarget(order._id);
                        dispatch(orderActions.getSingleOrder(order._id));
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
                      setTarget(order._id);
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
        <p className="admin__no-item">{t("ao.Do not have any Order.")}</p>
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
          <Modal.Title>{t("ao.Change Status")}</Modal.Title>
        </Modal.Header>

        {loadingSingle ? (
          <Loading />
        ) : (
          <>
            <Modal.Body>
              {singleOrders ? (
                <div className="reader">
                  <div
                    className="reader__avatar"
                    style={{
                      backgroundImage: `url('${
                        singleOrders.data.customer.avatar
                          ? singleOrders.data.customer.avatar
                          : noimg
                      }')`,
                    }}
                  ></div>
                  <div className="reader__info">
                    <p className="name">
                      {singleOrders.data.customer.fullname}
                    </p>
                    <p className="position">
                      {singleOrders.data.customer.position}
                    </p>
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
                      <option value="To Pay">{t("ao.To Pay")}</option>
                      <option value="To Ship">{t("ao.To Ship")}</option>
                      <option value="To Receive">{t("ao.To Receive")}</option>
                      <option value="Completed">{t("ao.Completed")}</option>
                      <option value="Cancelled">{t("ao.Cancelled")}</option>
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
                {t("ao.Change")}
              </button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* DELETE  */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("ao.Do you wish to cancel this order?")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="group-btn">
            <button
              onClick={() => {
                handleDelete(target);
                setShowDelete(false);
              }}
            >
              {t("ao.Delete")}
            </button>
            <button onClick={() => setShowDelete(false)}>
              {t("ao.Cancel")}
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* DETAIL  */}
      <Modal show={showDetail} onHide={() => setShowDetail(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("ao.Order Detail")}</Modal.Title>
        </Modal.Header>

        {loadingSingle ? (
          <Loading />
        ) : singleOrders ? (
          <Modal.Body className="modal-body--large">
            <div className="reader">
              <div
                className="reader__avatar"
                style={{
                  backgroundImage: `url('${
                    singleOrders.data.customer.avatar
                      ? singleOrders.data.customer.avatar
                      : noimg
                  }')`,
                }}
              ></div>
              <div className="reader__info">
                <p className="name">{singleOrders.data.customer.fullname}</p>
                <p className="position">
                  {singleOrders.data.customer.position}
                </p>
              </div>
            </div>
            <div className="order order--admin">
              <div className="order__heading">
                <p>
                  {t("ao.Phone")}: <strong>{singleOrders.data.phone}</strong>
                </p>
                <p>
                  {t("ao.Status")}:{" "}
                  <strong
                    className={`status ${singleOrders.data.status
                      .toLowerCase()
                      .replace(" ", "")}`}
                  >
                    {singleOrders.data.status}
                  </strong>
                </p>
              </div>
              <ul className="order__info">
                <li>
                  <div className="col col--01">
                    <strong>{t("ao.Date")}</strong>
                  </div>
                  <div className="col col--02">
                    <strong>{t("ao.Payment")}</strong>
                  </div>
                  <div className="col col--03">
                    <strong>{t("ao.Address")}</strong>
                  </div>
                </li>
                <li>
                  <div className="col col--01">
                    <Moment
                      format="MMM D, YYYY"
                      withTitle={singleOrders.data.createdAt}
                    />
                  </div>
                  <div className="col col--02">
                    <span>{singleOrders.data.payment}</span>
                  </div>
                  <div className="col col--03">
                    <span>{singleOrders.data.shipping}</span>
                  </div>
                </li>
              </ul>
              <ul className="order__list">
                {singleOrders.data.carts.map((cart) => (
                  <li key={cart._id}>
                    <div
                      className="img"
                      style={{
                        backgroundImage: `url('${
                          cart.decks.image ? cart.decks.image : noimg
                        }')`,
                      }}
                    ></div>
                    <div className="info">
                      <p>{cart.decks.name}</p>
                      <span>
                        {t("ao.Quantity")}: {cart.quantity}
                      </span>
                      <span>
                        {t("ao.Unit Price")}: {cart.decks.oficialPrice}
                      </span>
                    </div>
                    <div className="price">
                      ${cart.quantity * cart.decks.oficialPrice}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="order__total">
                <div className="box">
                  <span>{t("ao.Total")}:</span>
                  <strong>${singleOrders.data.total}</strong>
                </div>
              </div>
            </div>
          </Modal.Body>
        ) : (
          ""
        )}
      </Modal>
    </div>
  );
};

export default withNamespaces()(AdminOrdersPage);
