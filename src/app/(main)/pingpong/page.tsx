import Link from 'next/link';
import React from 'react';
import MainLayout from '../../../layouts/MainLayout';

const IndexPing = () => {
  return (
    <MainLayout isGeneral title="Pingpong">
      <div className=" h-full flex items-center flex-col justify-center">
        <Link
          className="text-2xl font-semibold text-center text-blue"
          href="https://challonge.com/rcatabletennis"
          target="_blank"
        >
          Go to Competition Page
        </Link>
      </div>
    </MainLayout>
  );
};

export default IndexPing;
