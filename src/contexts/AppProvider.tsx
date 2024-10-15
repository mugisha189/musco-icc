'use client';
import { SeasonData } from '@/utils/types';
import { UserPrediction } from '@prisma/client';
import axios from 'axios';
import { SanityClient } from 'next-sanity';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { fetchMatchesQuery, teamsStatsQuery } from '../lib/queries';
import { AllPlayersStatsQuery, getInsightsQuery, getTrendsQuery } from '../lib/query1';
import { Match, Team } from '../utils/types/types1';
import { Insight, PlayerByTeam, TeamGroups, Trend } from '../utils/types/types2';
import { useSanity } from './SanityProvider';
import ModifyLinks from '@/components/core/ModifyLinks';

export type AppContextType = {
  players?: PlayerByTeam;
  setPlayers?: React.Dispatch<React.SetStateAction<PlayerByTeam>>;
  matches?: Match[];
  setMatches?: React.Dispatch<React.SetStateAction<Match[]>>;
  getMatches?: (client: any) => void;
  teams?: TeamGroups;
  setTeams?: React.Dispatch<React.SetStateAction<TeamGroups>>;
  getPlayers?: (client: any) => void;
  trends?: Trend[];
  setTrends?: React.Dispatch<React.SetStateAction<Trend[]>>;
  insights?: Insight[];
  setInsights?: React.Dispatch<React.SetStateAction<Insight[]>>;
  getInsights?: (client: any) => void;
  friendlyMatches?: Match[];
  setFriendlyMatches?: React.Dispatch<React.SetStateAction<Match[]>>;
  getDataSeason?: <T = any>(data: SeasonData<T>) => T | undefined;
  userPredictions?: UserPrediction[];
  setUserPredictions?: React.Dispatch<React.SetStateAction<UserPrediction[]>>;
  getUserPredictions?: () => void;
};

export const AppContext = createContext<AppContextType>({});
export const useApp = () => useContext(AppContext);

type Props = {
  children: ReactNode;
};

export default function AppProvider({ children }: Props) {
  const { client, dataSet } = useSanity();
  const [players, setPlayers] = useState<PlayerByTeam>({
    football: [],
    basketball: [],
    pingpong: [],
    debate: [],
    volleyball: [],
  });
  const [matches, setMatches] = useState<Match[]>([]);
  const [friendlyMatches, setFriendlyMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<TeamGroups>({
    football: [],
    basketball: [],
    pingpong: [],
    debate: [],
    volleyball: [],
  });
  const [trends, setTrends] = useState<Trend[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [userPredictions, setUserPredictions] = useState<any>([]);

  const getMatches = async (client: SanityClient) => {
    try {
      const res = await client?.fetch(fetchMatchesQuery);
      const leagueMatches: Match[] = res.filter((match: Match) => match.type === 'league');
      const friendlyMatches = res.filter((match: Match) => match.type === 'friendly');
      setMatches(leagueMatches);
      setFriendlyMatches(friendlyMatches);
    } catch (error) {
      // console.log(error);
    }
  };

  const getTeams = async (client: SanityClient) => {
    try {
      const teams = await client?.fetch(teamsStatsQuery);
      const officialTeams = teams.filter((team: Team) => team.isOfficial);

      const footballTeams = officialTeams.filter((team: Team) => team.category === 'football');
      const basketballTeams = officialTeams.filter((team: Team) => team.category === 'basketball');
      const volleyballTeams = officialTeams.filter((team: Team) => team.category === 'volleyball');
      const pingpongTeams = officialTeams.filter((team: Team) => team.category === 'pingpong');
      const debateTeams = officialTeams.filter((team: Team) => team.category === 'debate');
      setTeams({
        football: footballTeams,
        basketball: basketballTeams,
        volleyball: volleyballTeams,
        pingpong: pingpongTeams,
        debate: debateTeams,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getPlayers = async (client: SanityClient) => {
    try {
      const teamPlayers = await client?.fetch<Team[]>(AllPlayersStatsQuery);
      const footballTeamPlayers = teamPlayers.filter((teamPlayer: Team) => teamPlayer.category === 'football');
      const basketballTeamPlayers = teamPlayers.filter((teamPlayer: Team) => teamPlayer.category === 'basketball');
      const volleyballTeamPlayers = teamPlayers.filter((teamPlayer: Team) => teamPlayer.category === 'volleyball');
      // const pingpongTeamPlayers = teamPlayers.filter((teamPlayer: Team) => teamPlayer.category === 'pingpong');
      // const debateTeamPlayers = teamPlayers.filter((teamPlayer: Team) => teamPlayer.category === 'debate');

      // TODO: return players with their team
      const footballPlayers = footballTeamPlayers.map((team: Team) => team.players).flat();
      const basketballPlayers = basketballTeamPlayers.map((team: Team) => team.players).flat();
      const volleyballPlayers = volleyballTeamPlayers.map((team: Team) => team.players).flat();

      setPlayers({
        ...players,
        football: footballPlayers,
        basketball: basketballPlayers,
        volleyball: volleyballPlayers,
      });
    } catch (error) {
      // console.log(error);
    }
  };

  const getTrending = async (client: SanityClient) => {
    try {
      const trending = await client?.fetch(getTrendsQuery);
      // console.log(trendings);
      setTrends(trending);
    } catch (error) {
      console.log(error);
    }
  };

  const getInsights = async (client: SanityClient) => {
    try {
      const insights = await client?.fetch(getInsightsQuery);
      setInsights(insights);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPredictions = async () => {
    try {
      const res = await axios.get(`/api/fantasy/my-predictions`);
      const data = await res.data?.data;
      setUserPredictions(data);
    } catch (error: any) {
      console.log(error);
      // notifications.show({
      //   title: 'Error',
      //   message: 'An error occurred Get Prev Prediction',
      //   color: 'red',
      // });
    }
  };

  const flush = () => {
    console.log('flushing data');
    setPlayers({
      football: [],
      basketball: [],
      pingpong: [],
      debate: [],
      volleyball: [],
    });
    setMatches([]);
    setTeams({
      football: [],
      basketball: [],
      pingpong: [],
      debate: [],
      volleyball: [],
    });
    setTrends([]);
    setInsights([]);
    setFriendlyMatches([]);
  };

  const getDataSeason = <T = any,>(data: SeasonData<T>) => {
    if (!dataSet) return;
    const dataSetData = data?.[dataSet];
    if (!dataSetData) {
      console.log('no data');
      return;
    }
    return dataSetData;
  };

  useEffect(() => {
    if (!client) return;
    // flush data
    flush();
    // get data again
    getMatches(client);
    getTeams(client);
    getTrending(client);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  return (
    <AppContext.Provider
      value={{
        players,
        setPlayers,
        matches,
        setMatches,
        getMatches,
        teams,
        setTeams,
        getPlayers,
        trends,
        setTrends,
        insights,
        setInsights,
        getInsights,
        friendlyMatches,
        setFriendlyMatches,
        getDataSeason,
        getUserPredictions,
        userPredictions,
        setUserPredictions,
      }}
    >
      <ModifyLinks />
      {children}
    </AppContext.Provider>
  );
}
