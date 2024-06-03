import { Hills } from './hills';
import { VizProps } from '../../types/viz-props';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { useAudioData, visualizeAudio } from '@remotion/media-utils';

export const HillsViz = ({
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
			<Hills
				width={353 * 2}
				height={72 * 2}
				copies={3}
				blendMode="screen"
				frequencyData={frequenciesToDisplay}
				fillColor={['#559B59', '#466CF6', '#E54B41']}
			/>
		</div>
	);
};
