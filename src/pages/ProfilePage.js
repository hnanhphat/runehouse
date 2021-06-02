import noimg from "../noimg.jpeg";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/user.actions";

import { Modal } from "react-bootstrap";

import MainVisual from "../components/MainVisual";
import Breadcrumb from "../components/Breadcrumb";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser.data);
  const [showModal, setShowModal] = useState(false);
  const [formInput, setFormInput] = useState({
    avatar: currentUser && currentUser.data.avatar,
    fullname: currentUser && currentUser.data.fullname,
    username: currentUser && currentUser.data.username,
    position: currentUser && currentUser.data.position,
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
            setFormInput({ ...formInput, avatar: result.info.url });
          }
        } else {
          console.log(error);
        }
      }
    );
  };

  const handleChange = (e) => {
    console.log({ ...formInput, [e.target.name]: e.target.value });
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { avatar, fullname, username, position } = formInput;
    dispatch(
      userActions.updateCurrentUser({ avatar, fullname, username, position })
    );
  };

  useEffect(() => {}, [dispatch]);

  return (
    <div id="profile" className="profile">
      <MainVisual heading="Profile" />
      <Breadcrumb leaf="profile" />
      <div className="container">
        {currentUser ? (
          <div className="profile__info">
            <div className="avatar">
              <div
                className="avatar__circle"
                style={{
                  backgroundImage: `url('${
                    currentUser.data.avatar ? currentUser.data.avatar : noimg
                  }')`,
                }}
              ></div>
            </div>
            <div className="info">
              <p className="name">{currentUser.data.fullname}</p>
              <p className="position">Normal {currentUser.data.position}</p>
            </div>
            <button
              onClick={() => {
                setShowModal(true);
                dispatch(userActions.getCurrentUser());
                setFormInput({
                  avatar: currentUser && currentUser.data.avatar,
                  fullname: currentUser && currentUser.data.fullname,
                  username: currentUser && currentUser.data.username,
                  position: currentUser && currentUser.data.position,
                });
              }}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          ""
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {currentUser ? (
            <div className="reader">
              <button
                className="reader__avatar"
                style={{
                  backgroundImage: `url('${
                    formInput.avatar ? formInput.avatar : noimg
                  }')`,
                }}
                onClick={handleEditAvatar}
              >
                <span>Edit</span>
              </button>
              <div className="reader__info">
                <p className="name">{currentUser.data.fullname}</p>
                <p className="position">Normal {currentUser.data.position}</p>
              </div>
            </div>
          ) : (
            ""
          )}
          <form className="form">
            <div className="form__group">
              <div className="item">
                <input
                  type="text"
                  name="fullname"
                  value={formInput.fullname}
                  placeholder="Fullname"
                  onChange={handleChange}
                />
              </div>
              <div className="item">
                <input
                  type="text"
                  name="username"
                  value={formInput.username}
                  placeholder="Username"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form__group">
              <div className="item item--full">
                <input
                  type="text"
                  name="email"
                  value={currentUser && currentUser.data.email}
                  placeholder="Email"
                  disabled
                />
              </div>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button
            className={formInput.fullname && formInput.username ? "active" : ""}
            onClick={() => {
              handleSubmit();
              setShowModal(false);
            }}
          >
            Update Profile
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilePage;
