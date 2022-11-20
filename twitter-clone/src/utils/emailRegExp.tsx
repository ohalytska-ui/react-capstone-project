// This is the Auth0 email validation regular expression, taken from: https://github.com/auth0/lock/blob/4aaefa4a9ed00423e665e0743a7b0a952c6a267d/src/field/email.js#L7.
export const emailRegExp = RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);
