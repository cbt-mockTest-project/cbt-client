import Layout from '@components/common/layout/Layout';
import VideoTutorialComponent from '@components/tutorial/video/VideoTutorialComponent';
import React from 'react';
import styled from 'styled-components';

interface VideoTutorialPageProps {}

const VideoTutorialPage: React.FC<VideoTutorialPageProps> = () => {
  return (
    <StyledLayout>
      <VideoTutorialComponent />
    </StyledLayout>
  );
};

export default VideoTutorialPage;

const StyledLayout = styled(Layout)`
  background-color: #f1f4f7;
  .layout-children-wrapper {
    max-width: 1240px;
  }
`;
