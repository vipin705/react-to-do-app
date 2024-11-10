import { ReactNode } from 'react';

function Heading({ children }: { children: ReactNode }) {
  return <h1 className='text-5xl font-semibold'>{children}</h1>;
}

export default Heading;
