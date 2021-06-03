import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { decksActions } from "../redux/actions/decks.actions";
import MainVisual from "../components/MainVisual";
import Breadcrumb from "../components/Breadcrumb";
import { withNamespaces } from "react-i18next";

const CollectionPage = ({ t }) => {
  const history = useHistory();
  const dispatch = useDispatch();

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

  const handleClick = (cate) => {
    history.push("/products");
    dispatch(
      decksActions.searchDecks(cate === "All" ? "" : `&category=${cate}`)
    );
    dispatch(decksActions.cateDecks(cate));
  };

  return (
    <div id="collection" className="collection bg-grey">
      <MainVisual heading={t("clt.Collection")} />
      <Breadcrumb leaf={t("clt.Collection")} />
      <div className="container">
        <ul className="collection__list">
          {collections.map((collection, i) => (
            <li key={collection}>
              <button onClick={() => handleClick(collection)}>
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

export default withNamespaces()(CollectionPage);
