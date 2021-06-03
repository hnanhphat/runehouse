import noimg from "../noimg.jpeg";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { decksActions } from "../redux/actions/decks.actions";
import { newsActions } from "../redux/actions/news.actions";
import Moment from "react-moment";
import Breadcrumb from "../components/Breadcrumb";

// Image
import tarot from "../img/collections/tarot.jpeg";
import oracle from "../img/collections/oracle.jpeg";

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sale = useSelector((state) => state.decks.sale.data);
  const decks = useSelector((state) => state.decks.decks.data);
  const search = useSelector((state) => state.decks.search.data);
  const news = useSelector((state) => state.news.news.data);

  useEffect(() => {
    dispatch(decksActions.getListOfDecks(1, "&limit=2&sale=true", "sale"));
    dispatch(decksActions.getListOfDecks(1, "&limit=4", "decks"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(newsActions.getListOfNews(1, "&limit=4"));
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
                            deck.image ? deck.image : noimg
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
          <div id="collection" className="collections">
            <div className="container">
              <div className="collections__item">
                <h3 className="tit">
                  Rune House
                  <br />
                  Collection
                </h3>
                <p className="txt">
                  "Simplicity, patience, compassion. these three are your
                  greatest treasures." - <em>Lao Tzu</em>
                </p>
                <Link to="/collection" className="btn-view">
                  <span>View All</span>
                </Link>
              </div>
              <div className="collections__item">
                <button
                  className="item item--01"
                  onClick={() => {
                    history.push("/products");
                    dispatch(decksActions.searchDecks(`&category=Tarot`));
                    dispatch(decksActions.cateDecks("Tarot"));
                  }}
                >
                  <img src={tarot} alt="Tarot" />
                  <span>Tarot</span>
                </button>
              </div>
              <div className="collections__item">
                <button
                  className="item item--02"
                  onClick={() => {
                    history.push("/products");
                    dispatch(decksActions.searchDecks(`&category=Oracle`));
                    dispatch(decksActions.cateDecks("Oracle"));
                  }}
                >
                  <img src={oracle} alt="Oracle" />
                  <span>Oracle</span>
                </button>
              </div>
            </div>
          </div>
          {sale && sale.data.decks.length ? (
            <div id="deal" className="deal">
              <div className="deal__container">
                <h3 className="tit">Flash Deal</h3>
                <p className="txt">
                  Sale up to <strong>50%</strong> for several items.
                </p>
                <button
                  className="btn-view btn-view--white"
                  onClick={() => {
                    history.push("/products");
                    dispatch(decksActions.searchDecks(`&sale=true`));
                    dispatch(decksActions.cateDecks("Sale"));
                  }}
                >
                  <span>View All</span>
                </button>
                <ul className="list">
                  {sale &&
                    sale.data.decks.map((deck) => (
                      <li key={deck._id}>
                        <Link to={`products/${deck._id}`}>
                          <div
                            className="img"
                            style={{
                              backgroundImage: `url('${
                                deck.image ? deck.image : noimg
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
          ) : (
            ""
          )}
          <div id="product" className="product">
            <div className="container">
              <div className="primary-heading">
                <h2>Our Products</h2>
                <p>
                  Every deck has its own beauty and value. Let choose the right
                  deck for you
                </p>
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
                              deck.image ? deck.image : noimg
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
                <h2>News</h2>
                <p>
                  Providing knowledge, tip and tricks for becoming a better
                  reader.
                </p>
              </div>
              <ul className="news__list">
                {news &&
                  news.data.news.map((item) => (
                    <li key={item._id}>
                      <Link to={`/news/${item._id}`}>
                        <div
                          className="img"
                          style={{ backgroundImage: `url('${item.image}')` }}
                        ></div>
                        <p className="tit">{item.title}</p>
                        <p className="group">
                          <span className="time">
                            <Moment
                              format="MMM D, YYYY"
                              withTitle={item.createdAt}
                            />
                          </span>
                          <span className="comments">
                            {item.reviews.length ? item.reviews.length : 0}{" "}
                            Comment(s)
                          </span>
                        </p>
                      </Link>
                    </li>
                  ))}
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
