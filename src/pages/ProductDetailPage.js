import noimg from "../noimg.jpeg";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import { decksActions } from "../redux/actions/decks.actions";
import { routeActions } from "../redux/actions/route.actions";
import { cartActions } from "../redux/actions/cart.actions";
import MainVisual from "../components/MainVisual";
import Breadcrumb from "../components/Breadcrumb";

const ProductDetailPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const decks = useSelector((state) => state.decks.singleDecks.data);
  const [quantity, setQuantity] = useState(1);

  const handleAddCart = (val) => {
    dispatch(cartActions.createCart({ decks: val, quantity: quantity }));
  };

  useEffect(() => {
    dispatch(decksActions.getSingleDecks(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo]);

  return (
    <div id="proudct-detail" className="proudct-detail bg-grey">
      <MainVisual heading={decks && decks.data.name} />
      <Breadcrumb branch="products" leaf={decks && decks.data.name} />
      <div className="product-detail__area">
        <div className="product-detail__container">
          <div
            className="img"
            style={{
              backgroundImage: `url('${
                decks && decks.data.image ? decks.data.image : noimg
              }')`,
            }}
          ></div>
          <div className="content">
            <h3 className="name">{decks && decks.data.name}</h3>
            <p className="price">
              <span className="price__before">
                ${decks && decks.data.defaultPrice}
              </span>
              <span className="price__after">
                ${decks && decks.data.oficialPrice}
              </span>
            </p>
            <p className="description">{decks && decks.data.description}</p>
            <div className="quantity">
              <span className="quantity__number">{quantity}</span>
              <div className="quantity__group">
                <button
                  className={`down ${quantity <= 1 ? "hide" : ""}`}
                  onClick={() => {
                    setQuantity((state) => --state);
                  }}
                ></button>
                <button
                  className="up"
                  onClick={() => {
                    setQuantity((state) => ++state);
                  }}
                ></button>
              </div>
            </div>
            <button onClick={() => handleAddCart(id)} className="btn-cart">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="shopping-cart"
                className="svg-inline--fa fa-shopping-cart fa-w-18"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
                ></path>
              </svg>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
