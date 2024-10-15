/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

export default function Confetti() {
  const [isExploding, setIsExploding] = useState(false);

  return <>{isExploding && <ConfettiExplosion />}</>;
}
