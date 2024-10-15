import React from 'react';
import { PlayerBox } from './PlayerLineUp';

type Props = {
  isAway: boolean;
};
const Dummy = ({ isAway }: Props) => {
  return (
    <div className={`h-1/2 w-full ${!isAway ? 'flex-col' : 'flex-col-reverse'} flex p-2 justify-between`}>
      <div className="flex items-center justify-center">
        <PlayerBox name="Dummy" color={`#000`} number="1" />
      </div>
      <div className="grid grid-cols-4 w-full">
        <PlayerBox name="Dummy" color={`#000`} number="2" />
        <PlayerBox name="Dummy" color={`#000`} number="3" />
        <PlayerBox name="Dummy" color={`#000`} number="4" />
        <PlayerBox name="Dummy" color={`#000`} number="5" />
      </div>
      <div className="grid grid-cols-3 w-full">
        <PlayerBox name="Dummy" color={`#000`} number="6" />
        <PlayerBox name="Dummy" color={`#000`} number="7" />
        <PlayerBox name="Dummy" color={`#000`} number="8" />
      </div>
      <div className="grid grid-cols-3 w-full">
        <PlayerBox name="Dummy" color={`#000`} number="9" />
        <PlayerBox name="Dummy" color={`#000`} number="10" />
        <PlayerBox name="Dummy" color={`#000`} number="11" />
      </div>
    </div>
  );
};

export default Dummy;
