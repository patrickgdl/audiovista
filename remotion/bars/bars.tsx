import { CSSProperties } from 'react';
import { getBars } from './get-bars';

interface BarsProps {
	width?: number;
	height?: number;
	lineThickness?: number;
	gapSize?: number;
	roundness?: number;
	placement?: 'over' | 'under' | 'middle';
	color?: CSSProperties['color'];
	maxAmplitude?: number;
	frequencyData: number[];
	maxDb?: number;
	minDb?: number;
}

export const Bars = ({
	width = 400,
	height = 100,
	lineThickness = 8,
	gapSize = 8,
	roundness = 4,
	placement = 'middle',
	color = 'white',
	maxAmplitude = 1,
	frequencyData,
	maxDb,
	minDb,
}: BarsProps) => {
	const amplitudes = getBars({
		totalWidth: width!,
		itemWidth: lineThickness + gapSize,
		frequencyData,
		maxDb,
		minDb,
	});

	return (
		<div style={{ width, height }}>
			<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
				{amplitudes.map((v, i) => {
					const barHeight = (v * height) / maxAmplitude;
					const x = i * (lineThickness + gapSize);
					const y =
						placement === 'over'
							? 0
							: placement === 'under'
								? height - barHeight
								: 0.5 * (height - barHeight);

					return (
						<rect
							key={i}
							fill={color}
							x={x}
							y={y}
							width={lineThickness}
							height={barHeight}
							rx={roundness}
						/>
					);
				})}
			</svg>
		</div>
	);
};
