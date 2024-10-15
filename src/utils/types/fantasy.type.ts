import { User, UserOverallScore } from '@prisma/client';

export interface UserPrediction {
  prediction: Prediction;
  id: string;
  userId: string;
  matchId: string;
  status: string;
  points: number;
  seasonId: string;
  matchCategory: string;
}

export interface Prediction {
  manOfTheMatch: string;
  firstTeamToScore: string;
  homeScore: number;
  awayScore: number;
  highestScoringPlayer: string;
}

export interface Standing extends UserOverallScore {
  user: User;
  rank?: number;
}

export interface OldStanding {
  user_id: string;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  mis_id: string;
  score: number;
  matchesPredicted: number;
}
