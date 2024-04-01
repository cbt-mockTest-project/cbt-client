import { useMeQuery } from '@lib/graphql/hook/useUser';
import React from 'react';
import styled from 'styled-components';
import GoogleAdComp from './GoogleAdComp';
import { isUndefined } from 'lodash';

interface GoogleAdProps extends React.HTMLAttributes<HTMLDivElement> {}

const GoogleAd: React.FC<GoogleAdProps> = (props) => {
  const { data: meQuery } = useMeQuery();

  return (
    <GoogleAdContainer {...props}>
      {isUndefined(meQuery) ? null : <GoogleAdComp meQuery={meQuery} />}
    </GoogleAdContainer>
  );
};

export default React.memo(GoogleAd);

const GoogleAdContainer = styled.div`
  margin: 10px 0;
  width: 100%;
`;
