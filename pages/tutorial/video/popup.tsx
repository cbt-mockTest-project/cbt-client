import PlyrPlayer from '@components/player/PlyrPlayer';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const VideoTutorialPopupBlock = styled.div``;

const VideoTutorialPopup = () => {
  const router = useRouter();
  const videoSource = [
    {
      size: 480,
      src: 'https://moducbt-seoul.s3.ap-northeast-2.amazonaws.com/safe_video/elevator_480.mp4',
    },
    {
      size: 720,
      src: 'https://moducbt-seoul.s3.ap-northeast-2.amazonaws.com/safe_video/elevator_720.mp4',
    },
    {
      size: 1080,
      src: 'https://moducbt-seoul.s3.ap-northeast-2.amazonaws.com/safe_video/elevator_1080.mp4',
    },
  ];
  return (
    <VideoTutorialPopupBlock>
      {router.query.time !== undefined && (
        <PlyrPlayer
          sources={videoSource}
          prevPlayTime={Number(router.query.time)}
        />
      )}
    </VideoTutorialPopupBlock>
  );
};

export default VideoTutorialPopup;
