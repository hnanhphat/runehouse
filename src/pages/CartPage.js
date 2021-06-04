import noimg from "../noimg.jpeg";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { cartActions } from "../redux/actions/cart.actions";
import { orderActions } from "../redux/actions/order.actions";
import { routeActions } from "../redux/actions/route.actions";

import { Modal } from "react-bootstrap";

import MainVisual from "../components/MainVisual";
import Breadcrumb from "../components/Breadcrumb";
import PaginationBar from "../components/PaginationBar";
// import Loading from "../components/Loading";

import { withNamespaces } from "react-i18next";

const CartPage = ({ t }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.carts.data);
  // const loading = useSelector((state) => state.cart.loading);
  const totalPage = useSelector((state) => state.cart.totalPages);
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const currentUser = useSelector((state) => state.user.currentUser.data);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formInput, setFormInput] = useState({
    shipping: "",
    phone: "",
    payment: "COD",
  });

  const handleUpdate = (quantity, id) => {
    dispatch(
      cartActions.updateCart({ quantity }, id, currentPage, "&isOrdered=false")
    );
  };

  const handleDelete = (id) => {
    dispatch(cartActions.deleteCart(id, currentPage, "&isOrdered=false"));
  };

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    const customer = currentUser && currentUser.data._id;
    const cartsId = [];
    carts &&
      carts.data.carts.forEach((cart) => {
        cartsId.push(cart._id);
      });
    const total =
      carts &&
      carts.data.carts.reduce(
        (a, b) => a + b.decks.oficialPrice * b.quantity,
        0
      );
    const quantity =
      carts && carts.data.carts.reduce((a, b) => a + b.quantity, 0);
    const { shipping, phone, payment } = formInput;
    dispatch(
      orderActions.createOrder({
        customer,
        carts: cartsId,
        total,
        shipping,
        phone,
        payment,
        quantity,
      })
    );
    setShowModal(false);
  };

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo, currentPage]);

  return (
    <div id="cart-page" className="cart-page bg-grey">
      <MainVisual heading={t("c.Cart")} />
      <Breadcrumb leaf={t("c.Cart")} />
      {carts && carts.data.carts.length ? (
        <div className="container">
          <div className="cart-page__details">
            <ul>
              <li>
                <div className="col col--01">
                  <strong>{t("c.Product")}</strong>
                </div>
                <div className="col col--02">
                  <strong>{t("c.Unit Price")}</strong>
                </div>
                <div className="col col--03">
                  <strong>{t("c.Quantity")}</strong>
                </div>
                <div className="col col--04">
                  <strong>{t("c.Total")}</strong>
                </div>
                <div className="col col--05"></div>
              </li>
              {carts &&
                carts.data.carts.map((cart) => (
                  <li key={cart._id}>
                    <div className="col col--01">
                      <div
                        className="img"
                        style={{
                          backgroundImage: `url('${
                            cart.decks.image ? cart.decks.image : noimg
                          }')`,
                        }}
                      ></div>
                      <p className="tit">{cart.decks.name}</p>
                    </div>
                    <div className="col col--02">
                      <p className="price">${cart.decks.oficialPrice}</p>
                    </div>
                    <div className="col col--03">
                      <span className="number">{cart.quantity}</span>
                      <div className="group">
                        <button
                          onClick={() => handleUpdate(-1, cart._id)}
                          className={`down ${cart.quantity <= 1 ? "hide" : ""}`}
                        ></button>
                        <button
                          onClick={() => handleUpdate(1, cart._id)}
                          className="up"
                        ></button>
                      </div>
                    </div>
                    <div className="col col--04">
                      <p className="total">
                        ${cart.decks.oficialPrice * cart.quantity}
                      </p>
                    </div>
                    <div className="col col--05">
                      <button
                        onClick={() => handleDelete(cart._id)}
                        className="trash"
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
          <div className="cart-page__total">
            <h2 className="tit">{t("c.Cash Total")}</h2>
            <div className="total">
              <strong>{t("c.Total")}</strong>
              <span>
                $
                {carts &&
                  carts.data.carts.reduce(
                    (a, b) => a + b.decks.oficialPrice * b.quantity,
                    0
                  )}
              </span>
            </div>
            <button onClick={() => setShowModal(true)} className="checkout">
              {t("c.Checkout")}
            </button>
          </div>

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
      ) : (
        <div className="container">
          <p className="cart-page__no-item">
            {t("c.Do not have any items.")}
            <Link to="/">{t("c.Go Back")}</Link>
          </p>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("c.Billing Details")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="details">
            <h3 className="details__tit">{t("c.Your Order Summary")}</h3>
            <ul className="details__list">
              {carts &&
                carts.data.carts.map((cart) => (
                  <li key={cart._id}>
                    <p>
                      <strong>{cart.decks.name}</strong>
                      <em>({cart.quantity}pc)</em>
                    </p>
                    <span>${cart.decks.oficialPrice * cart.quantity}</span>
                  </li>
                ))}
            </ul>
            <p className="details__total">
              $
              {carts &&
                carts.data.carts.reduce(
                  (a, b) => a + b.decks.oficialPrice * b.quantity,
                  0
                )}
            </p>
          </div>
          <form action="" className="form">
            <div className="form__group">
              <div className="item">
                <input
                  type="text"
                  name="phone"
                  placeholder={t("c.Phone Number")}
                  onChange={handleChange}
                />
              </div>
              <div className="item" onChange={handleChange}>
                <select name="payment">
                  <option value="COD">{t("c.COD")}</option>
                  <option value="Visa">{t("c.Visa")}</option>
                  <option value="Installment">{t("c.Installment")}</option>
                </select>
              </div>
            </div>
            <div className="form__group">
              <div className="item item--full">
                <input
                  type="text"
                  name="shipping"
                  placeholder="Shipping Address"
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button
            onClick={handleCheckout}
            className={formInput.shipping && formInput.phone ? "active" : ""}
          >
            {t("c.Send")}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default withNamespaces()(CartPage);
