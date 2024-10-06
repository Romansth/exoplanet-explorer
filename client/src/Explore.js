import React from 'react';
import './explore.css'; // CSS for the component

export function Explore({}) {
    return (
        <div className="explore-container">
            <iframe
                src="https://eyes.nasa.gov/apps/exo/#/"
                title="NASA Eyes on Exoplanets"
                className="explore-iframe"
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>
    );
}