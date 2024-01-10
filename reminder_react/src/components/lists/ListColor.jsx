import React, { Component } from "react";
import PropTypes from "prop-types";

class ListColor extends Component {
  constructor() {
    super();
    this.state = { selectedColor: null };
  }
  handleColorClick = (selectedColor) => {
    this.setState({ selectedColor });
    this.props.onColorClick(selectedColor);
  };

  render() {
    const { colors } = this.props;
    const { selectedColor } = this.state;
    return (
      <>
        {colors.map((color, index) => (
          <div
            key={index}
            className={`color-swatch ${
              selectedColor === color ? "selected" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => this.handleColorClick(color)}
          ></div>
        ))}
      </>
    );
  }
}

ListColor.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  onColorClick: PropTypes.func,
};

export default ListColor;
