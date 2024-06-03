import { Easing } from 'remotion';

interface Options {
	numberOfPoints: number;
	amplitude: number;
	offsetPixels: number;
	width: number;
}

interface Point {
	x: number;
	y: number;
}

export const makePoints: (options: Options) => Array<Point> = ({
	numberOfPoints,
	amplitude,
	offsetPixels,
	width,
}) => {
	const step = 1 / numberOfPoints;
	const stepOffset = offsetPixels / width;

	return Array.from({ length: numberOfPoints })
		.map((_, i, arr) => {
			const fraction = ((i - 0.5) % arr.length) * step - stepOffset;

			let x = (fraction + 1) % 1;
			x = x * width;

			let y = Math.sin(Math.abs(fraction) * Math.PI);
			// shape the wave
			y = Easing.cubic(y);
			// amplify the wave
			y = y * amplitude;
			// every other point above/below center
			y = y * Math.sin((0.5 + i) * Math.PI);

			return { x, y };
		})
		.sort((a, b) => (a.x > b.x ? 1 : -1));
};
