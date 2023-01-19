import crypto from 'crypto';
import { user } from './user.js';

export const tweet = {
  id: 'test',
  tweetText: crypto.randomBytes(20).toString('hex'),
  userId: user?.id,
  fullname: user?.fullname,
};
