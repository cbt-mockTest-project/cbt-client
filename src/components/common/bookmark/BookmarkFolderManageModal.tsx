import { App, Modal, ModalProps } from 'antd';
import React from 'react';
import styled from 'styled-components';
import BookmarkFolderItem from './BookmarkFolderItem';

const BookmarkFolderManageModalBlock = styled(Modal)``;

interface BookmarkFolderManageModalProps extends Omit<ModalProps, 'children'> {}

const BookmarkFolderManageModal: React.FC<BookmarkFolderManageModalProps> = (
  props
) => {
  const { ...modalProps } = props;

  const { modal } = App.useApp();
  const bookmarkFolders = [
    {
      id: 1,
      title: '즐겨찾기 폴더 1',
    },
    {
      id: 2,
      title: '즐겨찾기 폴더 2',
    },
  ];

  const onDelete = () => {
    modal.confirm({
      title: '삭제',
      content: '삭제하시겠습니까?',
      onOk: () => alert('삭제'),
    });
  };

  const onEdit = (title: string) => {
    console.log(title);
  };

  return (
    <BookmarkFolderManageModalBlock
      {...modalProps}
      footer={null}
      title="북마크 폴더 관리"
    >
      {bookmarkFolders.map((folder) => (
        <BookmarkFolderItem
          key={folder.id}
          defaultTitle={folder.title}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </BookmarkFolderManageModalBlock>
  );
};
export default BookmarkFolderManageModal;
