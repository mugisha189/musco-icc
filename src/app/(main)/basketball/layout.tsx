import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Basketball - RCA-ICC',
  description: 'View all Basketball matches and teams',
};

export default function BasketballLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
