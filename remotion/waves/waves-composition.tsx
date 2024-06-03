import { VizSchemaType } from "../../types/viz.schema";
import { PodcastView } from "../../components/podcast-view";
import { PodcastViewSchemaType } from "../../components/podcast-view.schema";

import { WavesViz } from "./waves-viz";

export const WavesComposition = ({
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
      <WavesViz
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
