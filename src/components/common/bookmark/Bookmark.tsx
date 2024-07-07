import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '@styles/palette';
import { BookmarkOutlined } from '@mui/icons-material';

interface BookmarkProps extends React.HTMLAttributes<HTMLDivElement> {
  active: boolean;
  className?: string;
}

const Bookmark: React.FC<BookmarkProps> = (props) => {
  const { active, ...divProps } = props;
  return (
    <BookmarkBlock {...divProps}>
      {active ? (
        <BookmarkOutlined className="star-icon active" />
      ) : (
        <BookmarkOutlined className="star-icon" />
      )}
    </BookmarkBlock>
  );
};

export default Bookmark;
const BookmarkBlock = styled.div`
  position: relative;
  cursor: pointer;
  .star-icon {
    transition: color 0.2s linear;
    color: ${({ theme }) => theme.color('colorTextTertiary')};
  }
  .star-icon.active {
    color: ${palette.yellow_500};
  }
`;
