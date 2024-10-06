import React, { useState, useEffect } from "react";
import { BlinkingStars } from "./BlinkingStars";
import { Stars } from "./Stars";
import { SpannerMenu } from "./SpannerMenu";

export function Exoplanet({ startAnimation, changeState }) {
  const [clickedPlanet, setClickedPlanet] = useState(null);
  const [exoplanetsData, setExoplanetsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExoplanetNames = async () => {
      try {
        const imageFilenames = Array.from(
          { length: 100 },
          (_, index) => `${index + 1}.png`
        );

        const getRandomImages = () => {
          const shuffled = [...imageFilenames].sort(() => 0.5 - Math.random());
          return shuffled.slice(0, 40);
        };

        console.log("Trying");

        const response = await fetch(`${process.env.REACT_APP_CHOOSE_20}`);
        console.log(response)
        const names = await response.json();
        console.log(names);
        const randomImages = getRandomImages();

        const exoplanets = randomImages.map((image, index) => {
          const name = names[index];
          const initialAngle = Math.random() * 360; // In degrees
          const radius = Math.random() * 500 + 200;
          const size = Math.random() * 70 + 30;
          const animationDuration = Math.random() * 20 + 50;
          return {
            name,
            initialAngle,
            radius,
            size,
            animationDuration: `${animationDuration}s`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundImage: `url('/assets/exoplanets/${image}')`,
          };
        });

        setExoplanetsData(exoplanets);
        setLoading(false);
      
      } catch (error) {
        console.error("Error fetching exoplanet names:", error);
        setLoading(false);
      }
    };

    fetchExoplanetNames();
  }, []);

  const handlePlanetClick = (name) => {
    setClickedPlanet(name);
  };

  const handlePlanetUnclick = () => {
    setClickedPlanet(null);
  };

  if (loading) {
    return <div>Loading exoplanets...</div>;
  }

  return (
    <div className="exoplanet-container">
      {/* Centered Astronaut */}
      <img
        src="/assets/astronauthome.png"
        className="astronaut-exoplanet"
        alt="Astronaut"
      />

      {/* Exoplanets orbiting around the astronaut */}
      {exoplanetsData.map((planet, index) => (
        <div
          key={index}
          className="exo-orbit"
          style={{
            animation: `exo-orbit-animation ${planet.animationDuration} linear infinite`,
            animationDelay: `-${
              (planet.initialAngle / 360) * parseFloat(planet.animationDuration)
            }s`,
            transformOrigin: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          <div
            className="exoplanet"
            style={{
              width: planet.width,
              height: planet.height,
              backgroundImage: planet.backgroundImage,
              transform: `translateX(${
                planet.radius * Math.cos((planet.initialAngle * Math.PI) / 180)
              }px) translateY(${
                planet.radius * Math.sin((planet.initialAngle * Math.PI) / 180)
              }px)`,
            }}
            onClick={() => handlePlanetClick(planet.name)}
          ></div>
        </div>
      ))}

      {/* Conditional message for clicked planet */}
      {clickedPlanet !== null && (
        <SpannerMenu
          onClose={handlePlanetUnclick}
          planetName={clickedPlanet}
          changeState={changeState}
        />
      )}
    </div>
  );
}
