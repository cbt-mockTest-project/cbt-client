import { MeQuery } from '../../../_lib/graphql/query/userQuery.generated';
import { checkRole } from '../../../_lib/utils/utils';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const GoogleAdCompBlock = styled.div``;

interface GoogleAdCompProps {
  meQuery: MeQuery;
}

const GoogleAdComp: React.FC<GoogleAdCompProps> = ({ meQuery }) => {
  const isProd = process.env.NODE_ENV === 'production';
  const isAdVisible = !checkRole({
    roleIds: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    meQuery,
  });
  const loadAds = () => {
    try {
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {}
        );
      }
    } catch (error: any) {}
  };
  useEffect(() => {
    loadAds();
  }, []);
  return (
    <>
      {isProd ? (
        isAdVisible ? (
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-9145855450425143"
            data-ad-slot="2844801903"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : null
      ) : (
        <div
          style={{
            background: '#e9e9e9',
            color: 'black',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '16px',
            height: '130px',
            width: '100%',
          }}
        />
      )}
    </>
  );
};

export default GoogleAdComp;
