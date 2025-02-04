import React from "react";
import "./Button.css";
const Button = ({ text, hidden, onClick }) => {
  const onBtnClick = () => {
    onClick()
  }
  if (hidden) {
    return (
      <button hidden className="btn" onClick={onBtnClick}>
        {text}
      </button>
    );
  } else {
    return <button className="btn">{text}</button>;
  }
};
export default Button;
