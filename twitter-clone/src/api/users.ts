import { UserInfo } from '../models';

export const addUserAccount = async (newUser: UserInfo) => {
  await fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: { 'Content-Type': 'application/json' },
  }).catch((error) => {
    console.log(`Error: ${error}`);
    return;
  });
};
