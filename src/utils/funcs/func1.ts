import { Gender } from '../types/misc';
import { Player } from '../types/types1';

export type PRankeAble = Player & { rank: string };

type RankableKEYS = 'goals' | 'rebounds' | 'blocks' | 'footballAssists' | 'points' | 'basketballAssists';

export const rankPlayers = (players: Player[], key: RankableKEYS) => {
  // rank player according to high value in key
  const sortedPlayers = players.sort((a, b) => b[key] - a[key]);

  // add rank to each player
  const rankedPlayers = sortedPlayers.map((player, index) => {
    return {
      ...player,
      rank: `${index + 1}`,
    };
  });

  // give the same rank to players with same value in key
  let rank = 1;
  for (let i = 0; i < rankedPlayers.length; i++) {
    if (i === 0) {
      rankedPlayers[i].rank = `${rank}`;
    } else {
      if (rankedPlayers[i][key] === rankedPlayers[i - 1][key]) {
        rankedPlayers[i].rank = `${rank}`;
      } else {
        rank = i + 1;
        rankedPlayers[i].rank = `${rank}`;
      }
    }
  }

  return rankedPlayers as PRankeAble[];
};

/**
 * Get the dataset from the year
 * @param year
 * @returns
 */
export const getDataSetFromYear = (year: string) => {
  return year === '2023' ? 'production' : `${year}`;
};

/**
 * Get the year from the dataset
 * @param dataSet
 * @returns
 */
export const getYearFromDataSet = (dataSet: string) => {
  return dataSet === 'production' ? '2023' : dataSet;
};

export const genderColor = (gender: Gender) => {
  return gender === 'male' ? 'blue' : 'pink';
};
