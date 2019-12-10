import React from "react";
import { Link } from "react-router-dom";

const CloseSearchButton = () => {
  return (
    <Link to="/">
      <button className="close-search">Close</button>
    </Link>
  );
};

export default CloseSearchButton;
