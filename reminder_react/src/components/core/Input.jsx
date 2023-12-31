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
      type,
      className = "form-check-name",
    } = this.props;
    return (
      <input
        type={type}
        id={id}
        className={className}
        onClick={onClick}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoFocus={autoFocus}
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
};

export default Input;
