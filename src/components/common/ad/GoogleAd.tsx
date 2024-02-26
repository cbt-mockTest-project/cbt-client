import { useMeQuery } from '@lib/graphql/hook/useUser';
import { checkRole } from '@lib/utils/utils';
import React, { useEffect } from 'react';
import styled from 'styled-components';

interface GoogleAdProps {
  className?: string;
  type: 'feed' | 'display' | 'content' | 'multiflex';
}

const GoogleAd: React.FC<GoogleAdProps> = ({ className, type = 'display' }) => {
  const isProd = process.env.NODE_ENV === 'production';
  const { data: meQuery } = useMeQuery();
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
  // if (checkRole({ roleIds: [1, 2, 3, 4, 5, 6, 7], meQuery })) return null;
  const GoogleAdsIns: React.FC = () => {
    if (type === 'feed') {
      return (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="fluid"
          data-ad-layout-key="-fb+5w+4e-db+86"
          data-ad-client="ca-pub-9145855450425143"
          data-ad-slot="9696511094"
        />
      );
    }
    if (type === 'display') {
      return (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-9145855450425143"
          data-ad-slot="2844801903"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      );
    }
    if (type === 'content') {
      return (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-9145855450425143"
          data-ad-slot="5194197298"
        />
      );
    }
    if (type === 'multiflex') {
      return (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="autorelaxed"
          data-ad-client="ca-pub-9145855450425143"
          data-ad-slot="2272853627"
        />
      );
    }
    return null;
  };

  return (
    <GoogleAdContainer className={className}>
      {isProd ? (
        <GoogleAdsIns />
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
    </GoogleAdContainer>
  );
};

export default React.memo(GoogleAd);

const GoogleAdContainer = styled.div`
  width: 100%;
`;
