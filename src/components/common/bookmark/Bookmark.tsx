import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import palette from '@styles/palette';
import { BookmarkOutlined } from '@mui/icons-material';
import { Popconfirm, Select } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import BookmarkFolderSelect from './BookmarkFolderSelect';
import OuterClick from '../outerClick/OuterClick';

interface BookmarkProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultActive: boolean;
  className?: string;
}

const Bookmark: React.FC<BookmarkProps> = (props) => {
  const { defaultActive, ...divProps } = props;
  const [active, setActive] = useState(defaultActive);
  const [popConfirmOpen, setPopConfirmOpen] = useState(false);
  const onConfirm = () => {
    if (active) {
      // 수정
    }
    if (!active) {
      // 추가
    }
    setPopConfirmOpen(false);
  };

  const onCancel = () => {
    if (active) {
      // 삭제
    }
    if (!active) {
      // 수정
    }
    setPopConfirmOpen(false);
  };
  return (
    <Popconfirm
      title={active ? '북마크 수정' : '북마크 추가'}
      okText={active ? '수정' : '추가'}
      cancelText={active ? '삭제' : '수정'}
      description={<BookmarkFolderSelect size="large" />}
      icon={null}
      rootClassName="bookmark-popconfirm"
      okButtonProps={{ size: 'large' }}
      cancelButtonProps={{ size: 'large' }}
      placement="bottomLeft"
      open={popConfirmOpen}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <BookmarkBlock
        {...divProps}
        onClick={() => setPopConfirmOpen((prev) => !prev)}
      >
        {active ? (
          <BookmarkOutlined className="star-icon active" />
        ) : (
          <BookmarkOutlined className="star-icon" />
        )}
      </BookmarkBlock>
    </Popconfirm>
  );
};

export default Bookmark;
const BookmarkBlock = styled.div`
  position: relative;
  cursor: pointer;
  .star-icon {
    transition: color 0.2s linear;
    color: ${({ theme }) => theme.color('colorTextTertiary')};
    font-size: 34px !important;
  }
  .star-icon.active {
    color: ${palette.yellow_500};
  }
`;
