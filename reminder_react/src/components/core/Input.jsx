import React from "react";

import PropTypes from "prop-types";

const Input = React.forwardRef((props, ref) => {
  const {
    value,
    onClick,
    id,
    onChange,
    onBlur,
    placeholder = "Please enter data",
    autoFocus,
    type = "text",
    className = "form-check-name",
  } = props;
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
      ref={ref}
    />
  );
});

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  ref: PropTypes.any,
};

export default Input;
