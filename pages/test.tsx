import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import PlyrPlayer, { VideoSource } from '@components/player/PlyrPlayer';
import ChatComponent from '@components/common/chat/ChatComponent';
// const PlyrPlayer = dynamic(() => import('@components/player/PlyrPlayer'), {
//   ssr: false,
// });
const Test: NextPage = () => {
  const router = useRouter();
  const videoSources: VideoSource[] = [
    {
      src: 'https://moducbt-seoul.s3.ap-northeast-2.amazonaws.com/safe_video/elevator_480.mp4',
      size: 480,
    },
    {
      src: 'https://moducbt-seoul.s3.ap-northeast-2.amazonaws.com/safe_video/elevator_720.mp4',
      size: 720,
    },
  ];
  return <ChatComponent />;
};

export default Test;
