import { useState } from 'react';
import { BiSolidChevronUp } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa';
import { Match, Team } from '../../../utils/types/types1';
import { TbBallFootballOff } from 'react-icons/tb';
import { Collapse } from '@mantine/core';
import Image from 'next/image';

interface Props {
  match: Match;
  onChange: (team: Team | null | string) => void;
  prevData?: Team;
  disabled?: boolean;
}

const FirstToScore = ({ match, onChange, prevData, disabled }: Props) => {
  const [dropActive, setDropActive] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null | string>(prevData ?? null);
  const isFootball = match.category === 'football';

  const onChangeTeam = (team: Team | null | string) => {
    if (disabled) return;
    setSelectedTeam(team);
    onChange(team);
  };

  const getSelectedTeam = (team: Team | null | string) => {
    if (team === 'none') return 'No One';
    return (team as Team)?.name ?? (team as Team)?.name ?? 'Click To Choose';
  };

  return (
    <div className=" max-sm:w-full h-fit p-2 border-b border-slate-300 cursor-pointer  ">
      <div onClick={() => setDropActive(!dropActive)} className="flex justify-between items-center">
        <p className="font-semibold text-sm text-warmGray-700">
          3. First Team To Score (Goal/Set)
          <span className=" font-bold ml-5 text-blue">({getSelectedTeam(selectedTeam)})</span>
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
        <div className="flex flex-wrap justify-between mt-2 text-sm text-slate-500 text-left p-2 ">
          <SelectableTeam
            team={match.homeTeam}
            logo={match.homeTeam.logo ?? '/images/teamImage.svg'}
            isActive={(selectedTeam as Team)?._id === match.homeTeam._id}
            onChange={onChangeTeam}
          />
          {/* none of them for football */}
          {isFootball ? (
            <div
              onClick={() => onChangeTeam('none')}
              className={`flex flex-col items-center cursor-pointer border-2
            ${selectedTeam === null || selectedTeam === 'none' ? ' ring-blue ring-1 bg-blue/30' : 'border-gray'}`}
            >
              <TbBallFootballOff width={120} height={100} className="bg-gray object-cover w-[120px] h-[120px]" />
              <p className="text-left font-bold mt-1">No One</p>
              <p className="text-left capitalize font-bold text-slate-600 text-xs mb-1">No Goal</p>
            </div>
          ) : (
            <span className=" text-2xl font-semibold my-auto">OR</span>
          )}
          <SelectableTeam
            logo={match.awayTeam.logo ?? '/images/teamImage2.svg'}
            team={match.awayTeam}
            isActive={(selectedTeam as Team)?._id === match.awayTeam._id}
            onChange={onChangeTeam}
          />
        </div>
      </Collapse>
    </div>
  );
};

export const SelectableTeam = ({
  team,
  logo,
  isActive,
  onChange,
}: {
  team: Team;
  logo: string;
  isActive: boolean;
  onChange: (t: Team) => void;
}) => {
  return (
    <div
      onClick={() => onChange(team)}
      className={`flex flex-col items-center cursor-pointer border-2
      ${isActive ? ' ring-blue ring-1 bg-blue/30' : 'border-gray'}
     `}
    >
      <Image src={logo} width={120} height={100} className="bg-gray object-cover w-[120px] h-[120px]" alt={team.name} />
      <p className="text-left font-bold mt-1">{team.name}</p>
      <p className="text-left capitalize font-bold text-slate-600 text-xs mb-1">{team.category}</p>
    </div>
  );
};

export default FirstToScore;
