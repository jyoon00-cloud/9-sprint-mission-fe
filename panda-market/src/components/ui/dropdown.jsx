"use client";
import { useState } from "react";
// 완성후 대체
function Dropdown({ onSortSelection }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div>
      <button onClick={toggleDropdown}>{onSortSelection}</button>
      {isDropdownVisible && (
        <div>
          <div
            onClick={() => {
              onSortSelection("최신순");
              setIsDropdownVisible(false);
            }}
          >
            최신순
          </div>
          <div
            onClick={() => {
              onSortSelection("인기순");
              setIsDropdownVisible(false);
            }}
          >
            인기순
          </div>
        </div>
      )}
    </div>
  );
}
