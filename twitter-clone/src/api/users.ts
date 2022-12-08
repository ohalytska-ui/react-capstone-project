import { UserInfo, UserProfile } from '../models';
import { notification } from 'antd';

// add new user
export const addNewUserAccount = async (newUser: UserInfo) => {
  const isSuccess = await fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!isSuccess.ok) {
    notification.error({
      message: 'Profile could not be created.',
      description: 'Not unique email or username!',
    });
  }
  if (isSuccess.ok) {
    notification.success({
      message: 'Profile created successfully.',
      description: 'Try to log in!',
    });
  }
  return isSuccess.ok;
};

// log in into user account
export const logInToUserAccount = async (userProfile: UserProfile) => {
  const isSuccess = await fetch(`/api/login/${userProfile.username}/${userProfile.password}`);
  if (!isSuccess.ok) {
    notification.error({
      message: 'This profile does not exist.',
      description: 'Try again or sign up!',
    });
  }
  if (isSuccess.ok) {
    notification.success({
      message: 'Successfully log in.',
      description: 'Try to use your profile!',
    });
  }
  return isSuccess.ok;
};
