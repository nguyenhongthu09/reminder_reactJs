import React, { Component } from "react";
import PropTypes from "prop-types";

class Button extends Component {
  render() {
    const {
      children,
      onClick,
      disabled = false,
      className="",
      type ="button",
      id,
    } = this.props;
    const btnClassName = `btn btn-primary ${className}`;
    return (
      <button
        type={type}
        className={btnClassName}
        onClick={onClick}
        disabled={disabled}
        id={id}
        {...this.props.toggleForId ? {
          id: this.props.toggleForId,
          'data-bs-toggle':"dropdown",
          'aria-expanded':"false"
        } : {}}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.any,
  onClick: PropTypes.func,
  id: PropTypes.string,
};

export default Button;
