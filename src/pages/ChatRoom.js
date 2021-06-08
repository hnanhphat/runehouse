import noimg from "../noimg.jpeg";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import { userActions } from "../redux/actions/user.actions";

import { withNamespaces } from "react-i18next";

let socket;
const BE_URL = process.env.REACT_APP_BACKEND_API;
const Chatroom = ({ t }) => {
  const dispatch = useDispatch();
  const chatArea = useRef(null);

  const users = useSelector((state) => state.user.allUser.data);
  const currentUser = useSelector((state) => state.user.currentUser.data);
  const [showForm, setShowForm] = useState(false);

  console.log(currentUser && currentUser.data._id);

  const [newMessage, setNewMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [target, setTarget] = useState("60a1440bf93fdb1099248396");

  const handleSendImages = (e) => {
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
            socket.emit("msg.send", {
              fromUser: currentUser && currentUser.data._id,
              image: result.info.url,
              toUser: target,
            });
          }
        } else {
          console.log(error);
        }
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage) {
      socket.emit("msg.send", {
        fromUser: currentUser && currentUser.data._id,
        body: newMessage,
        toUser: target,
      });
      setNewMessage("");
      e.target.reset();
    }
    setTimeout(() => {
      chatArea.current.scrollTo(0, chatArea.current.children[0].offsetHeight);
    }, 100);
  };

  useEffect(() => {
    socket = socketIOClient(BE_URL);
    socket.emit("msg.init", {
      fromUser: currentUser && currentUser.data._id,
      toUser: target,
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser, target]);

  useEffect(() => {
    if (socket) {
      socket.on("msg.receive", (msg) => {
        console.log(("I got it from backend", msg));
        setMessageList((state) => [...state, msg]);
      });

      socket.on("msg.noti", (msg) => {
        console.log(("I got it from backend", msg));
        setMessageList(msg.previousMessage);
      });
    }
  }, [currentUser, target]);

  useEffect(() => {
    dispatch(userActions.getListOfUsers(1, "&sortBy[role]=1"));
  }, [dispatch]);

  return (
    <div id="chatroom" className="chatroom">
      <div
        className="chatroom__sidebar"
        style={{ height: window.innerHeight - 80 }}
      >
        <ul>
          {users &&
            users.data.users.map((user) => (
              <li
                key={user._id}
                className={
                  currentUser && currentUser.data._id === user._id
                    ? "current"
                    : ""
                }
              >
                <button
                  className={showForm && target === user._id ? "active" : ""}
                  onClick={() => {
                    setTarget(user._id);
                    setShowForm(true);
                    setTimeout(() => {
                      chatArea.current.scrollTo(
                        0,
                        chatArea.current.children[0].offsetHeight
                      );
                    }, 100);
                  }}
                >
                  <div
                    className="img"
                    style={{
                      backgroundImage: `url('${
                        user.avatar ? user.avatar : noimg
                      }')`,
                    }}
                  ></div>
                  <div className="info">
                    <p>{user.fullname}</p>
                    <span>{user.role}</span>
                  </div>
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div
        className={`chatroom__content ${
          showForm ? "chatroom__content--show" : ""
        }`}
      >
        <div
          className="chatroom__messages"
          style={{ height: window.innerHeight - 125 }}
          ref={chatArea}
        >
          <ul>
            {messageList.length > 0 &&
              messageList.map((msg) => (
                <li
                  key={msg._id}
                  className={
                    currentUser && currentUser.data._id === msg.fromUser
                      ? "from"
                      : "to"
                  }
                >
                  {msg.body ? (
                    <p>{msg.body}</p>
                  ) : (
                    <img src={msg.image} alt={msg._id} />
                  )}
                </li>
              ))}
          </ul>
        </div>
        <div className="chatroom__form">
          <button onClick={handleSendImages}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="images"
              className="svg-inline--fa fa-images fa-w-18"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v208c0 44.112 35.888 80 80 80h336zm96-80V80c0-26.51-21.49-48-48-48H144c-26.51 0-48 21.49-48 48v256c0 26.51 21.49 48 48 48h384c26.51 0 48-21.49 48-48zM256 128c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-96 144l55.515-55.515c4.686-4.686 12.284-4.686 16.971 0L272 256l135.515-135.515c4.686-4.686 12.284-4.686 16.971 0L512 208v112H160v-48z"
              ></path>
            </svg>
          </button>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={t("hd.Type a message ...")}
            />
            <button type="submit">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="paper-plane"
                className="svg-inline--fa fa-paper-plane fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
                ></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withNamespaces()(Chatroom);
