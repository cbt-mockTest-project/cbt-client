import React from 'react';
import styled from 'styled-components';

interface GoogleAdProps {
  className?: string;
}

const GoogleAd: React.FC<GoogleAdProps> = ({ className }) => {
  const isProd = process.env.NODE_ENV === 'production';
  return (
    <GoogleAdContainer className={className}>
      {isProd ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="fluid"
          data-ad-layout-key="-fb+5w+4e-db+86"
          data-ad-client="ca-pub-9145855450425143"
          data-ad-slot="8354887143"
        />
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
