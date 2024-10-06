import React, { useState, useEffect } from "react";

// Navbar Component
export function Navbar({ showContent, changeState }) {
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect to change the navbar style when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar ${scrolled ? "scrolled" : ""} ${
        showContent ? "show-navbar" : ""
      }`}
    >
      <ul className="navbar-list">
        <li
          className="navbar-item"
          onClick={() => changeState({ state: "B", info: null })}
        >
          Home
        </li>
        <li
          className="navbar-item"
          onClick={() => changeState({ state: "G", info: null })}
        >
          Explore Exoplanets
        </li>
        <li
          className="navbar-item"
          onClick={() => changeState({ state: "H", info: null })}
        >
          Ask AI Astronaut
        </li>
        <li
          className="navbar-item"
          onClick={() => changeState({ state: "F", info: null })}
        >
          Meet the Team
        </li>
      </ul>
    </nav>
  );
}
