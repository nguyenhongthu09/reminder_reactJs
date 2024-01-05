import React, { Component } from "react";
import PropTypes from "prop-types";

class Input extends Component {
  render() {
    const {
      value,
      onClick,
      id,
      onChange,
      onBlur,
      placeholder = "Please enter data",
      autoFocus,
      checked,
      type,
      className,
    } = this.props;

    const combinedClassName = `${
      type === "checkbox" ? "form-check-input" : "form-check-name"
    } ${className || ""}`;
    return (
      <input
        type={type}
        id={id}
        className={combinedClassName}
        onClick={onClick}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoFocus={autoFocus}
        checked={checked}
      />
    );
  }
}

Input.propTypes = {
  type: PropTypes.any,
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  checked: PropTypes.bool,
};

export default Input;
