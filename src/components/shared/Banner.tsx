import React from 'react';

interface Props {
  message: React.ReactNode;
}

const Banner = ({ message }: Props) => {
  return (
    <div
      className="px-2 tab:flex hidden 
    md:max-w-full min-w-0 text-center "
    >
      {message}
    </div>
  );
};

export default Banner;
