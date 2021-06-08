import noimg from "../noimg.jpeg";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decksActions } from "../redux/actions/decks.actions";

import MainVisual from "../components/MainVisual";
import Breadcrumb from "../components/Breadcrumb";
import PaginationBar from "../components/PaginationBar";
import Loading from "../components/Loading";

import { withNamespaces } from "react-i18next";

const ProductPage = ({ t }) => {
  const dispatch = useDispatch();
  const decks = useSelector((state) => state.decks.decks.data);
  const loadingList = useSelector((state) => state.decks.loadingList);
  const totalPage = useSelector((state) => state.decks.totalPages);
  const searchField = useSelector((state) => state.decks.searchField);
  const cateField = useSelector((state) => state.decks.cateField);

  const [showFilter, setShowFilter] = useState(Array(2).fill(false));
  const [currentPage, setCurrentPage] = useState(1);

  const [showMore, setShowMore] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(decksActions.searchDecks(`&name=${e.target.searchInput.value}`));
    if (e.target.searchInput.value) {
      dispatch(decksActions.cateDecks(""));
    } else {
      dispatch(decksActions.cateDecks("All"));
    }
    e.target.reset();
  };

  useEffect(() => {
    dispatch(
      decksActions.getListOfDecks(currentPage, searchField, "decks", true)
    );
  }, [dispatch, currentPage, searchField]);

  return (
    <div id="products" className="products bg-grey">
      <MainVisual heading="Products" />
      <Breadcrumb leaf="products" />
      <div className="container">
        <ul className="products__sidebar">
          <li className="search">
            <form onSubmit={handleSearch} className="search__form">
              <input
                type="text"
                name="searchInput"
                placeholder={t("pd.Search")}
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
          </li>
          <li className={`filter ${showMore ? "filter--active" : ""}`}>
            <button
              className={`${cateField === "All" ? "active" : ""}`}
              onClick={() => {
                dispatch(decksActions.cateDecks("All"));
                dispatch(decksActions.searchDecks(""));
              }}
            >
              {t("pd.All")}
            </button>
            <button
              className={`${cateField === "Sale" ? "active" : ""}`}
              onClick={() => {
                dispatch(decksActions.cateDecks("Sale"));
                dispatch(decksActions.searchDecks("&sale=true"));
              }}
            >
              {t("pd.Sale")}
            </button>
          </li>
          <li
            className={`filter filter__list ${
              showFilter[1] ? "filter__list--show" : ""
            } ${showMore ? "filter--active" : ""}`}
          >
            <h3 className="tit">
              {t("pd.Categories")}
              {showFilter[1] ? (
                <button
                  className="more more--show"
                  onClick={() => {
                    let arr = [...showFilter];
                    arr[1] = false;
                    setShowFilter(arr);
                  }}
                ></button>
              ) : (
                <button
                  className="more"
                  onClick={() => {
                    let arr = [...showFilter];
                    arr[1] = true;
                    setShowFilter(arr);
                  }}
                ></button>
              )}
            </h3>
            {decks &&
              decks.data.categories.map((cate) => (
                <button
                  key={cate._id}
                  className={`${cateField === cate._id ? "active" : ""}`}
                  onClick={() => {
                    dispatch(decksActions.cateDecks(cate._id));
                    dispatch(decksActions.searchDecks(`&category=${cate._id}`));
                  }}
                >
                  {t(`pd.${cate._id}`)}
                </button>
              ))}
          </li>
          <li
            className={`filter filter__list ${
              showFilter[2] ? "filter__list--show" : ""
            } ${showMore ? "filter--active" : ""}`}
          >
            <h3 className="tit">
              {t("pd.Genres")}
              {showFilter[2] ? (
                <button
                  className="more more--show"
                  onClick={() => {
                    let arr = [...showFilter];
                    arr[2] = false;
                    setShowFilter(arr);
                  }}
                ></button>
              ) : (
                <button
                  className="more"
                  onClick={() => {
                    let arr = [...showFilter];
                    arr[2] = true;
                    setShowFilter(arr);
                  }}
                ></button>
              )}
            </h3>
            {decks &&
              decks.data.genres.map((genre) => (
                <button
                  key={genre._id}
                  className={`${cateField === genre._id ? "active" : ""}`}
                  onClick={() => {
                    dispatch(decksActions.cateDecks(genre._id));
                    dispatch(decksActions.searchDecks(`&genres=${genre._id}`));
                  }}
                >
                  {t(`pd.${genre._id}`)}
                </button>
              ))}
          </li>
          <li className={`show ${showMore ? "show--active" : ""}`}>
            <button
              onClick={() => setShowMore((state) => (state ? false : true))}
            >
              <span></span>
            </button>
          </li>
        </ul>
        {loadingList ? (
          <Loading />
        ) : decks && decks.data.decks.length ? (
          <ul className="products__list">
            {decks.data.decks.map((deck) => (
              <li key={deck._id}>
                <Link to={`/products/${deck._id}`}>
                  <div
                    className="img"
                    style={{
                      backgroundImage: `url('${
                        deck.image ? deck.image : noimg
                      }')`,
                    }}
                  ></div>
                  {deck.sale ? <p className="sale">SALE</p> : ""}
                  <p className="name">{deck.name}</p>
                  {deck.sale ? (
                    <p className="price">
                      <span className="price__before">
                        ${deck.defaultPrice}
                      </span>
                      <span className="price__after">${deck.oficialPrice}</span>
                    </p>
                  ) : (
                    <p className="price">
                      <span className="price__after">${deck.oficialPrice}</span>
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="products__no-item">
            Don't have any products.
            <button
              onClick={() => {
                dispatch(decksActions.cateDecks("All"));
                dispatch(decksActions.searchDecks(""));
              }}
            >
              Go back
            </button>
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
      </div>
    </div>
  );
};

export default withNamespaces()(ProductPage);
