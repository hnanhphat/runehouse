import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { decksActions } from "../redux/actions/decks.actions";
import { routeActions } from "../redux/actions/route.actions";
import Breadcrumb from "../components/Breadcrumb";

const ProductEditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const singleDecks = useSelector((state) => state.decks.singleDecks.data);
  const redirectTo = useSelector((state) => state.route.redirectTo);

  const [someBoolean, setSomeBoolean] = useState(true);
  const [formInput, setFormInput] = useState({
    name: singleDecks && singleDecks.data.name,
    defaultPrice: singleDecks && singleDecks.data.defaultPrice,
    oficialPrice: singleDecks && singleDecks.data.oficialPrice,
    images: singleDecks && singleDecks.data.images,
    genres: singleDecks && singleDecks.data.genres,
    size: singleDecks && singleDecks.data.size,
    color: singleDecks && singleDecks.data.color,
    description: singleDecks && singleDecks.data.description,
    sale: singleDecks && singleDecks.data.sale,
  });

  const handleEdit = (e) => {
    e.preventDefault();
    setSomeBoolean(false);
  };

  const handleCancle = (e) => {
    e.preventDefault();
    setSomeBoolean(true);
  };

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSale = (e) => {
    if (e.target.value !== "") {
      setFormInput({ ...formInput, defaultPrice: e.target.value, sale: true });
    } else {
      setFormInput({ ...formInput, defaultPrice: e.target.value, sale: false });
    }
  };

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
            setFormInput({ ...formInput, images: result.info.url });
          }
        } else {
          console.log(error);
        }
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      defaultPrice,
      oficialPrice,
      images,
      genres,
      size,
      color,
      description,
      sale,
    } = formInput;
    dispatch(
      decksActions.editDecks(
        {
          name,
          defaultPrice,
          oficialPrice,
          images,
          genres,
          size,
          color,
          description,
          sale,
        },
        id
      )
    );
    // e.target.reset();
  };

  useEffect(() => {
    dispatch(decksActions.getSingleDecks(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo]);

  return (
    <div id="product-edit" className="product-edit">
      <Breadcrumb
        trunk="products"
        branch={`products/${id}`}
        branchTxt={singleDecks && singleDecks.data.name}
        leaf="Edit Product"
      />
      <div className="product-edit__area">
        <div className="product-edit__container">
          <h3 className="tit">Create New Product</h3>
          <form onSubmit={handleSubmit}>
            <div className="group">
              <div className="item item--input">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="heading"
                  className="svg-inline--fa fa-heading fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M448 96v320h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H320a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V288H160v128h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V96H32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-32v128h192V96h-32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16z"
                  ></path>
                </svg>
                <input
                  type="text"
                  name="name"
                  placeholder="Title"
                  value={
                    someBoolean ? singleDecks && singleDecks.data.name : null
                  }
                  onChange={handleChange}
                />
              </div>
              <div className="item item--input">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="dollar-sign"
                  className="svg-inline--fa fa-dollar-sign fa-w-9"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 288 512"
                >
                  <path
                    fill="currentColor"
                    d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z"
                  ></path>
                </svg>
                <input
                  type="number"
                  name="defaultPrice"
                  placeholder="Default Price"
                  value={
                    someBoolean
                      ? singleDecks && singleDecks.data.defaultPrice
                      : null
                  }
                  onChange={(e) => {
                    handleChange(e);
                    handleSale(e);
                  }}
                />
              </div>
              <div className="item item--input">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="dollar-sign"
                  className="svg-inline--fa fa-dollar-sign fa-w-9"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 288 512"
                >
                  <path
                    fill="currentColor"
                    d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z"
                  ></path>
                </svg>
                <input
                  type="number"
                  name="oficialPrice"
                  placeholder="Official Price"
                  value={
                    someBoolean
                      ? singleDecks && singleDecks.data.oficialPrice
                      : null
                  }
                  onChange={handleChange}
                />
              </div>
              <button
                className={`${formInput.images ? "active" : ""}`}
                onClick={handleEditImages}
              >
                {formInput.images ? (
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="smile"
                    className="svg-inline--fa fa-smile fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                  >
                    <path
                      fill="currentColor"
                      d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="frown"
                    className="svg-inline--fa fa-frown fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                  >
                    <path
                      fill="currentColor"
                      d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 128c-40.2 0-78 17.7-103.8 48.6-8.5 10.2-7.1 25.3 3.1 33.8 10.2 8.4 25.3 7.1 33.8-3.1 16.6-19.9 41-31.4 66.9-31.4s50.3 11.4 66.9 31.4c8.1 9.7 23.1 11.9 33.8 3.1 10.2-8.5 11.5-23.6 3.1-33.8C326 321.7 288.2 304 248 304z"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
            <div className="group">
              <div className="item item--select">
                <span>Genre</span>
                <select
                  name="genres"
                  defaultValue={singleDecks && singleDecks.data.genres}
                  onChange={handleChange}
                >
                  <option value="Tarot">Tarot</option>
                  <option value="Oracle">Oracle</option>
                  <option value="Lenormand">Lenormand</option>
                  <option value="I Ching">I Ching</option>
                  <option value="Tea Leaf">Tea Leaf</option>
                </select>
              </div>
              <div className="item item--select">
                <span>Size</span>
                <select
                  name="size"
                  defaultValue={singleDecks && singleDecks.data.size}
                  onChange={handleChange}
                >
                  <option value="Large">Large</option>
                  <option value="Small">Small</option>
                  <option value="Normal">Normal</option>
                </select>
              </div>
              <div className="item item--select">
                <span>Color</span>
                <select
                  name="color"
                  defaultValue={singleDecks && singleDecks.data.color}
                  onChange={handleChange}
                >
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Gold">Gold</option>
                </select>
              </div>
            </div>
            <div className="group">
              <div className="item">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="font"
                  className="svg-inline--fa fa-font fa-w-14"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M432 416h-23.41L277.88 53.69A32 32 0 0 0 247.58 32h-47.16a32 32 0 0 0-30.3 21.69L39.41 416H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-19.58l23.3-64h152.56l23.3 64H304a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM176.85 272L224 142.51 271.15 272z"
                  ></path>
                </svg>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={
                    someBoolean
                      ? singleDecks && singleDecks.data.description
                      : null
                  }
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            {someBoolean ? (
              <button onClick={handleEdit} className="submit">
                Edit
              </button>
            ) : (
              <div className="group-btns">
                <button onClick={handleSubmit} className="edit">
                  Update
                </button>
                <button onClick={handleCancle} className="delete">
                  Cancle
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEditPage;
