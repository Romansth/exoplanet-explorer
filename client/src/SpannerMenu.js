import React, { useState } from "react";
import "./SpannerMenu.css"; // Importing CSS for the spanner

export function SpannerMenu({ onClose, planetName, changeState }) {
  const [isOpen, setIsOpen] = useState(false);
  console.log("we're here");
  console.log(planetName);
  console.log("whops");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="spanner-container">
      {/* Spanner Icon */}
      <div className="spanner-icon" onClick={toggleMenu}>
        🔧
      </div>

      {/* Menu Options */}
      <div className="spanner-menu">
        {/* Close Button in the top-right corner */}
        <button className="close-button" onClick={onClose}>
          X
        </button>

        <h2 className="menu-header">
          Congrats! You've discovered Planet {planetName}
        </h2>

        <ul className="menu-options">
          <li
            className="menu-item"
            onClick={() => changeState({ state: "D", info: planetName })}
          >
            1. Learn Info
          </li>
          <li
            className="menu-item"
            onClick={() => changeState({ state: "C", info: planetName })}
          >
            2. Hear a Story
          </li>
          <li
            className="menu-item"
            onClick={() => changeState({ state: "E", info: planetName })}
          >
            3. Explore the Planet
          </li>
        </ul>
      </div>
    </div>
  );
}
