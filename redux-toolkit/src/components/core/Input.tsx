import React, { ChangeEvent, FocusEvent } from "react";

interface IInputProps {
  value?: string;
  onClick?: () => void;
  id?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoFocus?: boolean;
  type?: string;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
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

export default Input;
