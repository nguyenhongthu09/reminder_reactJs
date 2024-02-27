import React, { ButtonHTMLAttributes, forwardRef } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  toggleForId?: string;
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
  const {
    children,
    onClick,
    disabled = false,
    className = "",
    type = "button",
    toggleForId,
    ...rest
  } = props;

  const btnClassName = `btn btn-primary ${className}`;

  return (
    <button
      ref={ref}
      type={type}
      className={btnClassName}
      onClick={onClick}
      disabled={disabled}
      {...(toggleForId
        ? {
            id: toggleForId,
            "data-bs-toggle": "dropdown",
            "aria-expanded": "false",
          }
        : {})}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
