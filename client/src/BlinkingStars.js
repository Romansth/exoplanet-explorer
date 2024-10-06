import React from "react";

// Blinking Stars Component

export function BlinkingStars({ startAnimation }) {
	const blinkingStars = Array.from({ length: 50 }).map((_, index) => {
		const size = Math.random() * 5 + 2;
		const top = Math.random() * 100;
		const left = Math.random() * 100;
		const animationDuration = Math.random() * 3 + 1;

		return {
			width: `${size}px`,
			height: `${size}px`,
			top: `${top}%`,
			left: `${left}%`,
			animation: `twinkle ${animationDuration}s infinite`,
		};
	});

	return blinkingStars.map((style, index) => (
		<div key={index} className={`blinkingStars ${startAnimation ? "falling" : ""}`} style={style}></div>
	));
}
