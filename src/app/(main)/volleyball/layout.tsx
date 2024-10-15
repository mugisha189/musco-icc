import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Volleyball - RCA-ICC',
  description: 'View all volleyball matches and teams',
  openGraph: {
    type: 'website',
    description: 'View all volleyball matches and teams',
    title: 'Volleyball - RCA-ICC',
  },
};

export default function VolleyballLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
