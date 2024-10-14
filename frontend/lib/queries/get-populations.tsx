import { queryOptions } from '@tanstack/react-query';

export interface CountryPopulation {
  country: string;
  code: string;
  iso3: string;
  populationCounts: {
    year: number;
    value: number;
  }[];
}

export async function getPopulations() {
  const res = await fetch('/api/population');
  return (await res.json()).data as CountryPopulation[];
}

export const populationsOptions = queryOptions({
  queryKey: ['populations'],
  queryFn: getPopulations,
});
