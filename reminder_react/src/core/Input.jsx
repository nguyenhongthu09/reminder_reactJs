import React, { Component } from "react";
import PropTypes from "prop-types";

class Input extends Component {
  render() {
    const {
      value,
      onClick,
      className,
      type,
      id,
      onChange,
      onBlur,
      placeholder,
      autoFocus,
    } = this.props;

    return (
      <input
        type={type}
        id={id}
        className={className}
        onClick={onClick}
        defaultValue={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
    );
  }
}

Input.propTypes = {
  type: PropTypes.any.isRequired,
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
