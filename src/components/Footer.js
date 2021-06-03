import logo from "../logo.svg";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > window.innerHeight) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    };
  }, [status]);

  return (
    <footer id="footer" className="footer">
      <button
        className={`footer__scroll ${status ? "footer__scroll--active" : ""}`}
        onClick={() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="chevron-circle-up"
          className="svg-inline--fa fa-chevron-circle-up fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm231-113.9L103.5 277.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L256 226.9l101.6 101.6c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L273 142.1c-9.4-9.4-24.6-9.4-34 0z"
          ></path>
        </svg>
      </button>
      <div className="footer__logo">
        <Link to="/">
          <img src={logo} alt="Rune House" />
        </Link>
        <p>Rune House</p>
      </div>
      <p className="footer__copyright">
        2021 - E-commerce website <br className="pc" />
        developed by{" "}
        <a
          href="https://barryhoang.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Barry Hoang
        </a>
      </p>
    </footer>
  );
};

export default Footer;
