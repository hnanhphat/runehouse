import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/user.actions";
import Breadcrumb from "../components/Breadcrumb";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser.data);
  const loading = useSelector((state) => state.user.loading);

  const [someBoolean, setSomeBoolean] = useState(true);
  const [form, setForm] = useState({
    username: currentUser && currentUser.data.username,
    avatar: currentUser && currentUser.data.avatar,
  });

  const handleEditAvatar = (e) => {
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
            setForm({ ...form, avatar: result.info.url });
          }
        } else {
          console.log(error);
        }
      }
    );
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setSomeBoolean(false);
  };

  const handleCancle = (e) => {
    e.preventDefault();
    setSomeBoolean(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, avatar } = form;
    dispatch(userActions.updateCurrentUser({ username, avatar }));
    setSomeBoolean(true);
  };

  return (
    <div id="profile" className="profile">
      <Breadcrumb leaf="profile" />
      <div className="profile__area">
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="container">
            <h3 className="profile__title">Profile Page</h3>
            <form className="profile__form" onSubmit={handleSubmit}>
              <div className="group">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="user"
                  className="svg-inline--fa fa-user fa-w-14"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                  ></path>
                </svg>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  disabled={someBoolean ? true : false}
                  value={
                    someBoolean
                      ? (currentUser && currentUser.data.username) || ""
                      : null
                  }
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                className={`${form.avatar ? "active" : ""} ${
                  someBoolean ? "disabled" : ""
                }`}
                onClick={handleEditAvatar}
                disabled={someBoolean ? true : false}
              >
                {form.avatar ? (
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
              <div className="group group--textarea group--full">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="envelope"
                  className="svg-inline--fa fa-envelope fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                  ></path>
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  disabled
                  value={(currentUser && currentUser.data.email) || ""}
                />
              </div>
              {someBoolean ? (
                <div className="group group--full">
                  <button className="edit" onClick={handleEdit}>
                    Edit
                  </button>
                </div>
              ) : (
                <div className="group group--btn">
                  {loading ? (
                    <button type="submit">Pending...</button>
                  ) : (
                    <button type="submit">Update</button>
                  )}
                  <button
                    type="cancle"
                    onClick={handleCancle}
                    className="cancel"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
