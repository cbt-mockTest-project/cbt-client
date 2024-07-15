import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '@styles/palette';
import { BookmarkOutlined } from '@mui/icons-material';
import { Popconfirm } from 'antd';
import BookmarkFolderSelect from './BookmarkFolderSelect';
import { LocalStorage } from '@lib/utils/localStorage';
import { BOOKMARK_FOLDER_ID } from '@lib/constants/localStorage';

export type BookmarkChangeHandler = (active: boolean, folderId: number) => void;

interface BookmarkProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive: boolean;
  defaultFolderId?: number;
  className?: string;
  onChangeBookmark?: BookmarkChangeHandler;
}

const Bookmark: React.FC<BookmarkProps> = (props) => {
  const { isActive, onChangeBookmark, defaultFolderId, ...divProps } = props;
  const [selectedFolderId, setSelectedFolderId] = useState<number>(0);
  const localStorage = new LocalStorage();
  const onConfirm = () => {
    onChangeBookmark?.(true, selectedFolderId);
  };

  const onCancel = () => {
    onChangeBookmark?.(false, selectedFolderId);
  };

  const onChangeFolder = (folderId: number) => {
    setSelectedFolderId(folderId);
    localStorage.set(BOOKMARK_FOLDER_ID, folderId);
  };
  return (
    <Popconfirm
      title={isActive ? '북마크 수정' : '북마크 추가'}
      okText={isActive ? '수정' : '추가'}
      cancelText={isActive ? '삭제' : '취소'}
      description={
        <BookmarkFolderSelect
          size="large"
          defaultValue={
            isActive
              ? defaultFolderId || 0
              : localStorage.get(BOOKMARK_FOLDER_ID) || 0
          }
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
      <BookmarkBlock
        {...divProps}
        onClick={(e) => {
          e.stopPropagation();
          props.onClick?.(e);
        }}
      >
        {isActive ? (
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
