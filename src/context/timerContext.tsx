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
import mockedDisciplines from '@/mocked-data';

interface Theme {
  value: string;
  label: string;
}

interface Discipline {
  value: string;
  label: string;
  themes: Theme[];
}

interface StudyTime {
  discipline: string;
  value: Record<string, number | string>[];
}

const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

interface TimerContextType {
  hours: number;
  minutes: number;
  seconds: number;
  totalTimeInSeconds: number;
  disciplines: Discipline[];
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  onSaveTimer: () => void;
  onStartTimer: () => void;
  onCancelTimer: () => void;
  isRunning: boolean;
  selectedDiscipline: string;
  selectedTheme: string;
  setSelectedDiscipline: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTheme: React.Dispatch<React.SetStateAction<string>>;
  started: boolean;
  setStarted: React.Dispatch<React.SetStateAction<boolean>>;
  studyTime: StudyTime[];
  onSelectDiscipline: (value: string) => void;
  themes: Theme[];
  open: boolean;
  title: string;
  description: string;
  onCancelDialog: () => void;
  cancelDialog: boolean;
  confirmDialog: boolean;
  handleCancelTimer: () => void;
  handleSaveTimer: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [started, setStarted] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [cancelDialog, setCancelDialog] = useState<boolean>(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);

  const [disciplines] = useState<Discipline[]>(mockedDisciplines);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [totalTimeInSeconds, setTotalTimeInSeconds] = useState<number>(0);
  const [studyTime, setStudyTime] = useState<StudyTime[]>([]);
  const timerInterval = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    const loadFromStorage = (
      key: string,
      fallback: string | [] | Record<string, number>
    ) => {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    };

    setSelectedDiscipline(loadFromStorage('selectedDiscipline', ''));
    setSelectedTheme(loadFromStorage('selectedTheme', ''));
    setStudyTime(loadFromStorage('studyTime', []));

    const savedTime = loadFromStorage('timer', {
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    setHours(savedTime.hours);
    setMinutes(savedTime.minutes);
    setSeconds(savedTime.seconds);
    setStarted(
      savedTime.hours > 0 || savedTime.minutes > 0 || savedTime.seconds > 0
    );
  }, []);

  useEffect(() => {
    localStorage.setItem('timer', JSON.stringify({ hours, minutes, seconds }));
  }, [hours, minutes, seconds]);

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

  const startTimer = () => {
    localStorage.setItem('selectedDiscipline', selectedDiscipline);
    localStorage.setItem('selectedTheme', selectedTheme);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const onSaveTimer = () => {
    setOpen(true);
    stopTimer();
    setTitle('Tem certeza que deseja salvar esse registro?');
    setDescription(
      'Após salvar o registro de estudo ele será salvo na página de estatísticas.'
    );
    setConfirmDialog(true);
  };

  const handleSaveTimer = () => {
    stopTimer();

    const currentMonth = monthNames[new Date().getMonth()];

    const storedData = localStorage.getItem('studyTime');
    const existingData: StudyTime[] = storedData ? JSON.parse(storedData) : [];

    const existingDiscipline = existingData.find(
      (item) => item.discipline === selectedDiscipline
    );

    if (existingDiscipline) {
      const existingMonth = existingDiscipline.value.find(
        (item) => item.key === currentMonth
      );

      if (existingMonth) {
        existingMonth[selectedTheme] =
          +(existingMonth[selectedTheme] || 0) + totalTimeInSeconds / 60;
      } else {
        existingDiscipline.value.push({
          key: currentMonth,
          [selectedTheme]: totalTimeInSeconds / 60,
        });
      }
    } else {
      existingData.push({
        discipline: selectedDiscipline,
        value: [
          {
            key: currentMonth,
            [selectedTheme]: totalTimeInSeconds / 60,
          },
        ],
      });
    }

    localStorage.setItem('studyTime', JSON.stringify(existingData));

    handleCancelTimer();

    setStudyTime(existingData);
    setConfirmDialog(false);
    setOpen(false);

    toast.success('Estudo salvo com sucesso!');
  };

  const resetTimer = () => {
    stopTimer();
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
    setOpen(true);
    stopTimer();
    setTitle('Tem certeza que deseja cancelar?');
    setDescription('Ao fazer isso todo o registro de estudo será perdido.');
    setCancelDialog(true);
  };

  const handleCancelTimer = () => {
    setStarted(false);
    resetTimer();
    setSelectedDiscipline('');
    setSelectedTheme('');
    localStorage.removeItem('selectedDiscipline');
    localStorage.removeItem('selectedTheme');
    setCancelDialog(false);
    setOpen(false);
  };

  const onSelectDiscipline = (value: string) => {
    setSelectedDiscipline(value);
    const themes = disciplines.find((item) => item.value === value)?.themes;

    setThemes(themes || []);
    setSelectedTheme('');
  };

  const onCancelDialog = () => {
    setOpen(false);
    setIsRunning(true);
  };

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
        onSaveTimer,
        totalTimeInSeconds,
        selectedDiscipline,
        selectedTheme,
        setSelectedDiscipline,
        setSelectedTheme,
        started,
        setStarted,
        onStartTimer,
        onCancelTimer,
        studyTime,
        disciplines,
        onSelectDiscipline,
        themes,
        description,
        open,
        title,
        onCancelDialog,
        cancelDialog,
        confirmDialog,
        handleCancelTimer,
        handleSaveTimer,
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
