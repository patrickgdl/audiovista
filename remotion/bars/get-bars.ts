import { processAudioFftValue } from "../../helpers/audio";

export const getBars = ({
  totalWidth,
  itemWidth,
  frequencyData,
  maxDb = -50,
  minDb = -80,
}: {
  totalWidth: number;
  itemWidth: number;
  frequencyData: number[];
  maxDb?: number;
  minDb?: number;
}) => {
  const nBars = Math.floor(totalWidth / itemWidth);
  const samples = frequencyData;
  const sampleStep = Math.floor(samples.length / nBars);

  const bars = Array.from({ length: nBars }).map((_, i) => {
    const processed = processAudioFftValue(
      samples[(i * sampleStep) % samples.length],
      { maxDb, minDb }
    );

    return Math.log(1 + processed);
  });

  return bars;
};
