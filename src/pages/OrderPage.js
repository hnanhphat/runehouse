import noimg from "../noimg.jpeg";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../redux/actions/order.actions";
import socketIOClient from "socket.io-client";

import { Modal } from "react-bootstrap";
import Moment from "react-moment";

import MainVisual from "../components/MainVisual";
import Breadcrumb from "../components/Breadcrumb";
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
const OrderPage = ({ t }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser.data);
  const loadingSingle = useSelector((state) => state.order.loadingSingle);
  const singleOrders = useSelector((state) => state.order.singleOrders.data);

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [orderStatus, setOrderStatus] = useState("All");
  const [searchInput, setSearchInput] = useState("");

  const [showDelete, setShowDelete] = useState(false);
  const [target, setTarget] = useState("");
  const [showDetail, setShowDetail] = useState(false);

  const [showMore, setShowMore] = useState(false);

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
    socket.emit("od.change", {
      id: id,
      status: "Cancelled",
    });
  };

  useEffect(() => {
    socket = socketIOClient(BE_URL);
    socket.emit("od.user_init", {
      id: currentUser && currentUser.data._id,
      ...searchInput,
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser, searchInput]);

  useEffect(() => {
    setLoadingOrders(true);
    if (socket) {
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

      socket.on("od.user_noti", (od) => {
        console.log(("I got it from backend", od));
        setOrders(od.orders);
        setTotalPage(od.totalPages);
        setLoadingOrders(false);
      });
    }
  }, [currentUser, searchInput]);

  return (
    <div id="order-page" className="order-page bg-grey">
      <MainVisual heading={t("o.Orders")} />
      <Breadcrumb leaf={t("o.Orders")} />
      <div className="container">
        <div className="order-page__controller">
          <form onSubmit={handleSearch} className="search">
            <input
              type="text"
              name="searchInput"
              placeholder={t("o.Search by Payment")}
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
                className={`${orderStatus === "All" ? "active" : ""}`}
                onClick={() => {
                  setOrderStatus("All");
                  setSearchInput("");
                }}
              >
                <img src={all} alt="All" />
                <span>{t("o.All")}</span>
              </button>
            </li>
            <li>
              <button
                className={`${orderStatus === "To Pay" ? "active" : ""}`}
                onClick={() => {
                  setOrderStatus("To Pay");
                  setSearchInput({ status: "To Pay" });
                }}
              >
                <img src={wallet} alt="To Pay" />
                <span>{t("o.To Pay")}</span>
              </button>
            </li>
            <li>
              <button
                className={`${orderStatus === "To Ship" ? "active" : ""}`}
                onClick={() => {
                  setOrderStatus("To Ship");
                  setSearchInput({ status: "To Ship" });
                }}
              >
                <img src={box} alt="To Ship" />
                <span>{t("o.To Ship")}</span>
              </button>
            </li>
            <li>
              <button
                className={`${orderStatus === "To Receive" ? "active" : ""}`}
                onClick={() => {
                  setOrderStatus("To Receive");
                  setSearchInput({ status: "To Receive" });
                }}
              >
                <img src={truck} alt="To Receive" />
                <span>{t("o.To Receive")}</span>
              </button>
            </li>
            <li>
              <button
                className={`${orderStatus === "Completed" ? "active" : ""}`}
                onClick={() => {
                  setOrderStatus("Completed");
                  setSearchInput({ status: "Completed" });
                }}
              >
                <img src={checked} alt="Completed" />
                <span>{t("o.Completed")}</span>
              </button>
            </li>
            <li>
              <button
                className={`${orderStatus === "Cancelled" ? "active" : ""}`}
                onClick={() => {
                  setOrderStatus("Cancelled");
                  setSearchInput({ status: "Cancelled" });
                }}
              >
                <img src={cancel} alt="Cancelled" />
                <span>{t("o.Cancelled")}</span>
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
        {loadingOrders ? (
          <Loading />
        ) : orders.length > 0 ? (
          <div className="order-page__list">
            <ul>
              <li>
                <div className="col col--01">
                  <strong>#</strong>
                </div>
                <div className="col col--02">
                  <strong>{t("o.Order")}</strong>
                </div>
                <div className="col col--03">
                  <strong>{t("o.Payment")}</strong>
                </div>
                <div className="col col--04">
                  <strong>{t("o.Total")}</strong>
                </div>
                <div className="col col--05">
                  <strong>{t("o.Status")}</strong>
                </div>
                <div className="col col--06"></div>
              </li>
              {orders.map((order, i) => (
                <li key={order._id}>
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
                    <span>{t(`o.${order.payment}`)}</span>
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
                      {t(`o.${order.status}`)}
                    </span>
                  </div>
                  <div className="col col--06">
                    {order.status !== "To Pay" && order.status !== "To Ship" ? (
                      ""
                    ) : (
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
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="container">
            <p className="cart-page__no-item">
              {t("o.Do not have any Order.")}
              <button
                onClick={() => {
                  setOrderStatus("All");
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

      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("o.Do you wish to cancel this order?")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="group-btn">
            <button
              onClick={() => {
                handleDelete(target);
                setShowDelete(false);
              }}
            >
              {t("o.Delete")}
            </button>
            <button onClick={() => setShowDelete(false)}>
              {t("o.Cancel")}
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showDetail} onHide={() => setShowDetail(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("o.Order Detail")}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body--large">
          {loadingSingle ? (
            <Loading />
          ) : singleOrders ? (
            <div className="order">
              <div className="order__heading">
                <p>
                  {t("o.Phone")}: <strong>{singleOrders.data.phone}</strong>
                </p>
                <p>
                  {t("o.Status")}:{" "}
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
                    <strong>{t("o.Date")}</strong>
                  </div>
                  <div className="col col--02">
                    <strong>{t("o.Payment")}</strong>
                  </div>
                  <div className="col col--03">
                    <strong>{t("o.Address")}</strong>
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
                        {t("o.Quantity")}: {cart.quantity}
                      </span>
                      <span>
                        {t("o.Unit Price")}: {cart.decks.oficialPrice}
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
                  <span>{t("o.Total")}:</span>
                  <strong>${singleOrders.data.total}</strong>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default withNamespaces()(OrderPage);
