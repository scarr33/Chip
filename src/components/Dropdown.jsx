import React from "react";

const Dropdown = ({ items, onItemClick }) => (
  <ul className="dropdown z-10 drop-shadow-sm">
    {items.map((item) => (
      <li key={item} onClick={() => onItemClick(item)}>
        {item}
      </li>
    ))}
  </ul>
);

export default Dropdown;
