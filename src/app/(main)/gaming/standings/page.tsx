'use client';
import { useUser } from '@/contexts/UserProvider';
import GamingLayout from '@/layouts/GamingLayout';
import { Standing } from '@/utils/types/fantasy.type';
import { Highlight } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { throttle } from 'lodash';
import React, { useState } from 'react';
import { LuLoader2 } from 'react-icons/lu';
import { TiChevronRight } from 'react-icons/ti';

const FootTableIndex = () => {
  const [standings, setStandings] = React.useState<Standing[]>([]);
  const [filteredList, setFilteredList] = React.useState<Standing[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = React.useState(true);
  const { user } = useUser();

  // api/fantasy/score/update-score
  const getStandings = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/fantasy/score/overall');
      const newStandings: Standing[] = response.data.data;
      setStandings(newStandings.sort((a, b) => a.currentPosition - b.currentPosition));
    } catch (error) {
      console.log(error);
      notifications.show({
        title: 'Error',
        message: 'An error occurred Getting Standings',
        color: 'red',
      });
    }
    setLoading(false);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const filtered = standings.filter((standing) => {
      const jsonStr = JSON.stringify(standing).toLowerCase();
      return jsonStr.includes(e.target.value.toLowerCase());
    });
    setFilteredList(filtered);
  };

  // if they have equal points, so they have the same rank in the table (add it as current position) but keep the last position
  // i.e if two people have same points, the rank of the next person should be 3
  const rankPeople = (standings: Standing[]) => {
    let lastScore = 0;
    let lastPosition = 0;
    let toSkip = 0;
    return standings.map((standing) => {
      if (lastScore === standing.score) {
        standing.rank = lastPosition;
        toSkip += 1;
      } else {
        lastPosition += 1 + toSkip;
        standing.rank = lastPosition;
        toSkip = 0;
      }
      lastScore = standing.score;
      return standing;
    });
  };

  React.useEffect(() => {
    getStandings();
  }, []);

  const FormIndicator = ({ lastRank, currentRank, rank }: { lastRank: number; currentRank: number; rank?: number }) => {
    // if (lastRank === rank || lastRank === currentRank) {
    //   return <span className="text-xs w-4 aspect-square rounded-full bg-gray"></span>;
    // }
    if (lastRank > currentRank) {
      return (
        <span className="text-xs w-4 aspect-square grid place-items-center rounded-full bg-green-500">
          <TiChevronRight className=" -rotate-90" />
        </span>
      );
    }
    if (lastRank < (rank ?? currentRank)) {
      return (
        <span className="text-xs w-4 aspect-square grid place-items-center rounded-full text-white bg-red-500">
          <TiChevronRight className=" rotate-90" />
        </span>
      );
    }
    return <span className="text-xs w-4 aspect-square rounded-full bg-gray"></span>;
  };

  const getIncreaseString = (lastRank: number, currentRank: number, rank?: number) => {
    if (lastRank === rank || lastRank === currentRank) return '';
    if (lastRank > currentRank) {
      return `+${lastRank - currentRank}`;
    }
    if (lastRank < currentRank) {
      return `-${currentRank - lastRank}`;
    }
    return '';
  };
  const hasMaintainer = standings.some((standing) => standing.user.isMaintainer);

  return (
    <GamingLayout title="Football - Table" isGeneral>
      <div className="p-3 gap-y-3">
        <h3 className=" text-center text-xl font-semibold">Fantasy Standings</h3>
        {!hasMaintainer && (
          <Highlight
            highlight={['I.Charles', 'B. Shyaka Valentin']}
            // color="#ff7b35"
            className=" text-blue my-2 text-base text-center w-full"
            highlightStyles={{
              color: '#2075f8',
              // backgroundColor: '#2075f8',
              // color: 'white',
              fontWeight: 'bold',
            }}
          >
            NB: I.Charles and B. Shyaka Valentin won't be awarded as they are the admins of the game. They are playing
            just for fun.
          </Highlight>
        )}
        <div className=" mt-4 flex justify-between">
          <h3 className=" font-bold text-lg px-3">Standings</h3>
          <input
            type="text"
            onChange={throttle(onSearch, 500)}
            value={search}
            className=" border-blue/70 border-blue max-w-[250px] py-1 w-full rounded-md px-3 outline-none border-2"
            placeholder="Search..."
          />
        </div>
        <div className="flex flex-col w-full items-center overflow-x-auto">
          {loading && (
            <h1 className="flex gap-2 flex-col items-center">
              <LuLoader2 className=" animate-spin" size={40} />
              Loading Standings...
            </h1>
          )}
          {!loading && standings.length === 0 && (
            <h1 className="flex gap-2 flex-col items-center text-sm">No Standings So Far. Will be available after</h1>
          )}
          {rankPeople(standings).length > 0 && (
            <table className="mt-2">
              <thead>
                <tr>
                  <th align="left" className="p-2 w-10">
                    #
                  </th>
                  <th align="left" className="p-2">
                    Rank (Change)
                  </th>
                  <th align="left" className="p-2">
                    Name
                  </th>
                  <th align="left" className="p-2">
                    MP (Marked)
                  </th>
                  <th align="left" className="p-2">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {standings.map((standing, i) => {
                  const isMe = standing.user.id === user?.id;
                  const increase = getIncreaseString(standing.lastPosition, standing.currentPosition, standing.rank);
                  // skip if search is not empty and the user is not in the search list
                  if (search && !filteredList.includes(standing)) return null;
                  return (
                    <tr
                      key={standing.id}
                      className={` ${isMe ? 'bg-blue text- hover:text-black hover:bg-gray-100 text-white' : ''} ${i % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
                    >
                      <td align="left" className="p-2 italic text-s">
                        {i + 1}.
                      </td>
                      <td align="left" className="p-2">
                        <div className="flex items-center gap-2">
                          {standing.rank}.{' '}
                          <FormIndicator
                            lastRank={standing.lastPosition}
                            currentRank={standing.currentPosition}
                            rank={standing.rank}
                          />
                          {increase ? `(${increase})` : ''}
                        </div>
                      </td>
                      {/* <td align="left" className="p-2">
                      {standing.user.firstName}
                    </td> */}
                      <td align="left" className="p-2 capitalize">
                        {`${standing.user.firstName?.[0]}. ${standing.user.lastName}`}
                      </td>
                      <td align="left" className="p-2 capitalize">
                        {standing.matchesPredicted}
                      </td>
                      <td align="left" className="p-2">
                        {standing.score}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </GamingLayout>
  );
};

export default FootTableIndex;
