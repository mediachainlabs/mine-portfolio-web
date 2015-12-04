const AUTH_TOKEN_KEY = `app-auth-token:${__ENV__}`;

import injectNetworkLayer from 'app/util/injectNetworkLayer';

export const getToken = () => {
  if (!window || !window.localStorage) {
    console.error('Unable to access LocalStorage API');
    return null;
  }
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
};

export const setToken = (token) => {
  if (!window || !window.localStorage) {
    console.error('Unable to access LocalStorage API');
    return;
  }
  if (token) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

export const login = (token) => {
  setToken(token);
  injectNetworkLayer(token);
  console.log('logged in with token', token);
};

