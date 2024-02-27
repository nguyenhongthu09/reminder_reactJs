import React, { ChangeEvent, Component } from "react";

interface ICheckboxProps {
  type?: string;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  id?: string;
}

class Checkbox extends Component<ICheckboxProps> {
  render() {
    const {
      type = "checkbox",
      className = "form-check-input",
      onChange,
      checked,
      id,
    } = this.props;

    return (
      <>
        <input
          type={type}
          className={className}
          onChange={onChange}
          checked={checked}
          id={id}
        />
      </>
    );
  }
}

export default Checkbox;
