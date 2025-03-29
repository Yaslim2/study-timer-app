// timerContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { toast } from 'sonner';

interface TimerContextType {
  hours: number;
  minutes: number;
  seconds: number;
  totalTimeInSeconds: number;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  saveTimer: () => void;
  onStartTimer: () => void;
  onCancelTimer: () => void;
  isRunning: boolean;
  selectedDiscipline: string;
  selectedTheme: string;
  setSelectedDiscipline: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTheme: React.Dispatch<React.SetStateAction<string>>;
  started: boolean;
  setStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [started, setStarted] = useState<boolean>(false);

  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [totalTimeInSeconds, setTotalTimeInSeconds] = useState<number>(0);

  const timerInterval = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    const disciplineSaved = localStorage.getItem('selectedDiscipline');
    const themeSaved = localStorage.getItem('selectedTheme');
    if (disciplineSaved) {
      setSelectedDiscipline(disciplineSaved);
    }
    if (themeSaved) {
      setSelectedTheme(themeSaved);
    }
    const savedTime = JSON.parse(
      localStorage.getItem('timer') || '{"hours":0,"minutes":0,"seconds":0}'
    );
    setHours(savedTime.hours);
    setMinutes(savedTime.minutes);
    setSeconds(savedTime.seconds);

    if (savedTime.hours > 0 || savedTime.minutes > 0 || savedTime.seconds > 0) {
      setStarted(true);
      setIsRunning(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('timer', JSON.stringify({ hours, minutes, seconds }));
  }, [hours, minutes, seconds]);

  const startTimer = () => {
    localStorage.setItem('selectedDiscipline', selectedDiscipline);
    localStorage.setItem('selectedTheme', selectedTheme);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const saveTimer = () => {};

  const resetTimer = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const onStartTimer = () => {
    if (!selectedDiscipline || !selectedTheme) {
      toast.error(
        'Selecione uma disciplina e um tema para iniciar o cronômetro.',
        {
          duration: 3000,
        }
      );
    } else {
      setStarted(true);
      startTimer();
    }
  };

  const onCancelTimer = () => {
    setStarted(false);
    resetTimer();
    setSelectedDiscipline('');
    setSelectedTheme('');
    localStorage.removeItem('selectedDiscipline');
    localStorage.removeItem('selectedTheme');
  };

  useEffect(() => {
    if (isRunning) {
      timerInterval.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 59) {
                setHours((prevHours) => prevHours + 1);
                return 0;
              }
              return prevMinutes + 1;
            });
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    } else {
      if (timerInterval) {
        clearInterval(timerInterval.current);
      }
    }
    return () => clearInterval(timerInterval.current);
  }, [isRunning]);

  useEffect(() => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTotalTimeInSeconds(totalSeconds);
  }, [hours, minutes, seconds]);

  return (
    <TimerContext.Provider
      value={{
        hours,
        minutes,
        seconds,
        startTimer,
        stopTimer,
        resetTimer,
        isRunning,
        saveTimer,
        totalTimeInSeconds,
        selectedDiscipline,
        selectedTheme,
        setSelectedDiscipline,
        setSelectedTheme,
        started,
        setStarted,
        onStartTimer,
        onCancelTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
