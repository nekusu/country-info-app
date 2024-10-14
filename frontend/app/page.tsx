import { Button } from '@/components/ui/button';
import { World } from '@/components/world';
import Link from 'next/link';
import { LuArrowRight, LuGithub } from 'react-icons/lu';

async function getCountries() {
  const res = await fetch(
    'https://raw.githubusercontent.com/vasturiano/react-globe.gl/refs/heads/master/example/datasets/ne_110m_admin_0_countries.geojson',
  );
  return (await res.json()) as { features: object[] };
}

export default async function Home() {
  const countries = await getCountries();

  return (
    <div className='py-10 flex flex-col w-dvw max-w-screen-lg items-center'>
      <h1 className='text-5xl font-bold'>InfoCountry</h1>
      <Button asChild className='gap-1 mt-2' variant='link'>
        <Link href='https://github.com/nekusu'>
          <LuGithub />
          nekusu
        </Link>
      </Button>
      <World countries={countries} />
      <Button asChild className='gap-2' variant='outline' size='lg'>
        <Link href='/countries'>
          Browse list of countries
          <LuArrowRight />
        </Link>
      </Button>
    </div>
  );
}
