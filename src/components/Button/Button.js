import React from "react";
import PropTypes from "prop-types";

const Button = ({ onBtnClick, text }) => (
  <button type="button" onClick={onBtnClick}>
    {text}
  </button>
);

Button.propTypes = {
  onBtnClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
