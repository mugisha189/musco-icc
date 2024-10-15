import Image from 'next/image';
import Link from '@/components/core/Link';
import Moment from 'react-moment';
import { Match } from '../utils/types/types1';
import { Badge } from '@mantine/core';
import { genderColor } from '@/utils/funcs/func1';

const MatchCard = (match: Match) => {
  const { awayTeam, homeTeam, stats, status, date, _id, category, gender } = match;
  const isFinished = status?.status === 'FT';
  const isBasketball = category === 'basketball';
  const isLive = status?.status === 'HT' || status?.status === '1H' || status?.status === '2H';
  const isForfeit = status?.status === 'FF';
  const isPostponed = status?.status === 'PS';
  const isTBD = status?.status === 'TBD';

  const awayScore = isBasketball ? stats?.awayTeamStats?.points : stats?.awayTeamStats?.goals;
  const homeScore = isBasketball ? stats?.homeTeamStats?.points : stats?.homeTeamStats?.goals;

  const isDueDate = new Date(date).getTime() + 1000 * 60 * 90 < new Date().getTime();
  const isToday = new Date(date).getDate() === new Date().getDate();
  // console.log('match', match);
  return (
    <Link
      href={`/match/${_id}`}
      className="relative flex border-2 border-gray max-w-[300px] min-w-[200px] w-full h-[120px] rounded-md hover:bg-slate-100 duration-300 cursor-pointer"
    >
      <Badge color={genderColor(gender)} className="absolute top-1 right-1">
        {gender}
      </Badge>
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
      {isFinished || isForfeit || isPostponed || isTBD ? (
        <div className=" p-3 px-1 min-w-[80px] flex flex-col items-center justify-center">
          <span className=" text-center">{status.status}</span>
          {isForfeit || isPostponed || isTBD ? (
            <span className="text-xs font-bold text-center text-orange">
              {isPostponed ? 'Postponed' : isForfeit ? 'Forfeit' : 'To Be Confirmed'}
            </span>
          ) : (
            <span className="text-xs font-bold text-center">
              {isToday ? 'Today' : isTBD ? null : <Moment format="MMM Do YYYY">{date}</Moment>}
            </span>
          )}
        </div>
      ) : (
        <div className=" p-3 px-1 min-w-[100px] flex flex-col gap-y-2 justify-center">
          {isDueDate && !isLive ? (
            <p className=" text-orange text-sm text-center font-semibold">Postponed</p>
          ) : (
            <>
              <p className="text-xs font-bold text-center">
                {isLive ? (
                  <span className=" text-green-500">live</span>
                ) : isToday ? (
                  'Today'
                ) : (
                  <Moment format="MMM Do YYYY">{date}</Moment>
                )}
              </p>
              {isLive ? (
                <div className="flex flex-col justify-center gap-y-2 px-1 items-center">
                  <span className="text-slate text-sm text-white p-1 px-2 bg-orange font-bold">{homeScore ?? 0}</span>
                  <span className="text-slate text-sm text-white p-1 px-2 bg-black font-bold">{awayScore ?? 0}</span>
                </div>
              ) : (
                <span className=" text-sm text-center">
                  <Moment format="LT">{date}</Moment>
                </span>
              )}
            </>
          )}
        </div>
      )}
    </Link>
  );
};

export default MatchCard;
