import { BookmarkOutlined } from '@mui/icons-material';
import palette from '@styles/palette';
import React from 'react';
import styled from 'styled-components';

const ExamBookmarkBlock = styled.button<{ isBookmarked: boolean }>`
  svg {
    font-size: 26px;
  }
  color: ${(props) =>
    props.isBookmarked ? palette.yellow_500 : palette.colorSubText};
`;

interface ExamBookmarkProps {
  isBookmarked?: boolean;
  handleToggleBookmark: React.MouseEventHandler<HTMLButtonElement>;
}

const ExamBookmark: React.FC<ExamBookmarkProps> = ({
  isBookmarked = false,
  handleToggleBookmark,
}) => {
  return (
    <ExamBookmarkBlock
      isBookmarked={isBookmarked}
      onClick={handleToggleBookmark}
    >
      <BookmarkOutlined />
    </ExamBookmarkBlock>
  );
};

export default ExamBookmark;
