import Link from 'next/link';
import { Team } from '../../utils/types/types1';

type Props = {
  teams: Team[];
};

const Table = ({ teams }: Props) => {
  if (!teams) return <div>loading...</div>;
  if (teams.length === 0) return <div className=" px-5">No teams</div>;
  console.log('teams', teams);
  const standings = teams.sort((a, b) => {
    if (a?.stats?.points === b?.stats?.points) {
      const aDiff = (a?.stats?.goalsScored ?? 0) - (a?.stats?.goalsConceded ?? 0);
      const bDiff = (b?.stats?.goalsScored ?? 0) - (b?.stats?.goalsConceded ?? 0);
      return aDiff > bDiff ? -1 : 1;
    }
    return (b?.stats?.points ?? 0) < (a?.stats?.points ?? 0) ? -1 : 1;
  });

  return (
    <div className="flex w-full flex-col overflow-x-auto table-cont">
      <table className=" min-w-[450px] overflow-x-auto">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, i) => {
            // for border colors 1st, 2nd, 3rd, last
            const fc = 'border-l-green-500';
            const sc = 'border-l-yellow-500';
            const tc = 'border-l-orange';
            const lc = 'border-l-red-500';
            const border =
              i === 0
                ? fc
                : i === 1
                  ? sc
                  : i === 2 && standings.length > 3
                    ? tc
                    : i === standings.length - 1
                      ? lc
                      : 'border-l-white';
            return (
              <tr className={`border-l-2 ${border}`} key={i}>
                <td>{i + 1}</td>
                <td>
                  <Link href={`/team/${team._id}`} className=" hover:text-blue duration-200">
                    {team.name}
                  </Link>
                </td>
                <td>{team?.stats?.matchesPlayed ?? 0}</td>
                <td>{team?.stats?.matchesWon ?? 0}</td>
                <td>{team?.stats?.matchesDrawn ?? 0}</td>
                <td>{team?.stats?.matchesLost ?? 0}</td>
                <td>{team?.stats?.goalsScored ?? 0}</td>
                <td>{team?.stats?.goalsConceded ?? 0}</td>
                <td>{(team?.stats?.goalsScored ?? 0) - (team?.stats?.goalsConceded ?? 0)}</td>
                <td>{team?.stats?.points ?? 0}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* labels */}
      <div className="flex justify-between mt-2 w-full">
        <div className="flex items-center">
          <div className="bg-green-500 w-3 h-3"></div>
          <p className="ml-2 text-xs">Winner</p>
        </div>
        <div className="flex items-center">
          <div className="bg-yellow-500 w-3 h-3"></div>
          <p className="ml-2 text-xs">Runner-Up</p>
        </div>
        <div className="flex items-center">
          <div className="bg-orange w-3 h-3"></div>
          <p className="ml-2 text-xs">Third Place</p>
        </div>
        <div className="flex items-center">
          <div className="bg-red-500 w-3 h-3"></div>
          <p className="ml-2 text-xs">Last Place</p>
        </div>
      </div>
    </div>
  );
};

export default Table;
