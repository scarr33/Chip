import React from "react";

const Chip = ({ item, onRemove, highlighted }) => (
  <div
    className={`chip flex gap-2 border rounded-full ${
      highlighted ? "bg-blue-500 text-white" : "bg-gray-200"
    } px-4 h-fit`}
  >
    {item.value}{" "}
    <span className="cursor-pointer" onClick={() => onRemove(item.value)}>
      x
    </span>
  </div>
);

export default Chip;
