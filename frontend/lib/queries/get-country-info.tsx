import { queryOptions } from '@tanstack/react-query';

export interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: CountryInfo[] | null;
}

export async function getCountryInfo(code: string) {
  const res = await fetch(`/api/countries/${code}`);
  return (await res.json()) as CountryInfo;
}

export function countryInfoOptions(code: string) {
  return queryOptions({ queryKey: ['country-info', code], queryFn: () => getCountryInfo(code) });
}
