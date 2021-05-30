import React from "react";
import { useHistory } from "react-router";
import MainVisual from "../components/MainVisual";
import Breadcrumb from "../components/Breadcrumb";

const CollectionPage = () => {
  const history = useHistory();

  const collections = [
    "All",
    "Tarot",
    "Oracle",
    "Lenormand",
    "I Ching",
    "Tea Leaf",
    "Blanket",
    "Book",
    "Rune",
    "Accessories",
  ];

  const handleClick = () => {
    history.push("/products");
  };

  return (
    <div id="collection" className="collection bg-grey">
      <MainVisual heading="Collection" />
      <Breadcrumb leaf="collection" />
      <div className="container">
        <ul className="collection__list">
          {collections.map((collection, i) => (
            <li>
              <button onClick={handleClick}>
                <div className={`img img--${i + 1}`}></div>
                <p className="txt">{collection}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CollectionPage;
