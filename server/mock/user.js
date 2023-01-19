import crypto from 'crypto';

export const user = {
  id: crypto.randomBytes(20).toString('hex'),
  email: crypto.randomBytes(20).toString('hex'),
  username: crypto.randomBytes(20).toString('hex'),
  password: crypto.randomBytes(20).toString('hex'),
  fullname: crypto.randomBytes(20).toString('hex'),
};
