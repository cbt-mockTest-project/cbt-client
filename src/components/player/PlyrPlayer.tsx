import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface PlyrPlayerBlockProps extends Pick<PlyrPlayerProps, 'width'> {}

const PlyrPlayerBlock = styled.div<PlyrPlayerBlockProps>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
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

  useEffect(() => {
    if (!videoRef.current) return;
    const player = new Plyr(videoRef.current, {
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'captions',
        'settings',
        'pip',
        'airplay',
        'fullscreen',
        'restart',
        'quality',
      ],
    });
    player.source = {
      type: 'video',
      sources,
    };

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
    let savedTime = 0;
    player.on('ready', () => {
      player.quality = defaultQulity;
    });
    player.on('loadeddata', () => {
      player.currentTime = savedTime || prevPlayTime;
    });
    player.on('timeupdate', () => {
      savedTime = player.currentTime;
    });
  }, [sources]);

  return (
    <PlyrPlayerBlock width={width}>
      <video ref={videoRef} autoPlay playsInline controls />
    </PlyrPlayerBlock>
  );
};

export default PlyrPlayer;
