'use client';

import Loading from '@/app/loading';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { countryInfoOptions } from '@/lib/queries/get-country-info';
import { flagsOptions } from '@/lib/queries/get-flags';
import { populationsOptions } from '@/lib/queries/get-populations';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { getCountryISO3 } from 'ts-country-iso-2-to-3';

const CustomTooltip = ({
  active,
  payload,
  label,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
}: { active?: boolean; payload?: any; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className='flex flex-col bg-black border rounded-lg px-3 py-2 gap-0.5'>
        <p className='label'>
          Year: <span className='font-bold'>{label}</span>
        </p>
        <p>
          Population: <span className='font-bold'>{payload[0].value.toLocaleString()}</span>
        </p>
      </div>
    );
  }

  return null;
};

export default function Page({ params: { code } }: { params: { code: string } }) {
  const {
    data: countryInfo,
    isPending: isInfoPending,
    isError,
    error,
  } = useQuery(countryInfoOptions(code));
  const { data: flags } = useQuery(flagsOptions);
  const { data: populations, isPending: isPopulationsPending } = useQuery(populationsOptions);
  const flag = flags?.find(({ iso2 }) => code === iso2)?.flag;
  const population = populations?.find(
    ({ iso3 }) => iso3 === getCountryISO3(code),
  )?.populationCounts;

  if (isInfoPending) return <Loading />;
  if (isError) return <div>Error fetching data: {error.message}</div>;

  return (
    <div className='flex flex-col gap-6 px-6 w-dvw max-w-screen-lg items-start'>
      <div className='w-full flex justify-between'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-bold'>{countryInfo?.commonName}</h2>
          <p className='text-muted-foreground'>
            {countryInfo?.officialName}, {countryInfo?.region}
          </p>
        </div>
        {flag && <img className='h-[68px] border' src={flag} alt={countryInfo?.countryCode} />}
      </div>
      <div className='w-full flex flex-col gap-2'>
        <h3 className='text-2xl font-bold'>Population over time</h3>
        {isPopulationsPending ? (
          <div className='h-[300px] w-full flex'>
            <Loading />
          </div>
        ) : (
          <ChartContainer
            config={{ value: { label: 'Population' } }}
            className='h-[300px] w-full p-4 border rounded-lg'
          >
            <BarChart accessibilityLayer data={population}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='year'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                minTickGap={10}
                interval='preserveStartEnd'
              />
              <ChartTooltip content={<CustomTooltip />} />
              <Bar dataKey='value' fill='#fff' radius={4} isAnimationActive={false} />
            </BarChart>
          </ChartContainer>
        )}
      </div>
      {!!countryInfo?.borders?.length && (
        <div className='w-full flex flex-col gap-2'>
          <h3 className='text-2xl font-bold'>Borders</h3>
          <div className='w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2'>
            {countryInfo.borders.map(({ countryCode, commonName }) => (
              <Button key={countryCode} asChild className='justify-start' variant='outline'>
                <Link href={`/countries/${countryCode}`}>{commonName}</Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
