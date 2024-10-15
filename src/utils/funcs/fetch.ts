import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    return decoded as { email: string; iat: number; exp: number; userId: string; role: string };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFile = (fileName: string | null | undefined) =>
  fileName ? `http://194.163.167.131:6543/api/v1/files/${fileName}` : null;

/**
 * Creates user from token if not user exists
 * @param token
 * @returns
 */
export const createUserFromToken = async (token: string) => {
  try {
    const res = await fetch('/api/users/create-from-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    console.log('res Create', res);
  } catch (error) {
    console.log(error);
  }
};

export const getResError = (error?: any, defaultMs: string = 'Something Went Wrong') => {
  if (!error) return defaultMs;
  const isNetError = error?.message?.includes('Network Error');
  if (isNetError) return 'Network Error';
  return error?.response?.data?.message ?? error?.message ?? defaultMs;
};

export const botApi = axios.create({
  baseURL: process.env.ICC_BOT_URL,
});
