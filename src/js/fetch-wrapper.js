import { get } from 'svelte/store';
import { user } from './user.js';

export const request = async (path, options = {}) => {
  const {
    headers,
    method = 'GET',
    body,
  } = options;

  const reqOptions = {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (get(user)) {
    reqOptions.headers.Authorization = get(user).token;
  }

  if (body) {
    reqOptions.body = typeof body === 'object' ? JSON.stringify(body) : body;
  }

  const fetchWrapper = await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, reqOptions);

  return fetchWrapper.json();
};
