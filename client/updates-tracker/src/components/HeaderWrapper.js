import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const HeaderWrapper = (props) => {
  const navigate = useNavigate();
  return <Header navigate={navigate} {...props} />;
};

export default HeaderWrapper;