"use client";

import Cookies from 'js-cookie';

// Set authentication cookie
export const setAuthCookie = () => {
  Cookies.set('auth', 'true', { expires: 7 }); // Expires in 7 days
};

// Remove authentication cookie
export const removeAuthCookie = () => {
  Cookies.remove('auth');
};

// Check if authentication cookie exists
export const hasAuthCookie = () => {
  return !!Cookies.get('auth');
};
