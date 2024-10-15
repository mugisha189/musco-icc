import { UserPrediction } from '@prisma/client';
import { Match } from '../types/types1';
import { RefType } from '../types/types2';

/**
 * Calculate user points
 * @param {UserPrediction} userPrediction
 * @param {Match} match
 * @returns A summary of the user points and the components that contributed to the points
 */
export const calculateUserPoints = (userPrediction: UserPrediction, match: Match) => {
  const { homeTeam, awayTeam, stats, fantasy, category } = match;
  const isBasketball = category === 'basketball';
  const isFootball = category === 'football';
  // const isVolleyb

  // Points handlers
  let userPoints = 0;
  let correctOutcome = 0;
  let correctManOfTheMatch = 0;
  let correctFirstTeamToScore = 0;
  let correctHighestScoringPlayer = 0;
  let correctHomeScore = { points: 0, scoreAway: 0 };
  let correctAwayScore = { points: 0, scoreAway: 0 };
  let correctScore = 0;

  //* compare score and update
  const homeTeamScore = isBasketball ? stats.homeTeamStats.points : stats.homeTeamStats.goals;
  const awayTeamScore = isBasketball ? stats.awayTeamStats.points : stats.awayTeamStats.goals;
  const userHomeScore = userPrediction.prediction.homeScore;
  const userAwayScore = userPrediction.prediction.awayScore;

  //* handle user score points. if user predicted the correct score + 6 points
  const homeTeamPoints = calculateScorePoints(userHomeScore, homeTeamScore, category);
  const awayTeamPoints = calculateScorePoints(userAwayScore, awayTeamScore, category);
  userPoints += homeTeamPoints.points + awayTeamPoints.points;
  correctHomeScore = homeTeamPoints;
  correctAwayScore = awayTeamPoints;

  //* if user predicted the correct winner or correct draw + 5 points
  const winnerOrDraw =
    homeTeamScore === awayTeamScore ? 'draw' : homeTeamScore > awayTeamScore ? homeTeam._id : awayTeam._id;
  const userWinnerOrDraw =
    userHomeScore === userAwayScore ? 'draw' : userHomeScore > userAwayScore ? homeTeam._id : awayTeam._id;
  if (winnerOrDraw === userWinnerOrDraw) {
    userPoints += 5;
    correctOutcome = 5;
  }

  //* if user predicted the correct score + 3 points
  if (userHomeScore === homeTeamScore && userAwayScore === awayTeamScore) {
    userPoints += 3;
    correctScore = 3;
  }

  //* if user predicted the correct man of the match + 10 points
  if (userPrediction.prediction.manOfTheMatch === (fantasy.manOfTheMatch as RefType)._ref) {
    userPoints += 10;
    correctManOfTheMatch = 10;
  }
  //* if user predicted the correct first team to score + 6 points and is football/volleyball
  const isCorrectFirstTeamToScore =
    userPrediction.prediction.firstTeamToScore === (fantasy.firstTeamToScore as RefType)?._ref;
  const correctNoFirstTeamToScore =
    isFootball && !userPrediction.prediction?.firstTeamToScore && !fantasy.firstTeamToScore;
  if (!isBasketball && (isCorrectFirstTeamToScore || correctNoFirstTeamToScore)) {
    userPoints += 6;
    correctFirstTeamToScore = 6;
  }
  //* if user predicted the correct highest scoring player + 5 points an is basketball
  if (
    isBasketball &&
    userPrediction.prediction.highestScoringPlayer === (fantasy.highestScoringPlayer as RefType)._ref
  ) {
    userPoints += 10;
    correctHighestScoringPlayer = 10;
  }
  return {
    userPoints,
    components: {
      correctOutcome,
      correctManOfTheMatch,
      correctFirstTeamToScore,
      correctHighestScoringPlayer,
      correctHomeScore,
      correctAwayScore,
      correctScore,
    },
  };
};

function calculateScorePoints(
  userScore: number,
  actualScore: number,
  category: string,
): { points: number; scoreAway: number } {
  const isBasketball = category === 'basketball';
  const isVolleyball = category === 'volleyball';
  if (isNaN(userScore)) return { points: 0, scoreAway: 0 };
  let points = 0;
  const scoreAway = Math.abs(userScore - actualScore);
  if (userScore === actualScore) {
    points += isVolleyball ? 4 : 6; // Because volleyball sets are easier to predict
  } else if (Math.abs(userScore - actualScore) <= 4 && isBasketball) {
    const pointsAway = 5 - Math.abs(userScore - actualScore); // 5 (6-1) because to give credit to one with exact answer i.e gets 1 bonus points
    points += pointsAway;
  }

  return { points, scoreAway };
}
