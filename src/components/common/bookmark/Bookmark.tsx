import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import palette from '@styles/palette';
import { BookmarkOutlined } from '@mui/icons-material';
import { Popconfirm, Select } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import BookmarkFolderSelect from './BookmarkFolderSelect';
import OuterClick from '../outerClick/OuterClick';
import { LocalStorage } from '@lib/utils/localStorage';
import { BOOKMARK_FOLDER_ID } from '@lib/constants/localStorage';

interface BookmarkProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultActive: boolean;
  className?: string;
  onBookmarkChange?: (active: boolean, folderId: number) => void;
}

const Bookmark: React.FC<BookmarkProps> = (props) => {
  const { defaultActive, onBookmarkChange, ...divProps } = props;
  const [active, setActive] = useState(defaultActive);
  const [selectedFolderId, setSelectedFolderId] = useState<number>(0);
  const localStorage = new LocalStorage();
  const onConfirm = () => {
    if (active) {
      setActive(true);
      onBookmarkChange?.(true, selectedFolderId);
      // 수정
    }
    if (!active) {
      setActive(true);
      // 추가
    }
  };

  const onCancel = () => {
    if (active) {
      // 삭제
      setActive(false);
      onBookmarkChange?.(false, selectedFolderId);
    }
    if (!active) {
      // 수정
      setActive(true);
      onBookmarkChange?.(true, selectedFolderId);
    }
  };

  const onChangeFolder = (folderId: number) => {
    setSelectedFolderId(folderId);
    localStorage.set(BOOKMARK_FOLDER_ID, folderId);
  };

  return (
    <Popconfirm
      title={active ? '북마크 수정' : '북마크 추가'}
      okText={active ? '수정' : '추가'}
      cancelText={active ? '삭제' : '취소'}
      description={
        <BookmarkFolderSelect
          size="large"
          defaultValue={localStorage.get(BOOKMARK_FOLDER_ID) || 0}
          onChange={onChangeFolder}
        />
      }
      icon={null}
      rootClassName="bookmark-popconfirm"
      okButtonProps={{ size: 'large' }}
      cancelButtonProps={{ size: 'large' }}
      placement="bottomRight"
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <BookmarkBlock {...divProps}>
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
