import { notification } from 'antd';
import { Tweet } from '../models';

// create a new user tweet

export const createNewUserTweet = async (tweet: Tweet) => {
  const res = await fetch('/api/user/tweet', {
    method: 'POST',
    body: JSON.stringify(tweet),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    notification.error({
      message: 'Could not create new tweet.',
      description: 'Try once more time!',
    });
  }
  if (res.ok) {
    notification.success({
      message: 'Successfully cereate new tweet.',
      description: 'Try once more time!',
    });
  }
  return res.ok;
};

// get all user tweets

export const getAllUserTweets = async (userId: string) => {
  const res = await fetch(`/api/user/${userId}/tweets`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const tweets = await res.json();

  if (!res.ok) {
    notification.error({
      message: 'Tweets for this user does not exist.',
      description: 'Try once more time!',
    });
  }
  return tweets;
};

// delete a user tweet

export const deleteUserTweet = async (tweetId?: string) => {
  const res = await fetch(`/api/user/tweet/${tweetId}/delete`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    notification.error({
      message: 'Can not delete this tweet.',
      description: 'Try once more time!',
    });
  }
  if (res.ok) {
    notification.success({
      message: 'Successfully deleted tweet.',
      description: 'Try once more time!',
    });
  }
  return res.ok;
};

// update user tweet
export const updateUserTweet = async (tweetId: string, tweetText: string) => {
  const message = {
    tweetText: tweetText,
  };
  const res = await fetch(`/api/user/tweet/${tweetId}`, {
    method: 'PUT',
    body: JSON.stringify(message),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    notification.error({
      message: 'Could not update your tweet.',
      description: 'Try once more time!',
    });
  }
  if (res.ok) {
    notification.success({
      message: 'Successfully updated your tweet.',
      description: 'Try once more time!',
    });
  }
  return res.ok;
};
