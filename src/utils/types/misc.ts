import { Player } from './types1';

export type SEO = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
};
export type matchTeamGoal = {
  scorer: Player;
  time: string;
  type: string;
};
export type MatchGoals = {
  home: matchTeamGoal[];
  away: matchTeamGoal[];
};

export type Gender = 'male' | 'female';
