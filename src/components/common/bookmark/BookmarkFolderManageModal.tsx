import { App, Modal, ModalProps } from 'antd';
import React from 'react';
import styled from 'styled-components';
import BookmarkFolderItem from './BookmarkFolderItem';
import {
  useCreateQuestionBookmarkFolderMutation,
  useDeleteQuestionBookmarkFolderMutation,
  useUpdateQuestionBookmarkFolderMutation,
} from '@lib/mutation/questionBookmarkMutation';
import BookmarkFolderAddButton from './BookmarkFolderAddButton';
import { useQuery } from '@tanstack/react-query';
import { readQuestionBookmarkFolderQueryOption } from '@lib/queryOptions/readQusetionBookmarkFolderQueryOption';

const BookmarkFolderManageModalBlock = styled(Modal)``;

interface BookmarkFolderManageModalProps extends Omit<ModalProps, 'children'> {}

const BookmarkFolderManageModal: React.FC<BookmarkFolderManageModalProps> = (
  props
) => {
  const { ...modalProps } = props;
  const { data } = useQuery(readQuestionBookmarkFolderQueryOption);
  const { modal } = App.useApp();
  const updateFolderMutation = useUpdateQuestionBookmarkFolderMutation();
  const deleteFolderMutation = useDeleteQuestionBookmarkFolderMutation();
  const onDelete = (id: number) => {
    modal.confirm({
      title: '삭제',
      content: '삭제하시겠습니까?',
      onOk: () => deleteFolderMutation.mutate({ id }),
    });
  };

  const onEdit = (id: number, name: string) => {
    updateFolderMutation.mutate({ id, name });
  };

  return (
    <BookmarkFolderManageModalBlock
      {...modalProps}
      footer={null}
      title="북마크 폴더 관리"
    >
      <BookmarkFolderAddButton />
      {data?.readQuestionBookmarkFolders.folders.map((folder) => (
        <BookmarkFolderItem
          key={folder.id}
          defaultName={folder.name}
          onDelete={() => onDelete(folder.id)}
          onEdit={(name) => onEdit(folder.id, name)}
        />
      ))}
    </BookmarkFolderManageModalBlock>
  );
};
export default BookmarkFolderManageModal;
