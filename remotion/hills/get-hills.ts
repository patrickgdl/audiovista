import { processAudioFftValue } from "../../helpers/audio";

interface GetHillsOptions {
  numberOfBumps?: number;
  frequencyData: number[];
  maxDb?: number;
  minDb?: number;
}

export const getHills = ({
  numberOfBumps = 8,
  frequencyData,
  maxDb = -30,
  minDb = -80,
}: GetHillsOptions) => {
  const nPoints = numberOfBumps;

  const start = Math.floor(0.2 * frequencyData.length);
  const end = Math.floor(0.6 * frequencyData.length);
  const samples = frequencyData.slice(start, end);
  const sampleStep = Math.floor(samples.length / nPoints);
  const amplitudes = Array.from({ length: nPoints }).map((_, i) => {
    const processed = processAudioFftValue(
      samples[(i * sampleStep) % samples.length],
      { maxDb, minDb }
    );

    return processed;
  });

  return amplitudes;
};
