import noimg from "../noimg.jpeg";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decksActions } from "../redux/actions/decks.actions";
import Breadcrumb from "../components/Breadcrumb";

// Image
import tarot from "../img/tarot.jpeg";
import oracle from "../img/oracle.jpeg";

const HomePage = () => {
  const dispatch = useDispatch();
  const sale = useSelector((state) => state.decks.sale.data);
  const decks = useSelector((state) => state.decks.decks.data);
  const search = useSelector((state) => state.decks.search.data);

  useEffect(() => {
    dispatch(decksActions.getListOfDecks(1, "&limit=2&sale=true", "sale"));
    dispatch(decksActions.getListOfDecks(1, "&limit=4", "decks"));
  }, [dispatch]);

  return (
    <div id="home" className="home">
      {search ? (
        <div id="search" className="search">
          <Breadcrumb leaf="search" />
          <div className="container">
            <ul className="search__list">
              {search &&
                search.data.decks.map((deck) => (
                  <li key={deck._id}>
                    <Link to={`/products/${deck._id}`}>
                      <div
                        className="img"
                        style={{
                          backgroundImage: `url('${
                            deck.images ? deck.images : noimg
                          }')`,
                        }}
                      ></div>
                      {deck.sale ? <p className="sale">SALE</p> : ""}
                      <p className="name">{deck.name}</p>
                      <p className="price">
                        {deck.defaultPrice ? (
                          <span className="price__before">
                            ${deck.defaultPrice}
                          </span>
                        ) : (
                          ""
                        )}
                        <span className="price__after">
                          ${deck.oficialPrice}
                        </span>
                      </p>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <>
          <div id="bannner" className="banner">
            <div className="banner__left">
              <div className="banner__item banner__item--01"></div>
            </div>
            <div className="banner__right">
              <div className="banner__item banner__item--02"></div>
              <div className="banner__item banner__item--03"></div>
            </div>
          </div>
          <div id="collection" className="collection">
            <div className="container">
              <div className="collection__item">
                <h3 className="tit">
                  Rune House
                  <br />
                  Collection
                </h3>
                <p className="txt">
                  It is a long established fact that a reader will bedistracted
                </p>
                <Link to="/collections" className="btn-view">
                  <span>View All</span>
                </Link>
              </div>
              <div className="collection__item">
                <Link to="/collection/tarot" className="item item--01">
                  <img src={tarot} alt="Tarot" />
                  <span>Tarot</span>
                </Link>
              </div>
              <div className="collection__item">
                <Link to="/collection/oracle" className="item item--02">
                  <img src={oracle} alt="Oracle" />
                  <span>Oracle</span>
                </Link>
              </div>
            </div>
          </div>
          <div id="deal" className="deal">
            <div className="deal__container">
              <h3 className="tit">Flash Deal</h3>
              <p className="txt">
                Sale up to <strong>50%</strong> for several items.
              </p>
              <Link to="/sale" className="btn-view btn-view--white">
                <span>View All</span>
              </Link>
              <ul className="list">
                {sale &&
                  sale.data.decks.map((deck) => (
                    <li key={deck._id}>
                      <Link to={`products/${deck._id}`}>
                        <div
                          className="img"
                          style={{
                            backgroundImage: `url('${
                              deck.images ? deck.images : noimg
                            }')`,
                          }}
                        ></div>
                        <p className="sale">SALE</p>
                        <p className="name">{deck.name}</p>
                        <p className="price">
                          <span className="price__before">
                            ${deck.defaultPrice}
                          </span>
                          <span className="price__after">
                            ${deck.oficialPrice}
                          </span>
                        </p>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div id="product" className="product">
            <div className="container">
              <div className="primary-heading">
                <h2>Our Products</h2>
                <p>Text of the printing and typesetting industry.</p>
              </div>
              <ul className="product__list">
                {decks &&
                  decks.data.decks.map((deck) => (
                    <li key={deck._id}>
                      <Link to={`/products/${deck._id}`}>
                        <div
                          className="img"
                          style={{
                            backgroundImage: `url('${
                              deck.images ? deck.images : noimg
                            }')`,
                          }}
                        ></div>
                        {deck.sale ? <p className="sale">SALE</p> : ""}
                        <p className="name">{deck.name}</p>
                        <p className="price">
                          {deck.defaultPrice ? (
                            <span className="price__before">
                              ${deck.defaultPrice}
                            </span>
                          ) : (
                            ""
                          )}
                          <span className="price__after">
                            ${deck.oficialPrice}
                          </span>
                        </p>
                      </Link>
                    </li>
                  ))}
              </ul>
              <Link to="/products" className="btn-view btn-view--center">
                <span>View All</span>
              </Link>
            </div>
          </div>
          <div id="news" className="news">
            <div className="container">
              <div className="primary-heading">
                <h2>News & Blog</h2>
                <p>Text of the printing and typesetting industry.</p>
              </div>
              <ul className="news__list">
                <li>
                  <Link to="/">
                    <div className="img"></div>
                    <p className="tit">Tarot for newbie</p>
                    <p className="group">
                      <span className="time">January 29, 2016</span>
                      <span className="comments">0 Comment(s)</span>
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <div className="img"></div>
                    <p className="tit">Tarot for newbie</p>
                    <p className="group">
                      <span className="time">January 29, 2016</span>
                      <span className="comments">0 Comment(s)</span>
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <div className="img"></div>
                    <p className="tit">Tarot for newbie</p>
                    <p className="group">
                      <span className="time">January 29, 2016</span>
                      <span className="comments">0 Comment(s)</span>
                    </p>
                  </Link>
                </li>
              </ul>
              <Link to="/news" className="btn-view btn-view--center">
                <span>View All</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
