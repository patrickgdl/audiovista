import { Wave } from './wave';
import { VizProps } from '../../types/viz-props';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { useAudioData, visualizeAudio } from '@remotion/media-utils';

const offsetPixelSpeed = 200;

export const WavesViz = ({
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

	const currentTime = frame / fps;

	return (
		<div className="audio-viz">
			<Wave
				sections={8}
				width={280 * 2}
				height={125 * 2}
				topRoundness={0.2}
				bottomRoundness={0.4}
				lineGap={(2 * 280) / 8}
				lineColor={['#EE8482', 'teal']}
				frequencyData={frequencyDataSubset}
				offsetPixels={offsetPixelSpeed * currentTime}
			/>
		</div>
	);
};
