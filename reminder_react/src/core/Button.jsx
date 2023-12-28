import React, { Component } from "react";
import PropTypes from "prop-types";

class Button extends Component {
  render() {
    const {
      children,
      onClick,
      disabled = false,
      className,
      type,
      id,
    } = this.props;

    return (
      <button
        type={type}
        className={className}
        onClick={onClick}
        disabled={disabled}
        id={id}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string.isRequired,
  type: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  id: PropTypes.string,
};

export default Button;
