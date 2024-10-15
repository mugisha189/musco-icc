import { useApp } from '@/contexts/AppProvider';
import { useSanity } from '@/contexts/SanityProvider';
import { useUser } from '@/contexts/UserProvider';
import { getResError } from '@/utils/funcs/fetch';
import { getYearFromDataSet } from '@/utils/funcs/func1';
import { Button, Modal } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { UserPrediction } from '@prisma/client';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchMatchByIdQuery } from '../../lib/queries';
import { Match, Team } from '../../utils/types/types1';
import FirstToScore from './prediction-dropdowns/FirstToScore';
import HighScorer from './prediction-dropdowns/HighScorer';
import ManOfTheMatch from './prediction-dropdowns/ManOfTheMatch';
import PredictionResults from './prediction-dropdowns/PredictionResults';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  matchId: string;
}

const PredictionModal = ({ isOpen, closeModal, matchId }: Props) => {
  const [match, setMatch] = useState<Match | null>(null);
  const { client, dataSet } = useSanity();
  const { user } = useUser();
  const [predData, setPredData] = useState({
    userId: user?.id,
    season: getYearFromDataSet(dataSet!),
  });
  const [prediction, setPrediction] = useState({
    matchId: matchId,
    manOfTheMatch: '',
    matchCategory: '',
    firstTeamToScore: '',
    homeScore: 0,
    awayScore: 0,
    highestScoringPlayer: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { userPredictions, setUserPredictions } = useApp();
  const [hasPredicted, setHasPredicted] = useState(false);
  const [userPrediction, setUserPrediction] = useState<UserPrediction | null | undefined>(null);
  const [gettingMatch, setGettingMatch] = useState(false);

  const getMatch = async () => {
    setGettingMatch(true);
    try {
      const match = await client?.fetch<Match[] | null>(fetchMatchByIdQuery(matchId));
      if (!match) return;
      setMatch(match[0]);
      // set math category
      setPrediction((prevState) => ({ ...prevState, matchCategory: match[0].category.toLowerCase() }));
    } catch (error) {
      console.log(error);
    }
    setGettingMatch(false);
  };

  const sendPrediction = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/fantasy/predictions', { ...predData, prediction });
      const data = await res.data;
      console.log(data);
      if (res.status !== 201) {
        throw new Error('Failed to send predictions');
      }
      notifications.show({
        title: 'Success',
        message: 'Prediction sent successfully',
        color: 'green',
      });
      closeModal();
    } catch (error: any) {
      console.log(error);
      notifications.show({
        title: 'Error',
        message: getResError(error) ?? 'An error occurred',
        color: 'red',
      });
    }
    setLoading(false);
  };

  const updatePrediction = async () => {
    // console.log('updating', prediction);
    setLoading(true);
    try {
      const res = await axios.put('/api/fantasy/predictions', { ...predData, prediction });
      const data = await res.data;
      console.log(data);
      notifications.show({
        title: 'Success',
        message: 'Prediction updated successfully',
        color: 'green',
      });
      const newPredictions = userPredictions?.filter((pred) => pred.matchId !== matchId);
      if (!newPredictions) return;
      setUserPredictions?.([...newPredictions, data.data]);
      closeModal();
    } catch (error: any) {
      console.log(error);
      notifications.show({
        title: 'Error',
        message: error?.message ?? 'An error occurred',
        color: 'red',
      });
    }
    setLoading(false);
  };

  // find in user_prediction
  const getPrevPrediction = () => {
    const userPrevPrediction = userPredictions?.find((pred) => pred.matchId === matchId);
    if (userPrevPrediction) setHasPredicted(true);
    setUserPrediction(userPrevPrediction!);
    setPrediction({
      ...prediction,
      manOfTheMatch: userPrevPrediction?.prediction?.manOfTheMatch ?? '',
      matchCategory: userPrevPrediction?.matchCategory ?? '',
      firstTeamToScore: userPrevPrediction?.prediction?.firstTeamToScore ?? '',
      homeScore: userPrevPrediction?.prediction.homeScore ?? 0,
      awayScore: userPrevPrediction?.prediction.awayScore ?? 0,
      highestScoringPlayer: userPrevPrediction?.prediction.highestScoringPlayer ?? '',
    });
  };

  useEffect(() => {
    if (matchId) {
      getMatch();
      getPrevPrediction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchId]);

  // const isFootball = match?.category.toLowerCase() === 'football';
  const isBasketball = match?.category.toLowerCase() === 'basketball';
  const isVolleyball = match?.category.toLowerCase() === 'volleyball';

  const statusDisabled = !['NS', 'TBD'].includes(match?.status?.status!);

  // TODO: Add Popular Predictions
  return (
    <>
      <Modal
        centered
        size={'lg'}
        opened={isOpen}
        onClose={closeModal}
        title={
          <span className=" font-semibold w-full justify-center text-xl text-center">
            {match?.homeTeam?.name} vs {match?.awayTeam?.name} Prediction
          </span>
        }
        classNames={{
          title: ' w-full text-center font-semibold text-xl',
        }}
      >
        {gettingMatch ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="flex gap-2 items-center">
              {/* <Image src="/images/loading.gif" alt="loading" width={30} height={30} /> */}
              <p className="text-lg font-semibold text-blue-500">Fetching Match Details...</p>
            </div>
          </div>
        ) : // Show Prediction Results  if match is finished
        match?.status.status === 'FT' ? (
          <PredictionResults match={match} userPrediction={userPrediction} />
        ) : (
          <div className="flex-1 flex flex-col gap-3 justify-center">
            {/* error */}
            <span className="text-red-500 text-center">{error}</span>
            {statusDisabled && userPrediction?.status !== 'MARKED' && (
              <span className="text-red-500 text-center font-semibold text-lg">
                {match?.status.status === 'PS'
                  ? 'Match Postponed. Wait for reschedule'
                  : 'Game is Closed. Prediction is not allowed.'}
              </span>
            )}
            {userPrediction?.status === 'MARKED' && (
              <span className=" text-center font-semibold text-lg">
                You Scored {userPrediction?.points} Points in this match
              </span>
            )}
            <h1 className=" text-center font-semibold">1. Predict Score (Goals, Points or Sets in volleyball)</h1>
            <span className=" text-blue text-center font-semibold">Enter score below</span>
            {isVolleyball && (
              <span className=" text-sm font-medium text-center">
                Hint: Team Score in volleyball usually can't exceed 2.( or 3 for big matches)
              </span>
            )}
            <div className="flex gap-2 justify-center items-center ">
              <div className="flex gap-3 align-middle text-center flex-col">
                <div className="flex items-center gap-x-2">
                  <Image src={match?.homeTeam.logo ?? '/images/teamImage.svg'} alt="team1" width={100} height={100} />
                  <p className="text-md text-slate-700 font-semibold text-xl">{match?.homeTeam?.name}</p>
                </div>
              </div>
              <input
                type="number"
                name=""
                value={prediction.homeScore}
                id=""
                className="border-2 border-blue w-14 h-14 text-xl rounded-lg outline-none text-center font-bold"
                onChange={(e) => setPrediction((prevState) => ({ ...prevState, homeScore: Number(e.target.value) }))}
                disabled={statusDisabled}
              />
              <input
                type="number"
                name=""
                value={prediction.awayScore}
                id=""
                className="border-2 border-blue w-14 h-14 text-xl rounded-lg outline-none text-center font-bold"
                onChange={(e) => setPrediction((prevState) => ({ ...prevState, awayScore: Number(e.target.value) }))}
                disabled={statusDisabled}
              />
              <div className="flex gap-3 align-middle text-center flex-col">
                <div className="flex items-center gap-x-2">
                  <p className="text-md text-slate-700 font-semibold text-xl">{match?.awayTeam?.name}</p>
                  <Image src={match?.awayTeam.logo ?? '/images/teamImage2.svg'} alt="team1" width={100} height={100} />
                </div>
              </div>
            </div>
            <div className="w-full mt-2">
              {match && (
                <ManOfTheMatch
                  match={match}
                  onChange={(player) => {
                    setPrediction((prevState) => ({ ...prevState, manOfTheMatch: player._id }));
                  }}
                  prevData={[...match.homeTeam.players, ...match.awayTeam.players].find(
                    (t) => t._id === prediction.manOfTheMatch,
                  )}
                  disabled={statusDisabled}
                />
              )}
            </div>
            <div className="w-full mt-2">
              {match && !isBasketball && (
                <FirstToScore
                  match={match}
                  onChange={(team) => {
                    setPrediction((prevState) => ({ ...prevState, firstTeamToScore: (team as Team)?._id ?? '' }));
                  }}
                  prevData={[match.homeTeam, match.awayTeam].find((t) => t._id === prediction.firstTeamToScore)}
                  disabled={statusDisabled}
                />
              )}
            </div>
            <div className="w-full mt-2">
              {match && isBasketball && (
                <HighScorer
                  match={match}
                  onChange={(player) => {
                    setPrediction((prevState) => ({ ...prevState, highestScoringPlayer: player._id }));
                  }}
                  prevData={[...match.homeTeam.players, ...match.awayTeam.players].find(
                    (t) => t._id === prediction.highestScoringPlayer,
                  )}
                  disabled={statusDisabled}
                />
              )}
            </div>
            <div className="flex items-center justify-center py-3 w-full">
              <Button
                onClick={hasPredicted ? updatePrediction : sendPrediction}
                color="#2075f8"
                className="w-full"
                disabled={loading || statusDisabled}
                loading={loading}
                variant="filled"
                size="md"
              >
                {hasPredicted ? 'Update' : 'Submit'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default PredictionModal;
