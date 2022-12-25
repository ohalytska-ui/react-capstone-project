import { UserInfo, UserProfile } from '../models';
import { notification } from 'antd';

// add new user
export const addNewUserAccount = async (newUser: UserInfo) => {
  const res = await fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: { 'Content-Type': 'application/json' },
  });
  const token = await res.json();

  if (!res.ok) {
    notification.error({
      message: 'Profile could not be created.',
      description: 'Not unique email or username!',
    });
  }
  if (res.ok) {
    notification.success({
      message: 'Profile created successfully.',
      description: 'Try to log in!',
    });
  }
  return token;
};

// log in into user account
export const logInToUserAccount = async (userProfile: UserProfile) => {
  const res = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(userProfile),
    headers: { 'Content-Type': 'application/json' },
  });
  const token = await res.json();

  if (!res.ok) {
    notification.error({
      message: 'This profile does not exist.',
      description: 'Try again or sign up!',
    });
  }
  if (res.ok) {
    notification.success({
      message: 'Successfully log in.',
      description: 'Try to use your profile!',
    });
  }
  return token;
};

// get user from db
export const getUserAccountInfo = async (token: string) => {
  const res = await fetch('/api/user', {
    method: 'GET',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
  });
  const user = await res.json();

  if (!res.ok) {
    notification.error({
      message: 'This user does not exist.',
      description: 'Try once more time!',
    });
  }
  return user;
};
