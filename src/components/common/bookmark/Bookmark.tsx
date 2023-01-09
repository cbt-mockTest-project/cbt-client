import React from 'react';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import palette from '@styles/palette';

interface BookmarkProps {
  active: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
  className?: string;
}

const Bookmark: React.FC<BookmarkProps> = ({ active, className, onClick }) => {
  return (
    <BookmarkBlock className={className} onClick={onClick}>
      {active ? (
        <StarIcon className="star-icon active" />
      ) : (
        <StarBorderOutlinedIcon className="star-icon" />
      )}
    </BookmarkBlock>
  );
};

export default Bookmark;
const BookmarkBlock = styled.button`
  position: relative;
  cursor: pointer;
  .star-icon {
  }
  .star-icon.active {
    color: ${palette.yellow_500};
  }
`;
