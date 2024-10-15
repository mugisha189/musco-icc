import React from 'react';
import { fillLineUp } from '../../utils/funcs';
import Dummy from './Dummy';
import { LineUpType } from './LineUps';

type Props = {
  awayLineUp: LineUpType;
  homeLineUp: LineUpType;
};

const PlayerLineUp = ({ awayLineUp, homeLineUp }: Props) => {
  const homeLineUpCopy = { ...homeLineUp };
  const awayLineUpCopy = { ...awayLineUp };
  const areHOmeEleven = homeLineUp?.eleven?.length === 11;
  const areAwayEleven = awayLineUp?.eleven?.length === 11;
  const leftHome = 11 - homeLineUp?.eleven?.length;
  const leftAway = 11 - awayLineUp?.eleven?.length;
  // if (!areAwayEleven || !areHOmeEleven)
  // 	return (
  // 		<h1 className=" text-3xl font-semibold z-50 text-center">
  // 			LineUps not available yet because one of the teams/both are/is missing some players
  // 		</h1>
  // 	);
  if (!areAwayEleven) {
    awayLineUpCopy.eleven = fillLineUp(awayLineUpCopy?.eleven, leftAway);
  }
  if (!areHOmeEleven) {
    homeLineUpCopy.eleven = fillLineUp(homeLineUpCopy?.eleven, leftHome);
  }

  const homeDefenders = homeLineUpCopy?.eleven.filter((player) => player.position?.includes('defender'));
  const homeMidfielders = homeLineUpCopy?.eleven.filter((player) => player.position?.includes('midfielder'));
  const homeForwards = homeLineUpCopy?.eleven.filter((player) => player.position?.includes('forward'));
  const awayDefenders = awayLineUpCopy?.eleven.filter((player) => player.position?.includes('defender'));
  const awayMidfielders = awayLineUpCopy?.eleven.filter((player) => player.position?.includes('midfielder'));
  const awayForwards = awayLineUpCopy?.eleven.filter((player) => player.position?.includes('forward'));
  const homeGoalkeeper = homeLineUpCopy?.eleven.find((player) => player.position?.includes('goalkeeper'));
  const awayGoalkeeper = awayLineUpCopy?.eleven.find((player) => player.position?.includes('goalkeeper'));
  return (
    <>
      {homeLineUp.eleven?.length > 0 ? (
        <div className="h-1/2 w-full flex-col flex p-2 justify-between">
          <div className="flex items-center justify-center">
            <PlayerBox name="Player 1" color={`#ff7b35`} {...homeGoalkeeper} id="1" />
          </div>
          <div
            className={`grid grid-cols-${homeDefenders.length} w-full`}
            style={{ gridTemplateColumns: `repeat(${homeDefenders.length}, 1fr)` }}
          >
            {homeDefenders.map((player, i) => (
              <PlayerBox key={i} name="Player 2" color={`#ff7b35`} {...player} id={i} />
            ))}
          </div>
          <div
            className={`grid grid-cols-${homeMidfielders.length} w-full`}
            style={{ gridTemplateColumns: `repeat(${homeMidfielders.length}, 1fr)` }}
          >
            {homeMidfielders.map((player, i) => (
              <PlayerBox key={i} name="Player 6" color={`#ff7b35`} {...player} id={i} />
            ))}
          </div>
          <div
            className={`grid grid-cols-${homeForwards.length} w-full`}
            style={{ gridTemplateColumns: `repeat(${homeForwards.length}, 1fr)` }}
          >
            {homeForwards.map((player, i) => (
              <PlayerBox key={i} name="Player 9" color={`#ff7b35`} {...player} id={i} />
            ))}
          </div>
        </div>
      ) : (
        <Dummy isAway={false} />
      )}
      {awayLineUp.eleven?.length > 0 ? (
        <div className="h-1/2 w-full flex-col-reverse flex p-2 justify-between">
          <div className="flex items-center justify-center">
            <PlayerBox name="Player 1" color={`#000`} number="1" {...awayGoalkeeper} />
          </div>
          <div
            className={`grid grid-cols-${awayDefenders.length} w-full`}
            style={{ gridTemplateColumns: `repeat(${awayDefenders.length}, 1fr)` }}
          >
            {awayDefenders.map((player, i) => (
              <PlayerBox key={i} name="Player 2" color={`#000`} {...player} id={i} />
            ))}
          </div>
          <div
            className={`grid grid-cols-${awayMidfielders.length} w-full`}
            style={{ gridTemplateColumns: `repeat(${awayMidfielders.length}, 1fr)` }}
          >
            {awayMidfielders.map((player, i) => (
              <PlayerBox key={i} name="Player 6" color={`#000`} {...player} id={i} />
            ))}
          </div>
          <div
            className={`grid grid-cols-${awayForwards.length} w-full`}
            style={{ gridTemplateColumns: `repeat(${awayForwards.length}, 1fr)` }}
          >
            {awayForwards.map((player, i) => (
              <PlayerBox key={i} name="Player 9" color={`#000`} {...player} id={i} />
            ))}
          </div>
        </div>
      ) : (
        <Dummy isAway={true} />
      )}
    </>
  );
};

export default PlayerLineUp;

export const PlayerBox = ({ name, number, color, displayName }: any) => (
  <div className="flex flex-col items-center text-white mx-auto z-10 cursor-pointer">
    <span
      style={{
        backgroundColor: color,
      }}
      className={`border-2 border-white w-11 aspect-square rounded-full flex items-center justify-center p-2`}
    >
      <span className="">{number ?? Math.ceil(Math.random() * 99)}</span>
    </span>
    <span className="">{displayName ?? name}</span>
  </div>
);
