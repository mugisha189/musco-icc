import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Football - RCA-ICC',
  description: 'View all football matches and teams',
};

export default function FootballLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
