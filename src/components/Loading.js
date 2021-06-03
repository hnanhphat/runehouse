import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div id="loading" className="loading">
      <HashLoader size={100} color="#d67b35" />
    </div>
  );
};

export default Loading;
