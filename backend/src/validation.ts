import { z } from 'zod';
import { WIDGET_IDS } from '@busybuddy/shared';

/** Zod schema mirroring the shared WaitlistRequest contract. */
export const waitlistSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('A valid email is required').max(254),
  storeUrl: z
    .string()
    .trim()
    .url('Store URL must be a valid URL')
    .max(2048)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  interestedWidgetId: z
    .string()
    .refine((v) => WIDGET_IDS.includes(v), 'Unknown widget id')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  message: z.string().trim().max(2000).optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
