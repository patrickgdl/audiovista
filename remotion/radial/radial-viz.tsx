import { useCurrentFrame, useVideoConfig } from 'remotion';
import { VizProps } from '../../types/viz-props';
import { RadialBars } from './radial-bars';
import { useAudioData, visualizeAudio } from '@remotion/media-utils';

export const RadialViz = ({
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

	return (
		<div className="audio-viz">
			<RadialBars
				gapSize={4}
				lineThickness={8}
				diameter={400}
				innerRadius={100}
				color={waveColor}
				frequencyData={frequencyDataSubset}
			/>
		</div>
	);
};
