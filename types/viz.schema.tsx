import { z } from 'zod';
import { zColor } from '@remotion/zod-types';

export const VizSchema = z.object({
	waveColor: zColor(),
	mirrorWave: z.boolean(),
	waveLinesToDisplay: z.number().int().min(0),
	waveFreqRangeStartIndex: z.number().int().min(0),
	waveNumberOfSamples: z.union([
		z.literal(32),
		z.literal(64),
		z.literal(128),
		z.literal(256),
		z.literal(512),
	]),
});

export type VizSchemaType = z.infer<typeof VizSchema>;
