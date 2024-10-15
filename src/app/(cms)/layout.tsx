import React from 'react';
import { Poppins } from 'next/font/google';

export const metadata = {
  title: 'Studio Admin - ICC CMS Portal',
  description: 'RCA-ICC- Home of all RCA interclass Competitions',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
