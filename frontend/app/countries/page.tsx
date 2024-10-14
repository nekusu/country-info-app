'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { countriesOptions } from '@/lib/queries/get-countries';
import { useInputState } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { LuSearch } from 'react-icons/lu';
import Loading from '../loading';

export default function Page() {
  const { data: countries, isPending } = useQuery(countriesOptions);
  const [search, setSearch] = useInputState('');

  const filteredCountries = countries?.filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className='flex flex-col px-6 w-dvw max-w-screen-lg items-start'>
      <div className='flex w-full justify-between pt-6 -mt-6 pb-4 bg-black gap-4 sticky top-0'>
        <h2 className='text-3xl font-bold'>Countries</h2>
        <div className='relative'>
          <LuSearch className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search country...'
            className='pl-8'
            value={search}
            onChange={setSearch}
          />
        </div>
      </div>
      {isPending ? (
        <Loading />
      ) : (
        <div className='w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2'>
          {filteredCountries?.map(({ countryCode, name }) => (
            <Button key={countryCode} asChild className='justify-start' variant='outline'>
              <Link href={`/countries/${countryCode}`}>{name}</Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
