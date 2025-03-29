'use client';

import { useTimer } from '@/context/timerContext';

const Timer = () => {
  const { hours, minutes, seconds } = useTimer();

  return (
    <div className='font-bold text-5xl'>
      {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
      {String(seconds).padStart(2, '0')}
    </div>
  );
};

export default Timer;
