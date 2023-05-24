import { isServer } from '@lib/utils/utils';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

interface PlyrPlayerBlockProps extends Pick<PlyrPlayerProps, 'width'> {
  customButtonVisible: boolean;
}

const PlyrPlayerBlock = styled.div<PlyrPlayerBlockProps>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  position: relative;
  video {
    width: 100%;
    aspect-ratio: 3 / 2;
  }
  .plyr__controls__item.plyr__time--current.plyr__time {
    color: white;
  }
  .icon--not-pressed {
    fill: white;
  }
  .plyr__controls__item {
    svg {
      fill: white;
    }
  }
  .plyr__control.custom-button {
    position: absolute;
    right: 11px; /* 원하는 위치로 조정 */
    bottom: 10px;
    width: 32px;
    height: 32px;
    z-index: 999;
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
    ${(props) =>
      !props.customButtonVisible &&
      css`
        opacity: 0;
      `}
  }
  .plyr__controls__item.plyr__control:last-child {
    visibility: hidden;
  }
`;
const CustomButton = styled.button`
  position: absolute;
  right: 50px; /* 원하는 위치로 조정 */
  top: 50px; /* 원하는 위치로 조정 */
`;

export interface VideoSource {
  src: string;
  size: number;
}

interface PlyrPlayerProps {
  width?: string | number;
  sources: VideoSource[];
  prevPlayTime?: number;
  defaultQulity?: number;
}

const PlyrPlayer: React.FC<PlyrPlayerProps> = ({
  width = '100%',
  prevPlayTime = 0,
  defaultQulity = 480,
  sources,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [customButtonVisible, setCustomeButtonVisible] = useState(false);
  const savedTime = useRef<number>(0);
  useEffect(() => {
    if (!videoRef.current || isServer()) return;
    const commonControls = [
      'play-large',
      'play',
      'progress',
      'current-time',
      'mute',
      'captions',
      'settings',
      'airplay',
      'fullscreen',
      'quality',
      'custom-button',
    ];
    const player = new Plyr(videoRef.current, {
      controls: commonControls,
    });
    player.source = {
      type: 'video',
      sources,
    };
    player.volume = 0;

    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
          e.preventDefault();
          player.paused ? player.play() : player.pause();
          break;
        case 'ArrowRight':
          e.preventDefault();
          player.currentTime += 10;
          break;
        case 'ArrowLeft':
          e.preventDefault();
          player.currentTime -= 10;
          break;
      }
    };
    window.addEventListener('keydown', handleKeydown);
    player.on('ready', () => {
      player.quality = defaultQulity;
    });
    player.on('loadeddata', () => {
      player.currentTime = savedTime.current || prevPlayTime;
    });
    player.on('timeupdate', () => {
      savedTime.current = player.currentTime;
    });
    player.on('controlsshown', () => {
      setCustomeButtonVisible(true);
    });
    player.on('controlshidden', () => {
      setCustomeButtonVisible(false);
    });

    const handleCustomButtonClick = (e: Event) => {
      player.pause();
      window.open(
        `/tutorial/video/popup?time=${savedTime.current}`,
        '_blank',
        'toolbar=no,status=no,menubar=no,resizable=yes, location=no, top=100,left=100,width=480,height=270,scrollbars=true'
      );
    };
    // 커스텀 버튼 클릭 이벤트 리스너 추가
    const customButton = document.querySelector('.custom-button');
    customButton?.addEventListener('click', handleCustomButtonClick);
    return () => {
      // 커스텀 버튼 클릭 이벤트 리스너 제거
      customButton?.removeEventListener('click', handleCustomButtonClick);
    };
  }, [sources]);

  useEffect(() => {
    console.log(savedTime.current);
  }, [savedTime]);

  return (
    <PlyrPlayerBlock width={width} customButtonVisible={customButtonVisible}>
      <video ref={videoRef} autoPlay playsInline controls />
      <div className="plyr__controls">
        {/* 커스텀 버튼 */}
        <button type="button" className="plyr__control custom-button">
          <svg
            className="icon--not-pressed"
            aria-hidden="true"
            focusable="false"
          >
            <use href="#plyr-enter-fullscreen"></use>
          </svg>
        </button>
      </div>
    </PlyrPlayerBlock>
  );
};

export default PlyrPlayer;
