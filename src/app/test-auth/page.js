"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { hasAuthCookie } from '@/utils/cookies';
import Link from 'next/link';

export default function TestAuth() {
  const { user, logout } = useAuth();
  const [cookieStatus, setCookieStatus] = useState('Checking...');
  
  useEffect(() => {
    // Check if auth cookie exists
    const hasCookie = hasAuthCookie();
    setCookieStatus(hasCookie ? 'Auth cookie exists' : 'No auth cookie found');
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Authentication Test Page</h1>
        
        <div className="space-y-4">
          <div className="p-4 border rounded-md">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Auth Cookie Status:</h2>
            <p className={`mt-2 ${cookieStatus.includes('exists') ? 'text-green-600' : 'text-red-600'}`}>
              {cookieStatus}
            </p>
          </div>
          
          <div className="p-4 border rounded-md">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User Context Status:</h2>
            {user ? (
              <div className="mt-2 text-green-600">
                <p><strong>Logged in as:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>ID:</strong> {user.id}</p>
              </div>
            ) : (
              <p className="mt-2 text-red-600">No user in context</p>
            )}
          </div>
        </div>
        
        <div className="flex flex-col space-y-4 mt-8">
          {user ? (
            <button
              onClick={logout}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Login
            </Link>
          )}
          
          <Link
            href="/"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
