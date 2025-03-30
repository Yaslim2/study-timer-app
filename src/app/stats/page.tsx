'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { useTimer } from '@/context/timerContext';
import { useRouter } from 'next/navigation';
import { IoMdArrowRoundBack } from 'react-icons/io';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

export default function Stats() {
  const { replace } = useRouter();

  const { studyTime } = useTimer();

  const generateColor = (index: number, total: number) => {
    const hue = 210;
    const saturation = 70;
    const lightness = 80 - (index / total) * 40;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const redirectToHome = () => {
    replace('/');
  };

  return (
    <>
      <Button
        onClick={redirectToHome}
        className='absolute top-5 left-5 flex items-center justify-center'
      >
        <IoMdArrowRoundBack />
        Voltar
      </Button>
      <div className='flex flex-col gap-3 items-center justify-center mb-10'>
        <h1 className='text-5xl font-semibold'>Estatísticas</h1>
        <h2 className='text-2xl font-medium'>
          Olhe seu progresso e melhore seu desempenho!
        </h2>
        {studyTime.length === 0 && (
          <h2 className='text-2xl mt-10 font-medium'>
            Nenhuma estatística disponível no momento.
          </h2>
        )}
      </div>
      {studyTime.length > 0 && (
        <div className='w-full grid grid-cols-2 gap-5'>
          {studyTime.map((value, index) => {
            const keys = Array.from(
              new Set(
                value.value.flatMap((item) =>
                  Object.keys(item).filter((key) => key !== 'key')
                )
              )
            );

            const isLastOdd =
              studyTime.length % 2 !== 0 && index === studyTime.length - 1;
            return (
              <Card
                key={value.discipline}
                className={`p-5 ${isLastOdd ? 'col-span-2' : ''}`}
              >
                <h1 className='text-lg font-medium'>{value.discipline}</h1>
                <ChartContainer
                  config={{} as ChartConfig}
                  className='max-h-[500px] min-h-[200px] w-full'
                >
                  <BarChart accessibilityLayer data={value.value}>
                    <CartesianGrid vertical={true} />
                    <XAxis
                      dataKey='key'
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    {keys.map((key, index) => {
                      return (
                        <Bar
                          key={key}
                          fill={generateColor(index, keys.length)}
                          dataKey={key}
                          radius={4}
                        />
                      );
                    })}
                  </BarChart>
                </ChartContainer>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
