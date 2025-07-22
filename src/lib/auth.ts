// lib/auth.ts

import { NextApiResponse, NextApiRequest } from 'next';
import { GetServerSidePropsContext } from 'next';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export function setTokenCookie(res: NextApiResponse, token: string) {
  res.setHeader('Set-Cookie', cookie.serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
    path: '/',
  }));
}

export function getTokenFromCookie(req: NextApiRequest): string | null {
  const cookies = cookie.parse(req.headers.cookie || '');
  return cookies.token || null;
}

export function getTokenFromServerSideProps(context: GetServerSidePropsContext): string | null {
  const cookies = cookie.parse(context.req.headers.cookie || '');
  return cookies.token || null;
}

export function removeTokenCookie(res: NextApiResponse) {
  res.setHeader('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0),
    sameSite: 'lax',
    path: '/',
  }));
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function requireAuth(context: GetServerSidePropsContext) {
  const token = getTokenFromServerSideProps(context);
  if (!token) {
    return {
      redirect: { destination: '/login', permanent: false },
    };
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return {
      redirect: { destination: '/login', permanent: false },
    };
  }

  return { props: { user: decoded } };
}

export function redirectIfAuthenticated(context: GetServerSidePropsContext) {
  const token = getTokenFromServerSideProps(context);
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      return {
        redirect: { destination: '/dashboard', permanent: false },
      };
    }
  }
  return { props: {} };
}
