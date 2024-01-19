import React from "react";
import PropTypes from "prop-types";

const Button = React.forwardRef((props, ref) => {
  const {
    children,
    onClick,
    disabled = false,
    className = "",
    type = "button",
    id,
    toggleForId,
  } = props;
  const btnClassName = `btn btn-primary ${className}`;
  return (
    <button
      ref={ref}
      type={type}
      className={btnClassName}
      onClick={onClick}
      disabled={disabled}
      id={id}
      {...(toggleForId
        ? {
            id: toggleForId,
            "data-bs-toggle": "dropdown",
            "aria-expanded": "false",
          }
        : {})}
    >
      {children}
    </button>
  );
});

Button.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.any,
  onClick: PropTypes.func,
  id: PropTypes.string,
  ref: PropTypes.any,
};

export default Button;
