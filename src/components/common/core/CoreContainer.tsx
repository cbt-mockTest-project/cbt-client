import React from 'react';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';

const CoreContainer = () => {
  const { data: meQuery } = useMeQuery();
  return null;
};

export default CoreContainer;
