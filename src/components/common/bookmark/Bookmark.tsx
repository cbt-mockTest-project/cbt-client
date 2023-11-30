import React from 'react';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import palette from '@styles/palette';

interface BookmarkProps extends React.HTMLAttributes<HTMLDivElement> {
  active: boolean;
  className?: string;
}

const Bookmark: React.FC<BookmarkProps> = (props) => {
  const { active, ...divProps } = props;
  return (
    <BookmarkBlock {...divProps}>
      {active ? (
        <StarIcon className="star-icon active" />
      ) : (
        <StarBorderOutlinedIcon className="star-icon" />
      )}
    </BookmarkBlock>
  );
};

export default Bookmark;
const BookmarkBlock = styled.div`
  position: relative;
  cursor: pointer;
  .star-icon {
    color: ${palette.gray_700};
  }
  .star-icon.active {
    color: ${palette.yellow_500};
  }
`;
