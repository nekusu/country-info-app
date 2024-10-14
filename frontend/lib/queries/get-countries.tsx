import { queryOptions } from '@tanstack/react-query';

export interface Country {
  countryCode: string;
  name: string;
}

export async function getCountries() {
  const res = await fetch('/api/countries');
  return (await res.json()) as Country[];
}

export const countriesOptions = queryOptions({ queryKey: ['countries'], queryFn: getCountries });
