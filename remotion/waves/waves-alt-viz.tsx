import { useAudioData, visualizeAudio } from '@remotion/media-utils';
import { useCurrentFrame, useVideoConfig } from 'remotion';

import { VizProps } from '../../types/viz-props';
import { Wave } from './wave';

const offsetPixelSpeed = -100;

export const WavesAltViz = ({
	waveColor,
	waveNumberOfSamples,
	audioSrc,
}: VizProps) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const audioData = useAudioData(audioSrc);

	if (!audioData) {
		return null;
	}

	const frequencyData = visualizeAudio({
		fps,
		frame,
		audioData,
		numberOfSamples: waveNumberOfSamples, // Use more samples to get a nicer visualisation
	});

	const currentTime = frame / fps;

	return (
		<div className="audio-viz">
			<Wave
				lines={6}
				lineGap={6}
				sections={10}
				width={280 * 2}
				height={125 * 2}
				lineColor={waveColor}
				offsetPixels={offsetPixelSpeed * currentTime}
				frequencyData={frequencyData}
			/>
		</div>
	);
};
