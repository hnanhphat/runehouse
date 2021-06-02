import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cardActions } from "../redux/actions/card.actions";

import { Modal, Tabs, Tab } from "react-bootstrap";

// import i18n from "../i18n";
import { withNamespaces } from "react-i18next";

// IMAGES
import all from "../img/categoris/infinity.svg";
import major from "../img/categoris/major.svg";
import minor from "../img/categoris/minor.svg";
import fire from "../img/categoris/fire.svg";
import water from "../img/categoris/water.svg";
import air from "../img/categoris/air.svg";
import earth from "../img/categoris/earth.svg";

const AdminCardsPage = ({ t }) => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.card.cards.data);
  const singleCards = useSelector((state) => state.card.single.data);
  const [searchInput, setSearchInput] = useState("");
  const [filterStt, setFilterStt] = useState("All");

  const [showOriginal, setShowOriginal] = useState(false);
  const [showReverse, setShowReverse] = useState(false);

  console.log(singleCards);

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
              <div className="img">
                <img src={card.image} alt={card.title} />
                <div className="btns">
                  <button
                    onClick={() => {
                      dispatch(cardActions.getSingleCard(card._id));
                      setShowOriginal(true);
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="arrow-alt-circle-up"
                      className="svg-inline--fa fa-arrow-alt-circle-up fa-w-16"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm292 116V256h70.9c10.7 0 16.1-13 8.5-20.5L264.5 121.2c-4.7-4.7-12.2-4.7-16.9 0l-115 114.3c-7.6 7.6-2.2 20.5 8.5 20.5H212v116c0 6.6 5.4 12 12 12h64c6.6 0 12-5.4 12-12z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      dispatch(cardActions.getSingleCard(card._id));
                      setShowReverse(true);
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="arrow-alt-circle-down"
                      className="svg-inline--fa fa-arrow-alt-circle-down fa-w-16"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM212 140v116h-70.9c-10.7 0-16.1 13-8.5 20.5l114.9 114.3c4.7 4.7 12.2 4.7 16.9 0l114.9-114.3c7.6-7.6 2.2-20.5-8.5-20.5H300V140c0-6.6-5.4-12-12-12h-64c-6.6 0-12 5.4-12 12z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="admin__no-item">Don't have any Cards.</p>
      )}

      {/* ORIGINAL */}
      <Modal show={showOriginal} onHide={() => setShowOriginal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Original Meaning</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body--large">
          {singleCards ? (
            <div className="card">
              <div className="card__heading">
                <div className="img">
                  <img
                    src={singleCards.data.image}
                    alt={singleCards.data.title}
                  />
                </div>
                <div className="info">
                  <p>{singleCards.data.title}</p>
                  <span>
                    {
                      singleCards.data[
                        `element${localStorage
                          .getItem("language")
                          .toUpperCase()}`
                      ]
                    }
                  </span>
                </div>
              </div>
              <div className="card__info">
                <Tabs defaultActiveKey="introduce">
                  <Tab eventKey="introduce" title={t("Introduce")}>
                    {
                      singleCards.data[
                        `introduce${localStorage
                          .getItem("language")
                          .toUpperCase()}`
                      ]
                    }
                  </Tab>
                  <Tab eventKey="overview" title={t("Overview")}>
                    {
                      singleCards.data[
                        `overview${localStorage
                          .getItem("language")
                          .toUpperCase()}`
                      ]
                    }
                  </Tab>
                  <Tab eventKey="work" title={t("Work")}>
                    {
                      singleCards.data[
                        `work${localStorage.getItem("language").toUpperCase()}`
                      ]
                    }
                  </Tab>
                  <Tab eventKey="love" title={t("Love")}>
                    {
                      singleCards.data[
                        `love${localStorage.getItem("language").toUpperCase()}`
                      ]
                    }
                  </Tab>
                  <Tab eventKey="finance" title={t("Finance")}>
                    {
                      singleCards.data[
                        `finance${localStorage
                          .getItem("language")
                          .toUpperCase()}`
                      ]
                    }
                  </Tab>
                  <Tab eventKey="health" title={t("Health")}>
                    {
                      singleCards.data[
                        `health${localStorage
                          .getItem("language")
                          .toUpperCase()}`
                      ]
                    }
                  </Tab>
                  <Tab eventKey="mentality" title={t("Mentality")}>
                    {
                      singleCards.data[
                        `mentality${localStorage
                          .getItem("language")
                          .toUpperCase()}`
                      ]
                    }
                  </Tab>
                </Tabs>
              </div>
            </div>
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>

      {/* REVERSE */}
      <Modal show={showReverse} onHide={() => setShowReverse(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reverse Meaning</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body--large">
          {singleCards ? (
            <div className="card">
              <div className="card__heading card__heading--reversed">
                <div className="img">
                  <img
                    src={singleCards.data.image}
                    alt={singleCards.data.title}
                  />
                </div>
                <div className="info">
                  <p>{singleCards.data.title} Reversed</p>
                  <span>
                    {
                      singleCards.data[
                        `element${localStorage
                          .getItem("language")
                          .toUpperCase()}`
                      ]
                    }
                  </span>
                </div>
              </div>
              <div className="card__info">
                <Tabs defaultActiveKey="introduce">
                  <Tab eventKey="introduce" title={t("Introduce")}>
                    {
                      singleCards.data[
                        `introduceReversed${localStorage
                          .getItem("language")
                          .toUpperCase()}`
                      ]
                    }
                  </Tab>
                  <Tab eventKey="overview" title={t("Overview")}>
                    {
                      singleCards.data[
                        `overviewReversed${localStorage
                          .getItem("language")
                          .toUpperCase()}`
                      ]
                    }
                  </Tab>
                  <Tab eventKey="work" title={t("Work")}>
                    {
                      singleCards.data[
                        `workReversed${localStorage
                          .getItem("language")
                          .toUpperCase()}`
                      ]
                    }
                  </Tab>
                  <Tab eventKey="love" title={t("Love")}>
                    {
                      singleCards.data[
                        `loveReversed${localStorage
                          .getItem("language")
                          .toUpperCase()}`
                      ]
                    }
                  </Tab>
                  <Tab eventKey="finance" title={t("Finance")}>
                    {
                      singleCards.data[
                        `financeReversed${localStorage
                          .getItem("language")
                          .toUpperCase()}`
                      ]
                    }
                  </Tab>
                  <Tab eventKey="health" title={t("Health")}>
                    {
                      singleCards.data[
                        `healthReversed${localStorage
                          .getItem("language")
                          .toUpperCase()}`
                      ]
                    }
                  </Tab>
                  <Tab eventKey="mentality" title={t("Mentality")}>
                    {
                      singleCards.data[
                        `mentalityReversed${localStorage
                          .getItem("language")
                          .toUpperCase()}`
                      ]
                    }
                  </Tab>
                </Tabs>
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

export default withNamespaces()(AdminCardsPage);
