import React from 'react';
import styled from 'styled-components';
import GoogleAd from './GoogleAd';
import { Clear } from '@mui/icons-material';

const GoogleAdModalBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  .google-ad-modal-inner {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .google-ad-modal-content {
      position: relative;
      z-index: 101;
      min-width: 300px;
      max-width: 800px;
      max-height: 600px;
      display: flex;
      align-items: center;
      justify-content: center;
      .google-ad-modal-content-close {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        svg {
          font-size: 16px;
        }
      }
    }
    .google-ad-modal-dimmed {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }
  }
`;

interface GoogleAdModalProps {
  onClose: () => void;
}

const GoogleAdModal: React.FC<GoogleAdModalProps> = ({ onClose }) => {
  return (
    <GoogleAdModalBlock>
      <div className="google-ad-modal-inner">
        <div className="google-ad-modal-dimmed" />

        <div className="google-ad-modal-content">
          <div className="google-ad-modal-content-close" onClick={onClose}>
            <Clear />
          </div>
          <GoogleAd />
        </div>
      </div>
    </GoogleAdModalBlock>
  );
};
export default GoogleAdModal;
