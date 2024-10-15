import { useApp } from '@/contexts/AppProvider';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Match } from '../utils/types/types1';
import PredictionModal from './constants/PredictionModal';
import React from 'react';

interface Props extends Match {
  isGaming?: boolean;
}

const GameMatchCard = ({ awayTeam, homeTeam, stats, status, date, _id, category }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { userPredictions } = useApp();
  const [hasPredicted, setHasPredicted] = useState(false);
  const isNotStarted = status?.status === 'NS';
  const isFinished = status?.status === 'FT';
  const isBasketball = category === 'basketball';
  const isLive = status?.status === 'HT' || status?.status === '1H' || status?.status === '2H';
  const isForfeit = status?.status === 'FF';
  const isPostponed = status?.status === 'PS';
  const isTBD = status?.status === 'TBD';

  const awayScore = isBasketball ? stats?.awayTeamStats?.points : stats?.awayTeamStats?.goals;
  const homeScore = isBasketball ? stats?.homeTeamStats?.points : stats?.homeTeamStats?.goals;

  // const isDueDate = new Date(date).getTime() + 1000 * 60 * 90 < new Date().getTime();
  const isToday = new Date(date).getDate() === new Date().getDate();

  useEffect(() => {
    if (userPredictions) {
      const hasPredicted = userPredictions.some((prediction) => prediction.matchId === _id);
      setHasPredicted(hasPredicted);
    }
  }, [_id, userPredictions]);

  return (
    <div
      //   href={`/match/${_id}`}
      className="relative flex border-2 border-gray max-w-[300px] min-w-[200px] w-full h-[120px] rounded-md hover:bg-slate-100 duration-300"
    >
      <div className="lg:p-6 p-3 flex justify-center w-full gap-y-2 flex-col">
        <div className="flex gap-2 text-center">
          <Image src={homeTeam?.logo ?? '/images/teamImage.svg'} width={20} height={10} alt={''} />
          <p className="text-slate text-xs text-start font-bold">{homeTeam?.name}</p>
        </div>
        <div className="flex gap-2 text-center">
          <Image src={awayTeam?.logo ?? '/images/teamImage2.svg'} width={20} height={10} alt={''} />
          <p className="text-slate text-xs text-start font-bold">{awayTeam?.name}</p>
        </div>
      </div>
      <div></div>
      {(isFinished || isForfeit) && (
        <div className="flex flex-col justify-center gap-y-2 px-1 items-center">
          <span className="text-slate text-sm text-white p-1 px-2 bg-orange font-bold">{homeScore}</span>
          <span className="text-slate text-sm text-white p-1 px-2 bg-black font-bold">{awayScore}</span>
        </div>
      )}
      <span className="w-[1px] h-[80%] bg-gray mt-2"></span>
      {/* Can't play / View match result here in gaming*/}
      {isForfeit ? (
        <div className=" p-3 px-1 min-w-[80px] flex flex-col items-center justify-center">
          <span className=" text-center">{isPostponed ? 'PS' : 'FF'}</span>
          <span className="text-xs font-bold text-center text-orange">{isPostponed ? 'Postponed' : 'Forfeit'}</span>
          {
            <span className="text-xs font-bold text-center">
              {isToday ? 'Today' : <Moment format="MMM Do YYYY">{date}</Moment>}
            </span>
          }
        </div>
      ) : isTBD ? (
        <div className=" p-3 px-1 min-w-[100px] flex flex-col gap-y-2 justify-center">
          {/* <span className="text-xs font-bold text-center text-orange">{'TBD'}</span> */}
          <span className="text-xs font-bold text-center">{'To Be Confirmed'}</span>
          <button
            onClick={() => setIsOpen(true)}
            className="  right-2 top-2 text-white bg-[#2076F8] hover:bg-white duration-200 border-2 border-blue hover:text-blue rounded-3xl text-sm py-1 px-2  "
          >
            {hasPredicted ? 'Update' : 'Play'}
          </button>
        </div>
      ) : (
        <div className=" p-3 px-1 min-w-[100px] flex flex-col gap-y-2 justify-center">
          <>
            <div className="flex flex-col">
              {isFinished && <span className=" text-center">FT</span>}
              <p className="text-xs font-bold text-center">
                {isPostponed ? (
                  <span className=" text-orange">Postponed</span>
                ) : isLive ? (
                  <span className=" text-green-500">live</span>
                ) : isToday ? (
                  'Today'
                ) : (
                  <Moment format="MMM Do YYYY">{date}</Moment>
                )}
              </p>
            </div>
            <div className="flex flex-col leading-tight">
              {!isFinished && (
                <span className=" text-sm text-center">
                  <Moment format="LT">{date}</Moment>
                </span>
              )}
              <button
                onClick={() => setIsOpen(true)}
                className="  right-2 top-2 text-white bg-[#2076F8] hover:bg-white duration-200 border-2 border-blue hover:text-blue rounded-3xl text-sm py-1 px-2  "
              >
                {hasPredicted && isNotStarted ? 'Update' : isNotStarted ? 'Play' : 'View'}
              </button>
            </div>
          </>
        </div>
      )}
      {isOpen && <PredictionModal isOpen={isOpen} closeModal={() => setIsOpen(false)} matchId={_id} />}
    </div>
  );
};

export default GameMatchCard;
