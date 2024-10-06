import React from "react";

// Stars Component

export function Stars({ startAnimation }) {
	const stars = Array.from({ length: 1000 }, (_, i) => {
		const size = Math.random() * 3 + 1;
		const left = Math.random() * 100;
		const duration = Math.random() * 5 + 10;
		const delay = Math.random() * 10;

		return (
			<div
				key={i}
				className={`falling-star ${startAnimation ? "animate" : ""}`}
				style={{
					left: `${left}%`,
					width: `${size}px`,
					height: `${size}px`,
					animationDuration: `${duration}s`,
					animationDelay: `${delay}s`,
				}}
			></div>
		);
	});

	return <>{stars}</>;
}
