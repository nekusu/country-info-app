'use client';

import { useElementSize } from '@mantine/hooks';
import dynamic from 'next/dynamic';
import { forwardRef, useEffect, useRef, useState } from 'react';
import type { GlobeMethods, GlobeProps } from 'react-globe.gl';

const GlobeTmpl = dynamic(() => import('./globe'), { ssr: false });
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const Globe = forwardRef<any, GlobeProps>((props, ref) => (
  <GlobeTmpl {...props} forwardRef={ref} />
));

export interface WorldProps {
  countries: {
    features: object[];
  };
}

export function World({ countries }: WorldProps) {
  const [globeReady, setGlobeReady] = useState(false);
  const { ref: globeContainerRef, width, height } = useElementSize();
  const globeRef = useRef<GlobeMethods>();

  useEffect(() => {
    if (!globeReady || !globeRef.current || !globeContainerRef.current) return;
    globeRef.current.controls().enableZoom = false;
    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = 1;
  }, [globeContainerRef, globeReady]);
  useEffect(() => {
    if (!globeRef.current) return;
    if (Math.min(width, height))
      globeRef.current.pointOfView({ altitude: 1500 / Math.min(width, height) });
  }, [width, height]);

  return (
    <div ref={globeContainerRef} className='flex-1 w-full'>
      <Globe
        ref={globeRef}
        onGlobeReady={() => setGlobeReady(true)}
        width={width}
        height={height}
        backgroundColor='rgba(0,0,0,0)'
        atmosphereColor='#fff'
        globeImageUrl='/images/black.png'
        hexPolygonsData={countries.features}
        hexPolygonResolution={3}
        hexPolygonMargin={0.3}
        hexPolygonUseDots={true}
        hexPolygonColor={() => '#fff'}
      />
    </div>
  );
}
