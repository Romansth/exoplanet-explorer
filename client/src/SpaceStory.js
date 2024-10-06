import React, { useState, useEffect } from "react";
import "./SpaceStory.css"; // CSS for the component

export function SpaceStory({ planetName, changeState }) {
  const [story, setStory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch story from API
    fetch(`${process.env.REACT_APP_SPACE_STORY}/${planetName}`)
      .then((response) => response.json())
      .then((data) => setStory(data))
      .catch((err) => setError("Could not fetch the story."));
  }, [planetName]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!story) {
    return (
      <p className="loading-message">Loading story about {planetName}...</p>
    );
  }

  const paragraphs = story.split("\n\n");

  return (
    <div className="space-story-container">
      {/* Animated Space Elements */}
      <div className="space-element-container">
        <div className="space-element"></div>
        <div className="space-element"></div>
        <div className="space-element"></div>
        <div className="space-element"></div>
      </div>

      {/* Twinkling Stars */}
      {[...Array(50)].map((_, index) => (
        <div
          key={index}
          className="twinkling-star"
          style={{
            width: `${Math.random() * 3 + 2}px`,
            height: `${Math.random() * 3 + 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        ></div>
      ))}

      <h1 className="planet-title">The Story of {planetName}</h1>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="story-paragraph">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
