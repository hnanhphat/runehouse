import noimg from "../noimg.jpeg";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newsActions } from "../redux/actions/news.actions";

import { Modal } from "react-bootstrap";

import Moment from "react-moment";
import PaginationBar from "../components/PaginationBar";
import Loading from "../components/Loading";

// IMAGES
import all from "../img/categoris/infinity.svg";
import sharing from "../img/categoris/sharing.svg";
import researching from "../img/categoris/researching.svg";
import rating from "../img/categoris/rating.svg";
import review from "../img/categoris/review.svg";

import { withNamespaces } from "react-i18next";

const AdminNewsPage = ({ t }) => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news.data);
  const loadingList = useSelector((state) => state.news.loadingList);
  const loadingSingle = useSelector((state) => state.news.loadingSingle);
  const singleNews = useSelector((state) => state.news.singleNews.data);
  const totalPage = useSelector((state) => state.news.totalPages);
  const currentUser = useSelector((state) => state.user.currentUser.data);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const [searchInput, setSearchInput] = useState("");
  const [filterStt, setFilterStt] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [showCreate, setShowCreate] = useState(false);
  const [formCreate, setFormCreate] = useState({
    image: "",
    title: "",
    category: "Sharing",
    content: "",
  });

  const [showEdit, setShowEdit] = useState(false);
  const [editTarget, setEditTarget] = useState("");
  const [formEdit, setFormEdit] = useState({
    title: "",
    category: "Sharing",
    content: "",
  });

  const [showDelete, setShowDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState("");

  const filter = [
    { title: "All", image: all, search: "" },
    { title: "Sharing", image: sharing, search: "&category=Sharing" },
    {
      title: "Researching",
      image: researching,
      search: "&category=Researching",
    },
    { title: "Rating", image: rating, search: "&category=Rating" },
    { title: "Review", image: review, search: "&category=Review" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(`&title=${e.target.searchInput.value}`);
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
    setFormCreate({ ...formCreate, [e.target.name]: e.target.value });
  };

  const handleCreateNews = (pageNum, query) => {
    const { image, title, category, content } = formCreate;
    dispatch(
      newsActions.createNews(
        { image, title, category, content },
        pageNum,
        query
      )
    );
    setShowCreate(false);
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
    setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
  };

  const handleEditNews = (val, pageNum, query) => {
    const { image, title, category, content } = formEdit;
    dispatch(
      newsActions.editNews(
        { image, title, category, content },
        val,
        pageNum,
        query
      )
    );
    setShowEdit(false);
  };

  // DELETE
  const handleDeleteNews = (val, pageNum, query) => {
    dispatch(newsActions.deleteNews(val, pageNum, query));
  };

  useEffect(() => {
    if (isAdmin === "Admin") {
      dispatch(newsActions.getListOfNews(currentPage, searchInput, true));
    } else {
      if (currentUser) {
        dispatch(
          newsActions.getListOfNews(
            currentPage,
            `&author=${currentUser.data._id}${searchInput}`,
            true
          )
        );
      }
    }
  }, [dispatch, currentPage, searchInput, currentUser, isAdmin]);

  useEffect(() => {
    setFormEdit({
      image: singleNews && singleNews.data.image,
      title: singleNews && singleNews.data.title,
      category: singleNews && singleNews.data.category,
      content: singleNews && singleNews.data.content,
    });
  }, [singleNews]);

  return (
    <div id="admin-users" className="admin__content">
      <div className="admin__controller">
        <form onSubmit={handleSearch} className="search">
          <input type="text" name="searchInput" placeholder={t("an.Search")} />
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
                <span>{t(`an.${item.title}`)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {loadingList ? (
        <Loading />
      ) : news && news.data.news.length ? (
        <>
          <ul className="admin__news">
            {news.data.news.map((item) => (
              <li key={item._id}>
                {item.image ? (
                  <div
                    className="img"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  >
                    <div className="btns">
                      <button
                        onClick={() => {
                          dispatch(newsActions.getSingleNews(item._id, true));
                          setEditTarget(item._id);
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
                          setDeleteTarget(item._id);
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
                ) : (
                  <div
                    className="img img--noimg"
                    style={{ backgroundImage: `url('${noimg}')` }}
                  >
                    <div className="btns">
                      <button
                        onClick={() => {
                          dispatch(newsActions.getSingleNews(item._id));
                          setEditTarget(item._id);
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
                          setDeleteTarget(item._id);
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
                )}
                <p className="tit">{item.title}</p>
                <div className="group">
                  <span className="time">
                    <Moment format="MMM D, YYYY" withTitle={item.createdAt} />
                  </span>
                  <span className="comments">
                    {item.reviews.length ? item.reviews.length : 0}{" "}
                    {t("an.Comment(s)")}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          {totalPage > 1 ? (
            <PaginationBar
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={totalPage}
            />
          ) : (
            ""
          )}
        </>
      ) : (
        <p className="admin__no-item">{t("an.Do not have any News.")}</p>
      )}

      {/* CREATE */}
      <Modal show={showCreate} onHide={() => setShowCreate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("an.Create News")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="reader">
            <button
              className={`reader__avatar reader__avatar--rectangle ${
                formCreate.image ? "active" : ""
              }`}
              style={{
                backgroundImage: `url('${
                  formCreate.image ? formCreate.image : noimg
                }')`,
              }}
              onClick={handleCreateImages}
            >
              <span>{t("an.Edit")}</span>
            </button>
          </div>
          <form className="form">
            <div className="form__group">
              <div className="item">
                <input
                  type="text"
                  name="title"
                  placeholder={t("an.News Title")}
                  onChange={handleCreateChange}
                />
              </div>
              <div className="item">
                <select name="category" onChange={handleCreateChange}>
                  <option value="Sharing">{t("an.Sharing")}</option>
                  <option value="Researching">{t("an.Researching")}</option>
                  <option value="Rating">{t("an.Rating")}</option>
                  <option value="Review">{t("an.Review")}</option>
                </select>
              </div>
            </div>
            <div className="form__group">
              <div className="item item--full">
                <textarea
                  name="content"
                  placeholder={t("an.Description")}
                  onChange={handleCreateChange}
                ></textarea>
              </div>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          {isAdmin === "Admin" ? (
            <button
              className={formCreate.title && formCreate.content ? "active" : ""}
              onClick={() => handleCreateNews(currentPage, searchInput)}
            >
              {t("an.Create")}
            </button>
          ) : (
            <button
              className={formCreate.title && formCreate.content ? "active" : ""}
              onClick={() =>
                handleCreateNews(
                  currentPage,
                  `&author=${currentUser.data._id}${searchInput}`
                )
              }
            >
              {t("an.Create")}
            </button>
          )}
        </Modal.Footer>
      </Modal>

      {/* EDIT  */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("an.Edit News")}</Modal.Title>
        </Modal.Header>

        {loadingSingle ? (
          <Loading />
        ) : (
          <>
            <Modal.Body>
              <div className="reader">
                <button
                  className={`reader__avatar reader__avatar--rectangle ${
                    formEdit.image ? "active" : ""
                  }`}
                  style={{
                    backgroundImage: `url('${
                      formEdit.image ? formEdit.image : noimg
                    }')`,
                  }}
                  onClick={handleEditImages}
                >
                  <span>{t("an.Edit")}</span>
                </button>
              </div>
              <form className="form">
                <div className="form__group">
                  <div className="item">
                    <input
                      type="text"
                      name="title"
                      value={formEdit.title}
                      placeholder={t("an.News Title")}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="item">
                    <select
                      name="category"
                      value={formEdit.category}
                      onChange={handleEditChange}
                    >
                      <option value="Sharing">{t("an.Sharing")}</option>
                      <option value="Researching">{t("an.Researching")}</option>
                      <option value="Rating">{t("an.Rating")}</option>
                      <option value="Review">{t("an.Review")}</option>
                    </select>
                  </div>
                </div>
                <div className="form__group">
                  <div className="item item--full">
                    <textarea
                      name="content"
                      value={formEdit.content}
                      placeholder={t("an.Description")}
                      onChange={handleEditChange}
                    ></textarea>
                  </div>
                </div>
              </form>
            </Modal.Body>

            <Modal.Footer>
              {isAdmin === "Admin" ? (
                <button
                  className={formEdit.title && formEdit.content ? "active" : ""}
                  onClick={() =>
                    handleEditNews(editTarget, currentPage, searchInput)
                  }
                >
                  {t("an.Edit")}
                </button>
              ) : (
                <button
                  className={formEdit.title && formEdit.content ? "active" : ""}
                  onClick={() =>
                    handleEditNews(
                      editTarget,
                      currentPage,
                      `&author=${currentUser.data._id}${searchInput}`
                    )
                  }
                >
                  {t("an.Edit")}
                </button>
              )}
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* DELETE  */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("an.Delete News")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div class="group-btn">
            {isAdmin === "Admin" ? (
              <button
                onClick={() => {
                  handleDeleteNews(deleteTarget, currentPage, searchInput);
                  setShowDelete(false);
                }}
              >
                {t("an.Delete")}
              </button>
            ) : (
              <button
                onClick={() => {
                  handleDeleteNews(
                    deleteTarget,
                    currentPage,
                    `&author=${currentUser.data._id}${searchInput}`
                  );
                  setShowDelete(false);
                }}
              >
                {t("an.Delete")}
              </button>
            )}
            <button onClick={() => setShowDelete(false)}>
              {t("an.Cancel")}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default withNamespaces()(AdminNewsPage);
