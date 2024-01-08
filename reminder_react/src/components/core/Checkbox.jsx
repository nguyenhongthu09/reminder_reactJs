import React, { Component } from "react";
import PropTypes from "prop-types";
class Checkbox extends Component {
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

Checkbox.propTypes = {
  type: PropTypes.any,
  className: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  id: PropTypes.string,
};

export default Checkbox;
