import noimg from "../noimg.jpeg";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decksActions } from "../redux/actions/decks.actions";

import { Modal } from "react-bootstrap";

import PaginationBar from "../components/PaginationBar";

// IMAGES
import all from "../img/categoris/infinity.svg";
import tarot from "../img/categoris/tarot.svg";
import oracle from "../img/categoris/crystal-ball.svg";
import lenormand from "../img/categoris/hour-glass.svg";
import iching from "../img/categoris/ouroboros.svg";
import tealeaf from "../img/categoris/wall-clock.svg";
import other from "../img/categoris/other.svg";

const AdminProductsPage = () => {
  const dispatch = useDispatch();
  const decks = useSelector((state) => state.decks.decks.data);
  const singleDecks = useSelector((state) => state.decks.singleDecks.data);
  const totalPage = useSelector((state) => state.decks.totalPages);
  const [searchInput, setSearchInput] = useState("");
  const [filterStt, setFilterStt] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [showCreate, setShowCreate] = useState(false);
  const [formCreate, setFormCreate] = useState({
    image: "",
    name: "",
    saleChecked: "Not Sale",
    salePrice: "",
    defaultPrice: "",
    category: "Tarot",
    genres: "Edge Plating",
    description: "",
  });

  const [showEdit, setShowEdit] = useState(false);
  const [editTarget, setEditTarget] = useState("");
  const [formEdit, setFormEdit] = useState({
    image: "",
    name: "",
    saleChecked: "Not Sale",
    salePrice: "",
    defaultPrice: "",
    category: "Tarot",
    genres: "Edge Plating",
    description: "",
  });

  const [showDelete, setShowDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState("");

  // console.log(decks);
  console.log(singleDecks);

  const filter = [
    { title: "All", image: all, search: "" },
    { title: "Tarot", image: tarot, search: "&category=Tarot" },
    { title: "Oracle", image: oracle, search: "&category=Oracle" },
    { title: "Lenormand", image: lenormand, search: "&category=Lenormand" },
    { title: "I Ching", image: iching, search: "&category=I%20Ching" },
    { title: "Tea Leaf", image: tealeaf, search: "&category=Tea%20Leaf" },
    { title: "Other", image: other, search: "&genres=Other" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(`&name=${e.target.searchInput.value}`);
    if (e.target.searchInput.value) {
      setFilterStt("");
    } else {
      setFilterStt("All");
    }
    e.target.reset();
  };

  // CREATE
  const handleCreateImages = (e) => {
    e.preventDefault();
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        multiple: false,
      },
      function (error, result) {
        if (!error) {
          if (result.event === "success") {
            setFormCreate({ ...formCreate, image: result.info.url });
          }
        } else {
          console.log(error);
        }
      }
    );
  };

  const handleCreateChange = (e) => {
    console.log({ ...formCreate, [e.target.name]: e.target.value });
    setFormCreate({ ...formCreate, [e.target.name]: e.target.value });
  };

  const handleCreateProduct = () => {
    const { image, name, defaultPrice, category, genres, description } =
      formCreate;
    if (formCreate.saleChecked === "Sale") {
      const oficialPrice = formCreate.defaultPrice - formCreate.salePrice;
      dispatch(
        decksActions.createDecks(
          {
            image,
            name,
            sale: true,
            defaultPrice,
            oficialPrice: oficialPrice,
            category,
            genres,
            description,
          },
          currentPage,
          searchInput,
          "decks"
        )
      );
    } else {
      const oficialPrice = formCreate.defaultPrice;
      dispatch(
        decksActions.createDecks(
          {
            image,
            name,
            sale: false,
            oficialPrice: oficialPrice,
            category,
            genres,
            description,
          },
          currentPage,
          searchInput,
          "decks"
        )
      );
    }
    setShowCreate(false);
    setFormCreate({
      image: "",
      name: "",
      saleChecked: "Not Sale",
      salePrice: "",
      defaultPrice: "",
      category: "Tarot",
      genres: "Edge Plating",
      description: "",
    });
  };

  // EDIT
  const handleEditImages = (e) => {
    e.preventDefault();
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        multiple: false,
      },
      function (error, result) {
        if (!error) {
          if (result.event === "success") {
            setFormEdit({ ...formEdit, image: result.info.url });
          }
        } else {
          console.log(error);
        }
      }
    );
  };

  const handleEditChange = (e) => {
    console.log({ ...formEdit, [e.target.name]: e.target.value });
    setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
  };

  const handleEditProduct = (val) => {
    const { image, name, defaultPrice, category, genres, description } =
      formEdit;
    if (formEdit.saleChecked === "Sale") {
      const oficialPrice = formEdit.defaultPrice - formEdit.salePrice;
      dispatch(
        decksActions.editDecks(
          {
            image,
            name,
            sale: true,
            defaultPrice,
            oficialPrice: oficialPrice,
            category,
            genres,
            description,
          },
          val,
          currentPage,
          searchInput,
          "decks"
        )
      );
    } else {
      const oficialPrice = formEdit.defaultPrice;
      dispatch(
        decksActions.editDecks(
          {
            image,
            name,
            sale: false,
            oficialPrice: oficialPrice,
            category,
            genres,
            description,
          },
          val,
          currentPage,
          searchInput,
          "decks"
        )
      );
    }
    setShowEdit(false);
  };

  // DELETE
  const handleDeleteProduct = (val) => {
    dispatch(decksActions.deleteDecks(val, currentPage, searchInput, "decks"));
  };

  useEffect(() => {
    dispatch(decksActions.getListOfDecks(currentPage, searchInput, "decks"));
  }, [dispatch, currentPage, searchInput]);

  useEffect(() => {
    setFormEdit({
      image: singleDecks && singleDecks.data.image,
      name: singleDecks && singleDecks.data.name,
      saleChecked: singleDecks && singleDecks.data.sale ? "Sale" : "Not Sale",
      salePrice:
        singleDecks &&
        singleDecks.data.defaultPrice - singleDecks.data.oficialPrice,
      defaultPrice: singleDecks && singleDecks.data.defaultPrice,
      oficialPrice: singleDecks && singleDecks.data.oficialPrice,
      category: singleDecks && singleDecks.data.category,
      genres: singleDecks && singleDecks.data.genres,
      description: singleDecks && singleDecks.data.description,
    });
  }, [singleDecks]);

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
        <button className="create" onClick={() => setShowCreate(true)}>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="plus"
            className="svg-inline--fa fa-plus fa-w-14"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
            ></path>
          </svg>
        </button>
        <ul className="filter filter--four">
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
      {decks && decks.data.decks.length ? (
        <ul className="admin__products">
          {decks.data.decks.map((deck) => (
            <li key={deck._id}>
              <div className="img">
                <img src={deck.image ? deck.image : noimg} alt={deck.name} />
                <div className="btns">
                  <button
                    onClick={() => {
                      dispatch(decksActions.getSingleDecks(deck._id));
                      setEditTarget(deck._id);
                      setShowEdit(true);
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="pencil-alt"
                      className="svg-inline--fa fa-pencil-alt fa-w-16"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      setDeleteTarget(deck._id);
                      setShowDelete(true);
                    }}
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
              </div>
              <div className="name">{deck.name}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="admin__no-item">Don't have any Products.</p>
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

      {/* CREATE  */}
      <Modal show={showCreate} onHide={() => setShowCreate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="reader">
            <button
              className="reader__avatar"
              style={{
                backgroundImage: `url('${
                  formCreate.image ? formCreate.image : noimg
                }')`,
              }}
              onClick={handleCreateImages}
            >
              <span>Edit</span>
            </button>
          </div>
          <form className="form">
            <div className="form__group">
              <div className="item">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  onChange={handleCreateChange}
                />
              </div>
              <div className="item">
                <select
                  name="saleChecked"
                  value={formCreate.saleChecked}
                  onChange={handleCreateChange}
                >
                  <option value="Not Sale">Not Sale</option>
                  <option value="Sale">Sale</option>
                </select>
              </div>
            </div>
            <div className="form__group">
              <div className="item">
                <input
                  type="number"
                  name="defaultPrice"
                  placeholder="Price"
                  onChange={handleCreateChange}
                />
              </div>
              <div className="item">
                <input
                  type="number"
                  name="salePrice"
                  placeholder="Discount"
                  value={
                    formCreate.saleChecked === "Not Sale"
                      ? ""
                      : formCreate.salePrice
                  }
                  disabled={
                    formCreate.saleChecked === "Not Sale" ? "disabled" : ""
                  }
                  onChange={handleCreateChange}
                />
              </div>
            </div>
            <div className="form__group">
              <div className="item">
                <select
                  name="category"
                  value={formCreate.category}
                  onChange={handleCreateChange}
                >
                  <option value="Tarot">Tarot</option>
                  <option value="Oracle">Oracle</option>
                  <option value="Lenormand">Lenormand</option>
                  <option value="I Ching">I Ching</option>
                  <option value="Tea Leaf">Tea Leaf</option>
                  <option value="Blanket">Blanket</option>
                  <option value="Book">Book</option>
                  <option value="Rune">Rune</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div className="item">
                <select
                  name="genres"
                  value={formCreate.genres}
                  onChange={handleCreateChange}
                >
                  <option value="Edge Plating">Edge Plating</option>
                  <option value="God">God</option>
                  <option value="Devil">Devil</option>
                  <option value="Home Tools">Home Tools</option>
                  <option value="Life Journey">Life Journey</option>
                  <option value="Magic">Magic</option>
                  <option value="Nature">Nature</option>
                  <option value="Fairy Tale">Fairy Tale</option>
                  <option value="18+">18+</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="form__group">
              <div className="item item--full">
                <textarea
                  name="description"
                  placeholder="Description"
                  onChange={handleCreateChange}
                ></textarea>
              </div>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button
            className={
              formCreate.name && formCreate.defaultPrice
                ? formCreate.saleChecked === "Sale"
                  ? formCreate.salePrice
                    ? "active"
                    : ""
                  : "active"
                : ""
            }
            onClick={handleCreateProduct}
          >
            Create
          </button>
        </Modal.Footer>
      </Modal>

      {/* EDIT  */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="reader">
            <button
              className="reader__avatar"
              style={{
                backgroundImage: `url('${
                  formEdit.image ? formEdit.image : noimg
                }')`,
              }}
              onClick={handleEditImages}
            >
              <span>Edit</span>
            </button>
          </div>
          <form className="form">
            <div className="form__group">
              <div className="item">
                <input
                  type="text"
                  name="name"
                  value={formEdit.name}
                  placeholder="Product Name"
                  onChange={handleEditChange}
                />
              </div>
              <div className="item">
                <select
                  name="saleChecked"
                  value={formEdit.saleChecked}
                  onChange={handleEditChange}
                >
                  <option value="Not Sale">Not Sale</option>
                  <option value="Sale">Sale</option>
                </select>
              </div>
            </div>
            <div className="form__group">
              <div className="item">
                <input
                  type="number"
                  name="defaultPrice"
                  value={
                    formEdit.defaultPrice
                      ? formEdit.defaultPrice
                      : formEdit.oficialPrice
                  }
                  placeholder="Price"
                  onChange={handleEditChange}
                />
              </div>
              <div className="item">
                <input
                  type="number"
                  name="salePrice"
                  placeholder="Discount"
                  value={
                    formEdit.saleChecked === "Not Sale"
                      ? ""
                      : formEdit.salePrice
                  }
                  disabled={
                    formEdit.saleChecked === "Not Sale" ? "disabled" : ""
                  }
                  onChange={handleEditChange}
                />
              </div>
            </div>
            <div className="form__group">
              <div className="item">
                <select
                  name="category"
                  value={formEdit.category}
                  onChange={handleEditChange}
                >
                  <option value="Tarot">Tarot</option>
                  <option value="Oracle">Oracle</option>
                  <option value="Lenormand">Lenormand</option>
                  <option value="I Ching">I Ching</option>
                  <option value="Tea Leaf">Tea Leaf</option>
                  <option value="Blanket">Blanket</option>
                  <option value="Book">Book</option>
                  <option value="Rune">Rune</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div className="item">
                <select
                  name="genres"
                  value={formEdit.genres}
                  onChange={handleEditChange}
                >
                  <option value="Edge Plating">Edge Plating</option>
                  <option value="God">God</option>
                  <option value="Devil">Devil</option>
                  <option value="Home Tools">Home Tools</option>
                  <option value="Life Journey">Life Journey</option>
                  <option value="Magic">Magic</option>
                  <option value="Nature">Nature</option>
                  <option value="Fairy Tale">Fairy Tale</option>
                  <option value="18+">18+</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="form__group">
              <div className="item item--full">
                <textarea
                  name="description"
                  value={formEdit.description}
                  placeholder="Description"
                  onChange={handleEditChange}
                ></textarea>
              </div>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button
            className={
              formEdit.name && formEdit.defaultPrice
                ? formEdit.saleChecked === "Sale"
                  ? formEdit.salePrice
                    ? "active"
                    : ""
                  : "active"
                : ""
            }
            onClick={() => handleEditProduct(editTarget)}
          >
            Edit
          </button>
        </Modal.Footer>
      </Modal>

      {/* DELETE  */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div class="group-btn">
            <button
              onClick={() => {
                handleDeleteProduct(deleteTarget);
                setShowDelete(false);
              }}
            >
              Delete
            </button>
            <button onClick={() => setShowDelete(false)}>Cancel</button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminProductsPage;