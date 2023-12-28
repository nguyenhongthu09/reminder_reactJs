import React, { Component } from "react";
import "../style/style.css";
class RenderColorOnUi extends Component {
  constructor() {
    super();
    this.state = {};
  }
  handleColorClick = (selectedColor) => {
    this.props.onColorClick(selectedColor);
  };

  render() {
    const { colors } = this.props;
    return (
      <>
        {colors.map((color, index) => (
          <div
            key={index}
            className="color-swatch"
            style={{ backgroundColor: color }}
            onClick={() => this.handleColorClick(color)}
          ></div>
        ))}
      </>
    );
  }
}
export default RenderColorOnUi;
