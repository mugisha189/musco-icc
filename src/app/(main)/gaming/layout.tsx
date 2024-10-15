import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Fantasy - RCA-ICC',
  description: 'Join RCA-ICC fantasy league and win exciting prizes',
  openGraph: {
    type: 'website',
    images: [
      {
        url: '/api/og?image=https://cdn.sanity.io/images/lxeru4rg/2024/10e719279d59be8180d9d6c9b9d77e5345be8d46-1024x1024.png',
        alt: 'Fantasy',
        width: 800,
        height: 800,
      },
    ],
    description: 'Join RCA-ICC fantasy league and win exciting prizes',
    title: 'Fantasy - RCA-ICC',
  },
};

export default function FantasyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
