import { LuLoader2 } from 'react-icons/lu';

export default function Loading() {
  return (
    <div className='flex flex-1 w-full items-center justify-center animate-in'>
      <LuLoader2 className='animate-spin h-20 w-20' />
    </div>
  );
}
