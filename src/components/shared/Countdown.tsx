import { Match } from '@/utils/types/types1';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BiBell } from 'react-icons/bi';

interface Props {
  targetDate: Date;
  endTime: Date;
  startTime: Date;
  isFinished: boolean;
  match: Match;
}

function CountdownTimer({ targetDate, startTime, endTime, isFinished, match }: Props) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  const { days, hours, minutes, seconds } = timeLeft as any;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <span className=" text-center capitalize">{match.category} Match</span>
        <div className="flex items-center gap-x-3">
          <span className=" font-bold text-4xl">{match.homeTeam.name}</span>
          <span className=" font-bold text-xl">vs</span>
          <span className=" font-bold text-4xl">{match.awayTeam.name}</span>
        </div>
      </div>
      {!Object.keys(timeLeft).length ? (
        <div className=" w-full flex justify-center text-xl text-orange font-bold">
          <p>It's time</p>
        </div>
      ) : (
        <>
          <span>Start In</span>
          <div className=" flex justify-center w-full">
            <TimePart value={formatTime(days)} label="Days" />
            <TimePart value={formatTime(hours)} label="Hours" />
            <TimePart value={formatTime(minutes)} label="Minutes" />
            <TimePart value={formatTime(seconds)} label="Seconds" />
          </div>
        </>
      )}
      <p>🔥🔥 You don't wanna miss this. Do you? 🔥🔥</p>
      {!isFinished && (
        <div className="flex w-full items-center justify-center gap-3">
          <span className=" text-center">I don't Wanna miss this. Please</span>
          <Link
            href={`https://www.google.com/calendar/render?action=TEMPLATE&dates=${startTime}/${endTime}&text=${match.homeTeam.name}%20vs%20${match.awayTeam.name}%20Match&location=School%20Football%20Field`}
            target="_blank"
            className=" text-orange flex items-center gap-x-2 py-2 rounded-md  w-fit"
          >
            <BiBell />
            Remind me
          </Link>
        </div>
      )}
    </div>
  );
}

export default CountdownTimer;

const TimePart = ({ value, label }: { value: string | number; label: string }) => (
  <div className="flex flex-col items-center p-3">
    <span className=" text-6xl">{value.toString()}</span>
    <span className=" text-xl">{label}</span>
  </div>
);
