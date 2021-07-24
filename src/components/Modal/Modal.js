import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.onKeydownClick);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeydownClick);
  }

  onKeydownClick = (e) => {
    const { onCloseModal } = this.props;
    if (e.code === "Escape") {
      onCloseModal();
    }
  };

  render() {
    const { children, onCloseModal } = this.props;
    return (
      <div className="Overlay" onClick={onCloseModal}>
        <div className="Modal">{children}</div>
      </div>
    );
  }
}
