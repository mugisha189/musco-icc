import Link from '@/components/core/Link';
import React from 'react';

const NotFound = () => {
  return (
    <div className="w-full flex h-screen justify-center items-center flex-col">
      <h1 className=" text-[10em] font-black">404</h1>
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white bg-orange font-bold py-2 px-4 rounded mt-4">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
