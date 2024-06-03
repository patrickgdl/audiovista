import { SubtitleItem } from 'parse-srt';
import { Easing, interpolate } from 'remotion';

type WordProps = {
	item: SubtitleItem;
	frame: number;
	transcriptionColor: string;
};

export const Word = ({ item, frame, transcriptionColor }: WordProps) => {
	const opacity = interpolate(frame, [item.start, item.start + 15], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const translateY = interpolate(
		frame,
		[item.start, item.start + 10],
		[0.25, 0],
		{
			easing: Easing.out(Easing.quad),
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		},
	);

	return (
		<span
			style={{
				display: 'inline-block',
				opacity,
				translate: `0 ${translateY}em`,
				color: transcriptionColor,
			}}
		>
			{item.text}
		</span>
	);
};
