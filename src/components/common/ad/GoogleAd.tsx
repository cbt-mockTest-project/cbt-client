import React, { useEffect } from 'react';
import styled from 'styled-components';

interface GoogleAdProps {
  className?: string;
  type: 'feed' | 'display';
}

const GoogleAd: React.FC<GoogleAdProps> = ({ className, type }) => {
  const isProd = process.env.NODE_ENV === 'production';
  useEffect(() => {
    var ads = document.getElementsByClassName('adsbygoogle').length;
    for (var i = 0; i < ads; i++) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {}
        );
      } catch (e) {}
    }
  }, []);
  const GoogleAdsIns: React.FC = () => {
    if (type === 'feed') {
      return (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-9145855450425143"
          data-ad-slot="9696511094"
          data-ad-layout-key="-fb+5w+4e-db+86"
          data-ad-format="fluid"
        />
      );
    }
    if (type === 'display') {
      return (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-9145855450425143"
          data-ad-slot="9804306393"
          data-ad-format="auto"
          data-full-width-responsive="true"
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
          }}
        />
      )}
    </GoogleAdContainer>
  );
};

export default GoogleAd;

const GoogleAdContainer = styled.div``;
