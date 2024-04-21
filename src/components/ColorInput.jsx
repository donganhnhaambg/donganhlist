import React, { useState } from "react";
import { ChromePicker } from "react-color";

function ColorInput({ onChangeColor }) {
  const [color, setColor] = useState("#ededed");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleClose = () => {
    setShowColorPicker(false);
  };

  return (
    <div>
      <input
        type="text"
        value={color}
        onClick={handleClick}
        readOnly
        style={{ backgroundColor: color, color: color, width: "30px" }}
      />
      {showColorPicker && (
        <div style={{ position: "absolute", zIndex: "2" }}>
          <ChromePicker
            color={color}
            onChange={(updatedColor) => onChangeColor(updatedColor.hex)}
          />
        </div>
      )}
      {showColorPicker && <div onClick={handleClose} className="close" />}
    </div>
  );
}

export default ColorInput;
