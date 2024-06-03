import { CSSProperties } from 'react';
import { getBars } from '../bars/get-bars';

interface BaseRadialBarsProps {
	innerRadius: number;
	lineThickness: number;
	barOrigin?: 'outer' | 'inner' | 'middle';
	roundness?: number;
	color?: CSSProperties['color'];
	maxAmplitude?: number;
}

export interface RadialBarsProps extends BaseRadialBarsProps {
	frequencyData: number[];
	maxDb?: number;
	minDb?: number;
	diameter: number;
	gapSize: number;
}

export const RadialBars: React.FC<RadialBarsProps> = ({
	frequencyData,
	lineThickness,
	roundness,
	barOrigin,
	color,
	maxAmplitude = 1,
	innerRadius,
	maxDb,
	minDb,
	gapSize,
	diameter,
}) => {
	const radius = 0.5 * diameter;

	const bars = getBars({
		totalWidth: 2 * Math.PI * innerRadius,
		itemWidth: lineThickness + gapSize,
		frequencyData,
		maxDb,
		minDb,
	});

	const highpass = bars.slice(Math.floor(0.5 * bars.length));

	const amplitudes = [...highpass, ...highpass.slice().reverse()];

	const finalDiameter = 2 * radius;

	return (
		<div style={{ width: finalDiameter, height: finalDiameter }}>
			<svg
				width={finalDiameter}
				height={finalDiameter}
				viewBox={`0 0 ${finalDiameter} ${finalDiameter}`}
			>
				{amplitudes.map((v, i) => {
					const barHeight = (v * (radius - innerRadius)) / maxAmplitude;
					const x = radius;
					const y =
						barOrigin === 'outer'
							? radius - barHeight
							: barOrigin === 'inner'
								? radius
								: radius - 0.5 * barHeight;
					const yOffset =
						barOrigin === 'outer'
							? radius
							: barOrigin === 'inner'
								? innerRadius
								: radius - 0.5 * (radius - innerRadius);

					const transform = `rotate(${
						(360 * i) / amplitudes.length
					} ${radius} ${radius}) translate(0 ${yOffset})`;

					return (
						<rect
							key={i}
							fill={color}
							x={x}
							y={y}
							width={lineThickness}
							height={barHeight}
							rx={roundness}
							transform={transform}
						/>
					);
				})}
			</svg>
		</div>
	);
};
