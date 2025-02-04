import React from "react";
import "./Container.css";

const Container = (props) => {
  const classname = "container " + props.className;
  return <div className={classname}>{props.children}</div>;
};

export default Container;
