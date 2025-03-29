'use client';

import { Card } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

export default function Stats() {
  const chartData = [
    {
      key: 'Janeiro',
      Culpabilidade: 186,
      Teste: 80,
      Teste2: 80,
    },
    {
      key: 'Fevereiro',
      Culpabilidade: 186,
      Teste: 80,
    },
    {
      key: 'Março',
      Culpabilidade: 186,
      Teste: 80,
    },
    {
      key: 'Abril',
      Culpabilidade: 186,
      Teste: 80,
    },
    {
      key: 'Maio',
      Culpabilidade: 186,
      Teste: 80,
    },
    {
      key: 'Junho',
      Culpabilidade: 186,
      Teste: 80,
    },
    {
      key: 'Julho',
      Culpabilidade: 186,
      Teste: 80,
    },
    {
      key: 'Agosto',
      Culpabilidade: 186,
      Teste: 80,
    },
    {
      key: 'Setembro',
      Culpabilidade: 186,
      Teste: 80,
    },
    {
      key: 'Outubro',
      Culpabilidade: 186,
      Teste: 80,
    },
    {
      key: 'Novembro',
      Culpabilidade: 186,
      Teste: 80,
    },
    {
      key: 'Dezembro',
      Culpabilidade: 186,
      Teste: 80,
    },
  ];

  const data = [
    { discipline: 'Direito Penal', value: chartData },
    { discipline: 'Direito Penal2', value: chartData },
    { discipline: 'Direito Penal3', value: chartData },
  ];

  const generateColor = (index: number, total: number) => {
    const hue = 210; // Azul (fixo no espectro HSL)
    const saturation = 70; // Saturação fixa para manter uma boa intensidade
    const lightness = 80 - (index / total) * 40; // Começa mais escuro (80%) e vai até mais claro (120%)

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  return (
    <>
      <div className='flex flex-col gap-3 items-center justify-center mb-10'>
        <h1 className='text-5xl font-semibold'>Estatísticas</h1>
        <h2 className='text-2xl font-medium'>
          Olhe seu progresso e melhore seu desempenho!
        </h2>
      </div>
      <div className='w-full grid grid-cols-2 gap-5'>
        {data.map((value, index) => {
          const keys = Array.from(
            new Set(
              value.value.flatMap((item) =>
                Object.keys(item).filter((key) => key !== 'key')
              )
            )
          );

          const isLastOdd = data.length % 2 !== 0 && index === data.length - 1;
          return (
            <Card
              key={value.discipline}
              className={`p-5 ${isLastOdd ? 'col-span-2' : ''}`}
            >
              <h1 className='text-lg font-medium'>Direito Penal</h1>
              <ChartContainer
                config={{} as ChartConfig}
                className='max-h-[500px] min-h-[200px] w-full'
              >
                <BarChart accessibilityLayer data={chartData}>
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
    </>
  );
}
