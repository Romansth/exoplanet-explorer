import React from "react";

// Planets Component
export function Planets({ startAnimation }) {
	const planets = Array.from({ length: 20 }).map((_, index) => {
		const size = Math.random() * 100 + 50;
		const top = Math.random() * 90;
		const left = Math.random() * 90;
		const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`;
		const animationDuration = Math.random() * 20 + 10;

		return {
			width: `${size}px`,
			height: `${size}px`,
			top: `${top}%`,
			left: `${left}%`,
			backgroundColor: color,
			animation: `orbit ${animationDuration}s linear infinite`,
		};
	});

	return planets.map((style, index) => (
		<div key={index} className={`planet ${startAnimation ? "grid" : ""}`} style={style}></div>
	));
}
