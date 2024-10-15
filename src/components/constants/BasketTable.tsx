import Link from 'next/link';
import React from 'react';
import { Team } from '../../utils/types/types1';

type Props = {
  teams: Team[];
};

const BasketTable = ({ teams }: Props) => {
  if (!teams) return <div>loading...</div>;
  if (teams.length === 0) return <div className="px-4">No teams Found</div>;

  // with Pct
  const newTeams = teams.map((team) => {
    const matchesPlayed = team?.stats?.matchesPlayed ?? 0;
    const matchesWon = team?.stats?.matchesWon ?? 0;
    const pct = matchesPlayed > 0 ? matchesWon / matchesPlayed /* * 100 */ : 0;
    return {
      ...team,
      stats: {
        ...team.stats,
        pct: pct.toFixed(2),
      },
    };
  });

  const standings = newTeams.sort((a, b) => ((b?.stats?.pct ?? 0) < (a?.stats?.pct ?? 0) ? -1 : 1));

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>P</th>
          <th>W</th>
          <th>L</th>
          <th>Pct</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((team, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <Link href={`/team/${team._id}`} className=" hover:text-blue duration-200">
                {team.name}
              </Link>
            </td>
            <td>{team?.stats?.matchesPlayed ?? 0}</td>
            <td>{team?.stats?.matchesWon ?? 0}</td>
            <td>{team?.stats?.matchesLost ?? 0}</td>
            <td>{team?.stats?.pct ?? 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BasketTable;
