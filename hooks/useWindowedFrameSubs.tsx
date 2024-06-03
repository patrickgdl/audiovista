import parseSRT, { SubtitleItem } from 'parse-srt';
import { useMemo } from 'react';
import { useVideoConfig } from 'remotion';

type OptionsProps = {
	windowStart: number;
	windowEnd: number;
};

export const useWindowedFrameSubs = (src: string, options: OptionsProps) => {
	const { windowStart, windowEnd } = options;
	const { fps } = useVideoConfig();

	const parsed = useMemo(() => parseSRT(src), [src]);

	return useMemo(() => {
		return parsed
			.map((item) => {
				const start = Math.floor(item.start * fps);
				const end = Math.floor(item.end * fps);
				return { item, start, end };
			})
			.filter(({ start }) => {
				return start >= windowStart && start <= windowEnd;
			})
			.map<SubtitleItem>(({ item, start, end }) => {
				return {
					...item,
					start,
					end,
				};
			}, []);
	}, [fps, parsed, windowEnd, windowStart]);
};
