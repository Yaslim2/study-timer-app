'use client';

import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { useRouter } from 'next/navigation';
import { FaBook, FaLightbulb } from 'react-icons/fa';
import { IoIosStats } from 'react-icons/io';
import { useTimer } from '@/context/timerContext';
import { cn } from '@/lib/utils';
import ConfirmDialog from '@/components/confirm-dialog';

export default function Home() {
  const { push } = useRouter();

  const {
    stopTimer,
    resetTimer,
    onSaveTimer,
    isRunning,
    totalTimeInSeconds,
    selectedDiscipline,
    selectedTheme,
    setSelectedTheme,
    started,
    onStartTimer,
    onCancelTimer,
    disciplines,
    themes,
    onSelectDiscipline,
    open,
    description,
    title,
    onCancelDialog,
    cancelDialog,
    confirmDialog,
    handleCancelTimer,
    handleSaveTimer,
  } = useTimer();

  const redirectToStatistics = () => {
    push('/stats');
  };

  return (
    <>
      <ConfirmDialog
        open={open}
        description={description}
        title={title}
        onContinue={
          cancelDialog
            ? handleCancelTimer
            : confirmDialog
            ? handleSaveTimer
            : () => {}
        }
        onCancel={onCancelDialog}
      />
      <div className='flex flex-col gap-3 items-center justify-center mb-10'>
        <h1 className='text-5xl font-semibold'>Study Timer App</h1>
        <h2 className='text-2xl font-medium'>
          Gerencie seu tempo de estudo com eficiência!
        </h2>
      </div>

      {!started && (
        <div className='flex flex-col gap-5 items-center justify-center mb-10'>
          <div className='flex flex-row gap-3 items-center justify-center'>
            <Combobox
              data={disciplines}
              placeholder='Selecione uma disciplina'
              searchPlaceholder='Procure por uma disciplina'
              value={selectedDiscipline}
              setValue={onSelectDiscipline}
            ></Combobox>
            <Combobox
              data={themes}
              placeholder='Selecione um tema'
              searchPlaceholder='Procure por um tema'
              value={selectedTheme}
              setValue={setSelectedTheme}
            ></Combobox>
          </div>
          <Button onClick={onStartTimer} className='w-full'>
            Iniciar Cronômetro
          </Button>
        </div>
      )}

      {started && (
        <div className='max-w-[600px] text-left flex flex-col gap-5 items-center justify-center mb-10'>
          <div className='flex flex-col gap-3 items-start justify-center'>
            <h2 className='text-2xl'>
              Bons estudos, lembre-se de tirar uma pausa para não ficar
              sobrecarregado!
            </h2>
            <div className='flex flex-row justify-start items-center gap-2'>
              <FaBook />{' '}
              <p className='text-[20px]'>
                Disciplina: <b>{selectedDiscipline}</b>
              </p>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <FaLightbulb />{' '}
              <p className='text-[20px]'>
                Tema: <b>{selectedTheme}</b>
              </p>
            </div>
          </div>
          <div className='flex flex-row gap-3 w-full'>
            {isRunning && (
              <Button onClick={resetTimer} className='w-[49%]'>
                Resetar Cronômetro
              </Button>
            )}
            {isRunning && (
              <Button
                onClick={stopTimer}
                variant='destructive'
                className='w-[49%]'
              >
                Parar Cronômetro
              </Button>
            )}
            {!isRunning && (
              <Button onClick={onStartTimer} className='w-full'>
                Iniciar Cronômetro
              </Button>
            )}
          </div>

          <div className='flex flex-row gap-3 w-full'>
            <Button
              className={cn(totalTimeInSeconds === 0 ? 'w-full' : 'w-[49%]')}
              onClick={onCancelTimer}
            >
              Cancelar
            </Button>

            {totalTimeInSeconds > 0 && (
              <Button
                onClick={onSaveTimer}
                className={cn(
                  'bg-[#22C55E] text-[#18181b] hover:bg-[#22C55E]/90',
                  totalTimeInSeconds === 0 ? 'w-full' : 'w-[49%]'
                )}
              >
                Salvar tempo
              </Button>
            )}
          </div>
        </div>
      )}

      <Button
        onClick={redirectToStatistics}
        className='absolute top-5 right-5 flex items-center justify-center'
      >
        <IoIosStats />
        Estatísticas
      </Button>
    </>
  );
}
