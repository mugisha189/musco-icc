import Image from 'next/image';
import { BiFootball } from 'react-icons/bi';
import { MdHeadphones } from 'react-icons/md';
import { TbArrowsUpDown } from 'react-icons/tb';
import { TimeType } from '../../utils/types/types2';

type Props = {
  timeline: TimeType[];
  isBasketball: boolean;
};

const Timeline = (props: Props) => {
  const { timeline } = props;
  if (props.isBasketball || !timeline || !timeline?.length || timeline?.length === 0)
    return <div className=" text-center">Not Available</div>;
  return (
    <div className="flex flex-col gap-y-3 w-4/5 mx-auto border-[1px] border-gray p-3 shadow-md">
      {timeline.reverse().map((time: TimeType, i) => (
        <TimeCard {...time} key={i} />
      ))}
    </div>
  );
};

export default Timeline;

const TimeCard = (props: TimeType) => {
  const isAway = props.team === 'away';
  return (
    <div className="flex flex-col p-2 rounded-md border-2 border-gray gap-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          {props.type === 'goal' && <BiFootball className="text-xl" />}
          {props.type === 'Substitution' && <TbArrowsUpDown className="text-xl" />}
          {props.type === 'comment' && <MdHeadphones className="text-xl" />}
          <p className="text-sm font-semibold capitalize">{props.type}</p>
        </div>
        <p className="text-sm font-semibold">{props.time}'</p>
      </div>
      {props.type === 'goal' && (
        <div className={`flex flex-col ${isAway ? 'bg-black' : 'bg-orange'} text-white py-4 w-full items-center`}>
          <BiFootball size={40} />
          <p className="text-4xl uppercase font-semibold">Goooaaalll!!!</p>
          <p className="font-semibold">{props.scorer?.displayName}</p>
        </div>
      )}
      {props.image && <Image src={props.image} alt={props.image} height={314} width={500} />}
      <p>{props.description}</p>
    </div>
  );
};
