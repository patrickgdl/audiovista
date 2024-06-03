import React, { useEffect, useState } from 'react';
import {
	AbsoluteFill,
	Audio,
	continueRender,
	delayRender,
	Img,
	Sequence,
	useVideoConfig,
} from 'remotion';

import { PaginatedSubtitles } from './subtitles';
import { PodcastViewSchemaType } from './podcast-view.schema';

export const fps = 30;

export const PodcastView = ({
	subtitlesFileName,
	audioFileName,
	coverImgFileName,
	titleText,
	titleColor,
	subtitlesTextColor,
	subtitlesLinePerPage,
	subtitlesZoomMeasurerSize,
	subtitlesLineHeight,
	onlyDisplayCurrentSentence,
	audioOffsetInSeconds,
  children
}: PodcastViewSchemaType & { children: React.ReactNode }) => {
	const { durationInFrames } = useVideoConfig();

	const [handle] = useState(() => delayRender());
	const [subtitles, setSubtitles] = useState<string | null>(null);

	useEffect(() => {
		fetch(subtitlesFileName)
			.then((res) => res.text())
			.then((text) => {
				setSubtitles(text);
				continueRender(handle);
			})
			.catch((err) => {
				console.log('Error fetching subtitles', err);
			});
	}, [handle, subtitlesFileName]);

	if (!subtitles) {
		return null;
	}

	const audioOffsetInFrames = Math.round(audioOffsetInSeconds * fps);

	return (
		<AbsoluteFill>
			<Sequence from={-audioOffsetInFrames}>
				<Audio src={audioFileName} />

				<div
					className="container"
					style={{
						fontFamily: 'IBM Plex Sans',
					}}
				>
					<div className="row">
						<Img className="cover" src={coverImgFileName} />

						<div className="title" style={{ color: titleColor }}>
							{titleText}
						</div>
					</div>

					<div>
{children}
					</div>

					<div
						style={{ lineHeight: `${subtitlesLineHeight}px` }}
						className="captions"
					>
						<PaginatedSubtitles
							subtitles={subtitles}
							startFrame={audioOffsetInFrames}
							endFrame={audioOffsetInFrames + durationInFrames}
							linesPerPage={subtitlesLinePerPage}
							subtitlesTextColor={subtitlesTextColor}
							subtitlesZoomMeasurerSize={subtitlesZoomMeasurerSize}
							subtitlesLineHeight={subtitlesLineHeight}
							onlyDisplayCurrentSentence={onlyDisplayCurrentSentence}
						/>
					</div>
				</div>
			</Sequence>
		</AbsoluteFill>
	);
};
