'use client';

import { useTimer } from '@/context/timerContext';

const Timer = () => {
  const { hours, minutes, seconds, totalTimeInSeconds } = useTimer();

  return (
    totalTimeInSeconds > 0 && (
      <div className='bg-[#1B1B1D] p-5 flex items-center justify-center fixed w-full bottom-0'>
        <div className='font-bold text-5xl'>
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </div>
      </div>
    )
  );
};

export default Timer;
