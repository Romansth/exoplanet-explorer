import React, { useState } from "react";
import { ReactTyped } from "react-typed";
import "./App.css";
import { BlinkingStars } from "./BlinkingStars";
import { Exoplanet } from "./Exoplanet";
import { Navbar } from "./Navbar";
import { Planets } from "./Planets";
import { SpaceStory } from "./SpaceStory";
import { SpaceInfo } from "./SpaceInfo";
import { Stars } from "./Stars";
import { MeetTheTeam } from "./MeetTheTeam";
import { Explore } from "./Explore";
import { ViewPlanet } from "./ViewPlanet";
import { AskAstronaut } from "./AskAstronaut";

// Main App Component
function App() {
  const [activeComponent, setActiveCompontent] = useState("A");
  const [startAnimation, setStartAnimation] = useState(false);
  const [hideContent, setHideContent] = useState(false); //hides explore start now button
  const [showContent, setShowContent] = useState(false); //hides navbar
  const [showNewComponent, setShowNewComponent] = useState(false);
  const [currPlanet, setCurrPlanet] = useState(null);

  const handleStartNow = () => {
    setStartAnimation(true);
    setTimeout(() => {
      // Pass `null` or `""` for "no info"
      changeState({ state: "B", info: null }); // or { state: 'B', info: "" }
      setHideContent(true);
      setShowContent(true);
      setShowNewComponent(true);
    }, 100);
  };

  //changes active state
  const changeState = ({ state, info }) => {
    // A - homepage, B - Exoplanets display page, C - Story Page, D - Info Page, E - Exploration Page per planet
    // F - About US page, G - Explore exoplanets overall page H - ask astronaut
    if (state === "A") {
      setHideContent(false);
      setShowContent(false);
    }

    if ((state === "F") | (state === "G")) {
      setHideContent(true);
    }

    if (state === "C" || state === "D" || state === "E") {
      setCurrPlanet(info);
    }

    setActiveCompontent(state);
  };

  return (
    <div className="wrapper">
      <Stars startAnimation={startAnimation} />
      <BlinkingStars startAnimation={startAnimation} />
      <Navbar showContent={showContent} changeState={changeState} />
      <div className="viewport">
        
        {/* Conditional Rendering for planets, stars, and astronaut */}
        {activeComponent === "A" && (
          <>
       
            <Planets startAnimation={startAnimation} />
            
           
            <img
              src="/assets/astronautrocket.png"
              className={`astronaut ${startAnimation ? "move-astronaut" : ""}`}
              alt="Astronaut"
            />
          </>
        )}

        {/* Content that will hide after button click */}
        <div className={`content ${hideContent ? "hide-content" : ""}`}>
          <h1 className="animated-text">
            <ReactTyped
              strings={["Let's Explore the Cosmos!"]}
              typeSpeed={80}
              backSpeed={100}
              showCursor={true}
              loop={false}
            />
          </h1>
          <button className="explore-button" onClick={handleStartNow}>
            Start Now
          </button>
        </div>

        {/* New Component appears after the button is clicked */}
        {activeComponent === "B" && (
          <>
            <Exoplanet
              startAnimation={startAnimation}
              changeState={changeState}
            />
          </>
        )}

        {activeComponent === "C" && (
          <>
            <SpaceStory planetName={currPlanet} changeState={changeState} />
          </>
        )}

        {activeComponent === "D" && (
          <>
            <SpaceInfo planetName={currPlanet} changeState={changeState} />
          </>
        )}

        {activeComponent === "E" && (
          <>
            <ViewPlanet planetName={currPlanet} changeState={changeState}/>
          </>
        )}

        {activeComponent === "F" && (
          <>
            <MeetTheTeam />
          </>
        )}

        {activeComponent === "G" && (
          <>
            <Explore />
          </>
        )}

      {activeComponent === "H" && (
          <>
            <AskAstronaut />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
