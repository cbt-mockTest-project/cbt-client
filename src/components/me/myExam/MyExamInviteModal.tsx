import Modal, { ModalProps } from '@components/common/modal/Modal';
import {
  useCreateExamCategoryViewer,
  useDeleteExamCategoryViewer,
  useLazyGetExamCategoryViewers,
} from '@lib/graphql/user/hook/useExamViewer';
import { useLazyGetUser } from '@lib/graphql/user/hook/useUser';
import { handleError } from '@lib/utils/utils';
import { Clear } from '@mui/icons-material';
import { Button, Input, List, Select, message } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ExamViewer } from 'types';

const MyExamInviteModalBlock = styled(Modal)`
  min-width: 380px;
  padding: 30px 20px;
  .my-exam-invite-modal-inner {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .modal-close-button {
    right: -10px;
  }

  .my-exam-invite-selector {
    width: 100%;
  }
  .my-exam-invite-list-item-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  li.ant-list-item {
    padding-right: 2px;
  }
`;

interface MyExamInviteModalProps extends Omit<ModalProps, 'children'> {
  categories: DefaultOptionType[];
}

const MyExamInviteModal: React.FC<MyExamInviteModalProps> = (props) => {
  const { categories, ...modalProps } = props;
  const [selectedCategory, setSelectedCategory] =
    useState<DefaultOptionType | null>(null);
  const [getUser] = useLazyGetUser();
  const [invitedViewers, setInvitedViewers] = useState<ExamViewer[]>([]);
  const [createExamCategoryViewer] = useCreateExamCategoryViewer();
  const [deleteExamCategoryViewer] = useDeleteExamCategoryViewer();
  const [getExamCategoryViewers] = useLazyGetExamCategoryViewers();
  const handleOnSearch = async (value: string) => {
    try {
      const res = await getUser({
        variables: { input: { keyword: value } },
      });
      if (res.data?.getUserByNicknameOrEmail.ok) {
        const viewer = res.data.getUserByNicknameOrEmail.user;
        const confirmed = confirm(
          `${res.data.getUserByNicknameOrEmail.user?.nickname}님을 초대하시겠습니까?`
        );
        if (confirmed && viewer) {
          // TODO: 초대하기 기능 구현
          const res = await createExamCategoryViewer({
            variables: {
              input: {
                categoryId: Number(selectedCategory?.value),
                viewerId: viewer.id,
              },
            },
          });
          if (res.data?.createExamCategoryViewer.ok) {
            setInvitedViewers((prev) => [
              ...prev,
              res.data?.createExamCategoryViewer.examViewer as ExamViewer,
            ]);
            return message.success('초대되었습니다.');
          }
          return message.error(res.data?.createExamCategoryViewer.error);
        }
      }
      return message.error(res.data?.getUserByNicknameOrEmail.error);
    } catch (e) {
      handleError(e);
    }
  };
  const handleCategoryChange = async (option: DefaultOptionType) => {
    try {
      setInvitedViewers([]);
      setSelectedCategory(option);
      const res = await getExamCategoryViewers({
        variables: { input: { categoryId: Number(option.value) } },
      });
      if (res.data?.getExamCategoryViewers.ok) {
        if (
          res.data.getExamCategoryViewers.examViewers &&
          res.data.getExamCategoryViewers.examViewers.length >= 1
        ) {
          setInvitedViewers(
            res.data.getExamCategoryViewers.examViewers as ExamViewer[]
          );
        }
      }
    } catch (e) {
      handleError(e);
    }
  };

  const handleDeleteExamViewer = async (
    categoryId: number,
    examViewerId: number
  ) => {
    console.log(categoryId, examViewerId);
    try {
      const confirmed = confirm('정말로 삭제하시겠습니까?');
      if (confirmed) {
        const res = await deleteExamCategoryViewer({
          variables: { input: { categoryId, examViewerId } },
        });
        if (res.data?.deleteExamCategoryViewer.ok) {
          setInvitedViewers((prev) =>
            prev.filter((viewer) => viewer.id !== examViewerId)
          );
          return message.success('삭제되었습니다.');
        }
        return message.error(res.data?.deleteExamCategoryViewer.error);
      }
    } catch (e) {
      handleError(e);
    }
  };
  return (
    <MyExamInviteModalBlock {...modalProps}>
      <div className="my-exam-invite-modal-inner">
        <Select
          className="my-exam-invite-selector"
          placeholder="카테고리를 선택해주세요."
          onChange={(value, option) =>
            handleCategoryChange(option as DefaultOptionType)
          }
          value={selectedCategory}
          options={categories}
        />
        <Input.Search
          onSearch={handleOnSearch}
          placeholder="닉네임을 입력해주세요."
          disabled={!!!selectedCategory}
        />
        <List
          header={<div>초대된 사람 목록</div>}
          dataSource={invitedViewers}
          style={{ maxHeight: '400px', overflowY: 'scroll' }}
          bordered
          renderItem={(viewer) => (
            <List.Item key={viewer.id}>
              <div className="my-exam-invite-list-item-wrapper">
                <div>{viewer.user.nickname}</div>
                <Button
                  onClick={() =>
                    handleDeleteExamViewer(
                      Number(selectedCategory?.value),
                      viewer.id
                    )
                  }
                  type="text"
                >
                  <Clear />
                </Button>
              </div>
            </List.Item>
          )}
        />
      </div>
    </MyExamInviteModalBlock>
  );
};

export default MyExamInviteModal;
