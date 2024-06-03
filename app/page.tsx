"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import React, { useMemo, useState } from "react";
import { z } from "zod";

import {
  CompositionProps,
  defaultMyCompProps,
  VIDEO_FPS,
} from "../types/constants";
import { RenderControls } from "../components/render-controls";
import { VizSchema } from "../types/viz.schema";
import { PodcastViewSchema } from "../components/podcast-view.schema";
import { staticFile } from "remotion";
import { PolesComposition } from "../remotion/poles/poles-composition";

const Home: NextPage = () => {
  const [text, setText] = useState<string>(defaultMyCompProps.title);

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      title: text,
    };
  }, [text]);

  const audioProps: z.infer<typeof VizSchema & typeof PodcastViewSchema> =
    useMemo(() => {
      return {
        // Audio settings
        audioOffsetInSeconds: 6.9,

        // Podcast settings
        audioFileName: staticFile("audio.mp3"),
        coverImgFileName: staticFile("cover.jpg"),
        titleText: text,
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
        waveNumberOfSamples: 256,
        mirrorWave: true,
        durationInSeconds: 29.5,
      };
    }, [text]);

  return (
    <div>
      <div className="max-w-screen-md m-auto mb-5">
        <div className="overflow-hidden rounded-geist shadow-[0_0_200px_rgba(0,0,0,0.15)] mb-10 mt-16">
          <Player
            component={PolesComposition}
            inputProps={audioProps}
            durationInFrames={29.5 * VIDEO_FPS}
            fps={VIDEO_FPS}
            compositionHeight={1080}
            compositionWidth={1080}
            style={{
              // Can't use tailwind class for width since player's default styles take presedence over tailwind's,
              // but not over inline styles
              width: "100%",
            }}
            controls
            autoPlay
            loop
          />
        </div>

        <RenderControls text={text} setText={setText} inputProps={inputProps} />
      </div>
    </div>
  );
};

export default Home;
