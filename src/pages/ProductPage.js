import noimg from "../noimg.jpeg";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decksActions } from "../redux/actions/decks.actions";
import Breadcrumb from "../components/Breadcrumb";
import PaginationBar from "../components/PaginationBar";

const ProductPage = () => {
  const dispatch = useDispatch();
  const decks = useSelector((state) => state.decks.decks.data);
  const totalPage = useSelector((state) => state.decks.totalPages);
  console.log(totalPage);
  const [genres, setGenres] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleGenres = (val) => {
    setGenres(val);
  };

  const handleSize = (val) => {
    setSize(val);
  };

  const handleColor = (val) => {
    setColor(val);
  };

  useEffect(() => {
    dispatch(
      decksActions.getListOfDecks(
        currentPage,
        `&limit=20${genres ? `&genres=${genres}` : ""}${
          size ? `&size=${size}` : ""
        }${color ? `&color=${color}` : ""}`,
        "decks"
      )
    );
  }, [dispatch, genres, size, color, currentPage]);

  return (
    <div id="products" className="products">
      <Breadcrumb leaf="products" />
      <div className="container">
        <ul className="products__sidebar">
          <li>
            <h3 className="tit">Product Categories</h3>
            <button
              onClick={() => {
                handleGenres("");
                handleSize("");
                handleColor("");
              }}
            >
              All
            </button>
            <button onClick={() => handleGenres("Tarot")}>Tarot</button>
            <button onClick={() => handleGenres("Oracle")}>Oracle</button>
            <button onClick={() => handleGenres("Lenormand")}>Lenormand</button>
            <button onClick={() => handleGenres("I Ching")}>I Ching</button>
            <button onClick={() => handleGenres("Tea Leaf")}>Tea Leaf</button>
          </li>
          <li>
            <h3 className="tit">Filter by size</h3>
            <button onClick={() => handleSize("Large")}>Large</button>
            <button onClick={() => handleSize("Small")}>Small</button>
            <button onClick={() => handleSize("Normal")}>Normal</button>
          </li>
          <li>
            <h3 className="tit">Color</h3>
            <button onClick={() => handleColor("Black")}>Black</button>
            <button onClick={() => handleColor("White")}>White</button>
            <button onClick={() => handleColor("Gold")}>Gold</button>
          </li>
        </ul>
        {decks && decks.data.decks.length ? (
          <ul className="products__list">
            {decks.data.decks.map((deck) => (
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
                    <span className="price__after">${deck.oficialPrice}</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="products__not-found">No products were found</p>
        )}
        <PaginationBar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
};

export default ProductPage;
