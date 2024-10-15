import { Metadata } from 'next';
import React from 'react';
import '../styles/globals.css';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'RCA-ICC',
  description: 'RCA-ICC- Home of all RCA interclass Competitions',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  openGraph: {
    type: 'website',
    images: [{ url: `/api/og`, alt: 'RCA-ICC', width: 800, height: 600 }],
    description: 'Welcome to RCA interclass Competition Website, where education and competition go hand in hand.',
    title: 'RCA-ICC- Home of all RCA interclass Competitions',
    emails: ['ndungutsecharles103@gmail.com'],
  },
};

const RootLayout = ({ children }: Props) => {
  return (
    <html>
      <head>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
