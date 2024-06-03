import { VizSchemaType } from "../../types/viz.schema";
import { PodcastView } from "../../components/podcast-view";
import { PodcastViewSchemaType } from "../../components/podcast-view.schema";
import { HillsViz } from "./hills-viz";

export const HillsComposition = ({
  subtitlesFileName,
  audioFileName,
  waveColor,
  waveNumberOfSamples,
  waveFreqRangeStartIndex,
  waveLinesToDisplay,
  mirrorWave,
  ...podcastViewProps
}: VizSchemaType & PodcastViewSchemaType) => {
  return (
    <PodcastView
      audioFileName={audioFileName}
      subtitlesFileName={subtitlesFileName}
      {...podcastViewProps}
    >
      <HillsViz
        waveColor={waveColor}
        audioSrc={audioFileName}
        mirrorWave={mirrorWave}
        waveLinesToDisplay={waveLinesToDisplay}
        waveNumberOfSamples={waveNumberOfSamples}
        waveFreqRangeStartIndex={waveFreqRangeStartIndex}
      />
    </PodcastView>
  );
};
