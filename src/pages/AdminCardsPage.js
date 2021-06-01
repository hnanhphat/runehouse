import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cardActions } from "../redux/actions/card.actions";

// IMAGES
import all from "../img/categoris/infinity.svg";
import major from "../img/categoris/major.svg";
import minor from "../img/categoris/minor.svg";
import fire from "../img/categoris/fire.svg";
import water from "../img/categoris/water.svg";
import air from "../img/categoris/air.svg";
import earth from "../img/categoris/earth.svg";

const AdminCardsPage = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.card.cards.data);
  const [searchInput, setSearchInput] = useState("");
  const [filterStt, setFilterStt] = useState("All");

  const filter = [
    { title: "All", image: all, search: "" },
    { title: "Major Arcana", image: major, search: "?category=Major%20Arcana" },
    { title: "Minor Arcana", image: minor, search: "?category=Minor%20Arcana" },
    { title: "Fire", image: fire, search: "?genre=Wands" },
    { title: "Water", image: water, search: "?genre=Cups" },
    { title: "Air", image: air, search: "?genre=Swords" },
    { title: "Earth", image: earth, search: "?genre=Pentacles" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(`?title=${e.target.searchInput.value}`);
    if (e.target.searchInput.value) {
      setFilterStt("");
    } else {
      setFilterStt("All");
    }
    e.target.reset();
  };

  useEffect(() => {
    dispatch(cardActions.getListOfCards(searchInput));
  }, [dispatch, searchInput]);

  return (
    <div id="admin-cards" className="admin__content">
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
        <ul className="filter filter--seven">
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
      {cards && cards.data.cards.length ? (
        <ul className="admin__cards">
          {cards.data.cards.map((card) => (
            <li key={card._id}>
              <Link to="/">
                <img src={card.image} alt={card.title} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="admin__no-item">Don't have any Cards.</p>
      )}
    </div>
  );
};

export default AdminCardsPage;
