import { Composition, staticFile } from "remotion";
import { VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from "../types/constants";
import { HillsComposition } from "./hills/hills-composition";
import { VizSchema } from "../types/viz.schema";
import { PodcastViewSchema } from "../components/podcast-view.schema";
import { PolesComposition } from "./poles/poles-composition";
import { BarsComposition } from "./bars/bars-composition";
import { RadialComposition } from "./radial/radial-composition";
import { WavesComposition } from "./waves/waves-composition";
import { WavesAltComposition } from "./waves/waves-alt-composition";

const defaultProps = {
  // Audio settings
  audioOffsetInSeconds: 6.9,

  // Podcast settings
  audioFileName: staticFile("audio.mp3"),
  coverImgFileName: staticFile("cover.jpg"),
  titleText:
    "#234 – Money, Kids, and Choosing Your Market with Justin Jackson of Transistor.fm",
  titleColor: "rgba(186, 186, 186, 0.93)",

  // Subtitles settings
  subtitlesFileName: staticFile("subtitles.srt"),
  onlyDisplayCurrentSentence: true,
  subtitlesTextColor: "rgba(255, 255, 255, 0.93)",
  subtitlesLinePerPage: 4,
  subtitlesZoomMeasurerSize: 10,
  subtitlesLineHeight: 98,

  // Wave settings
  waveColor: "#a3a5ae",
  waveFreqRangeStartIndex: 7,
  waveLinesToDisplay: 29,
  waveNumberOfSamples: 256 as const,
  mirrorWave: true,
  durationInSeconds: 29.5,
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Poles"
        component={PolesComposition}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        schema={VizSchema && PodcastViewSchema}
        defaultProps={defaultProps}
        // Determine the length of the video based on the duration of the audio file
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: props.durationInSeconds * VIDEO_FPS,
            props,
          };
        }}
      />

      <Composition
        id="Bars"
        component={BarsComposition}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        schema={VizSchema && PodcastViewSchema}
        defaultProps={defaultProps}
        // Determine the length of the video based on the duration of the audio file
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: props.durationInSeconds * VIDEO_FPS,
            props,
          };
        }}
      />

      <Composition
        id="Radial"
        component={RadialComposition}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        schema={VizSchema && PodcastViewSchema}
        defaultProps={defaultProps}
        // Determine the length of the video based on the duration of the audio file
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: props.durationInSeconds * VIDEO_FPS,
            props,
          };
        }}
      />

      <Composition
        id="Waves"
        component={WavesComposition}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        schema={VizSchema && PodcastViewSchema}
        defaultProps={defaultProps}
        // Determine the length of the video based on the duration of the audio file
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: props.durationInSeconds * VIDEO_FPS,
            props,
          };
        }}
      />

      <Composition
        id="Waves-Alternative"
        component={WavesAltComposition}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        schema={VizSchema && PodcastViewSchema}
        defaultProps={defaultProps}
        // Determine the length of the video based on the duration of the audio file
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: props.durationInSeconds * VIDEO_FPS,
            props,
          };
        }}
      />

      <Composition
        id="Hills"
        component={HillsComposition}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        schema={VizSchema && PodcastViewSchema}
        defaultProps={defaultProps}
        // Determine the length of the video based on the duration of the audio file
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: props.durationInSeconds * VIDEO_FPS,
            props,
          };
        }}
      />
    </>
  );
};
