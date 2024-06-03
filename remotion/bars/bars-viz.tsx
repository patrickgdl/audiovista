import { useAudioData, visualizeAudio } from '@remotion/media-utils';
import { useCurrentFrame, useVideoConfig } from 'remotion';

import { VizProps } from '../../types/viz-props';
import { Bars } from './bars';

export const BarsViz = ({
	waveColor,
	waveNumberOfSamples,
	waveFreqRangeStartIndex,
	waveLinesToDisplay,
	mirrorWave,
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

	// Pick the low values because they look nicer than high values
	// feel free to play around :)
	const frequencyDataSubset = frequencyData.slice(
		waveFreqRangeStartIndex,
		waveFreqRangeStartIndex +
			(mirrorWave ? Math.round(waveLinesToDisplay / 2) : waveLinesToDisplay),
	);

	const frequenciesToDisplay = mirrorWave
		? [...frequencyDataSubset.slice(1).reverse(), ...frequencyDataSubset]
		: frequencyDataSubset;

	return (
		<div className="audio-viz">
			<Bars
				width={560}
				height={120}
				// height={`${500 * Math.sqrt(v)}%`}
				lineThickness={5}
				gapSize={7}
				roundness={2}
				color={waveColor}
				frequencyData={frequenciesToDisplay}
			/>
		</div>
	);
};
