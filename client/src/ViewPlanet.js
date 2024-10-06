import React from 'react';
import './ViewPlanet.css'; // CSS for the component

export function ViewPlanet({ planetName, changeState }) {
    return (
        <div className="explore-container">
            <iframe
                src={`https://eyes.nasa.gov/apps/exo/#/star/${planetName}/`}
                title="NASA Eyes on Exoplanets"
                className="explore-iframe"
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>
    );
}