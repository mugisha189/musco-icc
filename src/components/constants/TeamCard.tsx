import React from 'react';
import Image from 'next/image';
import { BiBasketball, BiFootball } from 'react-icons/bi';
import { Team } from '../../utils/types/types1';
import { GiVolleyballBall } from 'react-icons/gi';
import Link from 'next/link';

const TeamCard = ({ _id, name, category, logo }: Team) => {
  return (
    <Link
      href={`/team/${_id}`}
      className="flex max-w-[300px] justify-between cursor-pointer w-full items-center gap-x-2 h-[100px] rounded-md border-2 border-gray p-4 hover:bg-slate-100 duration-500 g-4 m-2"
    >
      <div className="flex items-center gap-x-3">
        <Image src={logo || '/images/teamImage2.svg'} width={40} height={10} alt="" />
        <div className="flex flex-col">
          <p className="text-slate font-bold ">{name}</p>
          <span className="text-sm text-slate-500 capitalize">{category}</span>
        </div>
      </div>
      {category === 'football' ? (
        <BiFootball className="text-2xl text-center" />
      ) : category === 'basketball' ? (
        <BiBasketball className="text-2xl text-center" />
      ) : category === 'volleyball' ? (
        <GiVolleyballBall className="text-2xl text-center" />
      ) : null}
    </Link>
  );
};

export default TeamCard;
