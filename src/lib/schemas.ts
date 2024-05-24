import { maxLength, minLength, object, string } from 'valibot';

export const saveWallEntrySchema = object({
  user_message: string([
    minLength(2, 'Wall Entry must be at least 2 characters.'),
    maxLength(80, 'Wall Entry cannot be more than 80 characters.'),
  ]),
});
