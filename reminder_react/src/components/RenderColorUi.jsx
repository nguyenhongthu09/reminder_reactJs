import React, { Component } from "react";
import "../style/style.css";
class RenderColorOnUi extends Component {
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
export default RenderColorOnUi;
