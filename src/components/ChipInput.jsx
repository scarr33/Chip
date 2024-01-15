import React, { useState, useRef, useEffect } from "react";
import Chip from "./Chip";
import Dropdown from "./Dropdown";

const KEY_ENTER = "Enter";
const KEY_BACKSPACE = "Backspace";

const ChipInput = ({ allItems }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(allItems);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filterItems = (value) => {
    const trimmedValue = value.trim().toLowerCase();
    return allItems.filter(
      (item) =>
        item.toLowerCase().includes(trimmedValue) &&
        !selectedItems.map((selectedItem) => selectedItem.value).includes(item)
    );
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredItems(filterItems(value));
    setDropdownVisible(value.trim() !== "");
  };

  const handleInputClick = () => {
    if (inputValue.trim() === "") {
      setFilteredItems(filterItems(inputValue));
      setDropdownVisible(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === KEY_ENTER && inputValue.trim() !== "") {
      const trimmedInput = inputValue.trim();
      if (
        !selectedItems
          .map((selectedItem) => selectedItem.value)
          .includes(trimmedInput) &&
        allItems.includes(trimmedInput)
      ) {
        const updatedItems = [
          ...selectedItems,
          { value: trimmedInput, highlighted: false },
        ];
        setSelectedItems(updatedItems);
        setInputValue("");
        setFilteredItems(filterItems(""));
        setDropdownVisible(false);
      }
    } else if (e.key === KEY_BACKSPACE && inputValue === "") {
      if (selectedItems.length > 0) {
        if (deleteConfirmation) {
          const updatedItems = selectedItems.slice(0, -1);
          setSelectedItems(updatedItems);
          setDeleteConfirmation(false);
        } else {
          const lastSelectedItem = selectedItems[selectedItems.length - 1];
          setSelectedItems((prevItems) =>
            prevItems.map((item) =>
              item === lastSelectedItem ? { ...item, highlighted: true } : item
            )
          );
          setDeleteConfirmation(true);
        }
      }
    }
  };

  const handleDropdownItemClick = (item) => {
    if (
      !selectedItems.map((selectedItem) => selectedItem.value).includes(item)
    ) {
      const updatedItems = [
        ...selectedItems,
        { value: item, highlighted: false },
      ];
      setSelectedItems(updatedItems);
      setInputValue("");
      setFilteredItems(filterItems(""));
      setDropdownVisible(false);
    }
  };

  const handleChipRemove = (item) => {
    const updatedItems = selectedItems.filter(
      (selectedItem) => selectedItem.value !== item
    );
    setSelectedItems(updatedItems);
    setFilteredItems(filterItems(""));
  };

  return (
    <div>
      <div className="chip-input-container relative flex gap-2" ref={inputRef}>
        <div className="selected-items flex gap-2">
          {selectedItems.map((item, index) => (
            <Chip
              key={item.value}
              item={item}
              onRemove={handleChipRemove}
              highlighted={item.highlighted}
            />
          ))}
        </div>
        <div>
          <input
            type="text"
            value={inputValue}
            className="outline-none"
            onChange={handleInputChange}
            onClick={handleInputClick}
            onKeyDown={handleKeyDown}
            placeholder="Type to search and press Enter to add"
          />
          {isDropdownVisible && filteredItems.length > 0 && (
            <Dropdown
              items={filteredItems}
              onItemClick={handleDropdownItemClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChipInput;
