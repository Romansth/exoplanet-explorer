import React, { useState, useEffect } from "react";
import "./SpaceStory.css"; // CSS for the component

export function SpaceInfo({ planetName, changeState }) {
  const [story, setStory] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Fetch story from API
    fetch(`${process.env.REACT_APP_SPACE_INFO}/${planetName}`)
      .then((response) => response.json())
      .then((data) => setStory(data))
      .catch((err) => setError("Could not fetch the info."));
  }, [planetName]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!story) {
    return (
      <p className="loading-message">Loading information about {planetName}...</p>
    );
  }

  const paragraphs = story.split("\n\n");

  const totalPages = paragraphs.length;

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="space-story-container">
      <div id="stars" className="stars-background"></div>
      <div className="story-content">
        <h1 className="planet-title">{planetName}</h1>
        <div className="book">
          {paragraphs.map((paragraph, index) => (
            <div
              key={index}
              className={`page ${index < currentPage ? "flipped" : ""}`}
              style={{ zIndex: totalPages - index }}
            >
              <div className="front">
                <p className="story-paragraph">{paragraph}</p>
              </div>
              <div className="back"></div>
            </div>
          ))} 
        </div>
      </div>
    </div>
  );
}
