import express from 'express';
// import our controllers
import tweetsController from '../controllers/tweetsController.js';

// tweetsRoutes is an instance of the express router
// use it to define our routes
// the router will be added as a middleware and will take control of requests starting with a specific path
const tweetsRoutes = express.Router();

/// TWEETS ROUTES ///

// create a new user tweet

tweetsRoutes.post('/api/user/tweet', tweetsController.createNewUserTweet);

// update an user tweet

tweetsRoutes.put('/api/user/tweet/:tweetId', tweetsController.updateNewUserTweet);

// get all user tweets

tweetsRoutes.get('/api/user/:userId/tweets', tweetsController.getAllUserTweets);

// delete a user tweet

tweetsRoutes.delete('/api/user/tweet/:tweetId/delete', tweetsController.deleteUserTweet);

export default tweetsRoutes;
