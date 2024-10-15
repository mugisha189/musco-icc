import React from 'react';

const Stats = () => {
  const players = [
    {
      name: 'SHUMBUSHO David',
      goals: 6,
      number: 1,
    },
    {
      name: 'NDUNGUTSE Charles',
      goals: 6,
      number: 1,
    },
    {
      name: 'DABAGIRE Valens',
      goals: 4,
      number: 2,
    },
    {
      name: 'Messi',
      goals: 3,
      number: 3,
    },
    {
      name: 'Zesta',
      goals: 2,
      number: 4,
    },
  ];
  return (
    <div className="w-full h-fit relative">
      <div className="float-left font-bold text-lg">
        <h3>Goals</h3>
      </div>
      {players.map((player, i) => {
        return (
          <div key={i} className="w-full border-b-2 border-gray  flex  gap-2 mt-10 justify-between">
            <span className="text-sm font-bold">{player.number}</span>
            <p className="text-sm font-bold absolute left-8">{player.name}</p>
            <div className=" bg-gray w-[30px] h-6 text-slate-700 rounded-md text-center">
              <p className=" ">{player.goals}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
