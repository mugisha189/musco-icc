import { Gender } from './misc';
import { RefType, TimeType } from './types2';

export type Player = {
  _id: string;
  displayName: string;
  fullName: string;
  profile: string;
  goals: number;
  footballAssists: number;
  basketballAssists: number;
  steals: number;
  blocks: number;
  rebounds: number;
  points: number;
  fouls: number;
  redCards: number;
  yellowCards: number;
  number: number;
  position: string[];
  gender?: Gender;
  team?: string;
};

export enum category {
  basketball = 'basketball',
  football = 'football',
  volleyball = 'volleyball',
  pingpong = 'pingpong',
  debate = 'debate',
}

export enum MatchType {
  league = 'league',
  cup = 'cup',
  friendly = 'friendly',
}

export type Team = {
  _id: string;
  name: string;
  logo: string;
  isOfficial: boolean;
  players: Player[];
  category: category;
  gender: Gender;
  stats: {
    goalsConceded: number;
    goalsScored: number;
    matchesDrawn: number;
    matchesLost: number;
    matchesPlayed: number;
    matchesWon: number;
    points: number;
  };
};

export type LineUp = {
  formation: string;
  startingEleven: RefType[];
  startingFive: RefType[];
};

export type TeamStats = {
  corners: number;
  fouls: number;
  goals: number;
  offsides: number;
  points: number;
  possession: number;
  redCards: number;
  shots: number;
  shotsOnTarget: number;
  yellowCards: number;
};

export type Match = {
  homeTeamLineup: LineUp;
  awayTeamLineup: LineUp;
  _id: string;
  banner: string;
  title: string;
  description: string;
  type: MatchType;
  date: Date;
  homeTeam: Team;
  awayTeam: Team;
  status: {
    status: string;
  };
  events: TimeType[];
  category: category;
  gender: Gender;
  stats: {
    awayTeamStats: TeamStats;
    homeTeamStats: TeamStats;
  };
  fantasy: {
    manOfTheMatch: RefType | Player | null;
    highestScoringPlayer: RefType | Player | null;
    firstTeamToScore: RefType | Team | null;
  };
};
