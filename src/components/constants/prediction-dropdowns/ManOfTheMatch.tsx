import { useState } from 'react';
import { BiSolidChevronUp } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa';
import { Match, Player } from '../../../utils/types/types1';

import { Collapse, Tabs } from '@mantine/core';
import Image from 'next/image';
interface Props {
  match: Match;
  onChange: (player: Player) => void;
  prevData?: Player;
  disabled?: boolean;
}

const ManOfTheMatch = ({ match, onChange, prevData, disabled }: Props) => {
  const [dropActive, setDropActive] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(prevData ?? null);

  const onChangePlayer = (player: Player) => {
    if (disabled) return;
    setSelectedPlayer(player);
    onChange(player);
  };

  return (
    <div className=" max-sm:w-full h-fit p-2 border-b border-slate-300 cursor-pointer  ">
      <div onClick={() => setDropActive(!dropActive)} className="flex justify-between items-center">
        <p className="font-semibold text-sm text-warmGray-700">
          2. Player Of the Match
          <span className=" font-bold ml-5 text-blue">
            ({selectedPlayer?.displayName ?? selectedPlayer?.fullName ?? 'Click To Choose'})
          </span>
        </p>
        {dropActive ? (
          <div className="">
            <BiSolidChevronUp
              onClick={() => {
                console.log(dropActive);
                setDropActive(!dropActive);
              }}
              className=" font-bold "
            />
          </div>
        ) : (
          <div className="bg-[#2076F8] p-1 rounded-lg">
            <FaPlus
              // onClick={() => {
              //   console.log(dropActive);
              // }}
              className=" font-bold text-sm text-white"
            />
          </div>
        )}
      </div>
      <Collapse in={dropActive} className="mt-2">
        <Tabs defaultValue={'awayTeam'}>
          <Tabs.List>
            <Tabs.Tab value="homeTeam">{match.homeTeam.name}</Tabs.Tab>
            <Tabs.Tab value="awayTeam">{match.awayTeam.name}</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="homeTeam">
            <div className="flex flex-wrap justify-between gap-2 mt-2 text-sm text-slate-500 text-left p-2 ">
              {match.homeTeam?.players.map((player, i) => (
                <SelectablePlayer
                  key={player._id ?? i}
                  player={player}
                  onChange={onChangePlayer}
                  isActive={selectedPlayer?._id === player._id}
                />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="awayTeam">
            <div className="flex flex-wrap justify-between gap-2 mt-2 text-sm text-slate-500 text-left p-2 ">
              {match.awayTeam?.players.map((player, i) => (
                <SelectablePlayer
                  key={player._id ?? i}
                  player={player}
                  onChange={onChangePlayer}
                  isActive={selectedPlayer?._id === player._id}
                />
              ))}
            </div>
          </Tabs.Panel>
        </Tabs>
      </Collapse>
    </div>
  );
};

export const SelectablePlayer = ({
  player,
  isActive,
  onChange,
}: {
  player: Player;
  isActive: boolean;
  onChange: (p: Player) => void;
}) => {
  return (
    <div
      onClick={() => onChange(player)}
      className={`flex flex-col items-center cursor-pointer border-2
      ${isActive ? ' ring-blue ring-1 bg-blue/30' : 'border-gray'}
     `}
    >
      <Image
        src={player.profile || '/images/player.png'}
        width={120}
        height={100}
        className="bg-gray object-cover w-[120px] h-[120px]"
        alt={player.displayName}
      />
      <p className="text-left font-bold ">{player.displayName}</p>
      {/* {player.position?.map((pos, key) => (
        <p key={key} className="text-left capitalize font-bold text-slate-600 text-xs">
          {pos}
        </p>
      ))} */}
      <p key={'key'} className="text-center capitalize font-bold text-slate-600 text-xs">
        {player.fullName}
      </p>
    </div>
  );
};

export default ManOfTheMatch;
