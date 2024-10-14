import GlobeTmpl, { type GlobeProps } from 'react-globe.gl';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function Globe({ forwardRef, ...otherProps }: GlobeProps & { forwardRef: any }) {
  return <GlobeTmpl {...otherProps} ref={forwardRef} />;
}
