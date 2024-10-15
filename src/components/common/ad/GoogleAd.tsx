import { useMeQuery } from '@lib/graphql/hook/useUser';
import React from 'react';
import styled from 'styled-components';
import GoogleAdComp from './GoogleAdComp';
import { isUndefined } from 'lodash';

interface GoogleAdProps extends React.HTMLAttributes<HTMLDivElement> {}

const GoogleAd: React.FC<GoogleAdProps> = () => {
  const { data: meQuery } = useMeQuery();
  if (isUndefined(meQuery)) return null;
  return <GoogleAdComp meQuery={meQuery} />;
};

export default React.memo(GoogleAd);
