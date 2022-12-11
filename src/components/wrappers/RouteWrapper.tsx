import { Suspense } from 'react';
import React from 'react';

type Props = {
	children?: React.ReactNode;
};

const RouteWrapper: React.FC<Props> = ({ children }) => {
  return <Suspense fallback={<p>Loading</p>}>{children}</Suspense>;
};

export default RouteWrapper;