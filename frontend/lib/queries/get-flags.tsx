import { queryOptions } from '@tanstack/react-query';

export interface CountryFlag {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}

export async function getFlags() {
  const res = await fetch('/api/flags');
  return (await res.json()).data as CountryFlag[];
}

export const flagsOptions = queryOptions({ queryKey: ['flags'], queryFn: getFlags });
