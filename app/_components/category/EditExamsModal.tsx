import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, ModalProps, Select } from 'antd';
import React from 'react';
import styled from 'styled-components';
import EditExamItem from './EditExamItem';
import TextInput from '../common/input/TextInput';
import Link from 'next/link';
import { useAppSelector } from '../../_modules/redux/store/configureStore';
import useSearchFilterMyExamList from './hooks/useSearchFilterMyExamList';

const EditExamsModalBlock = styled(Modal)`
  .edit-exams-filter-select {
    width: 150px;
  }
  .edit-exams-modal-title {
    font-size: 18px;
    font-weight: bold;
  }
  .edit-exams-make-button {
    margin-top: 20px;
    svg {
      color: ${({ theme }) => theme.color('colorText')};
    }
  }
  .edit-my-exams-list {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .edit-exams-filter-box {
    margin-top: 20px;
    margin-bottom: 10px;
    display: flex;
    align-items: flex-end;
    gap: 10px;
  }
`;

interface EditExamsModalProps extends Omit<ModalProps, 'children'> {
  categoryId: number;
}

const EditExamsModal: React.FC<EditExamsModalProps> = (props) => {
  const myExams = useAppSelector((state) => state.examCategory.myExams);
  const myBookmarkedExams = useAppSelector(
    (state) => state.examCategory.myBookmarkedExams
  );
  const { filteredData, handleSearch, handleSelectType } =
    useSearchFilterMyExamList({
      meData: myExams,
      bookmarkedData: myBookmarkedExams,
    });
  const { categoryId, ...modalProps } = props;

  return (
    <EditExamsModalBlock {...modalProps} footer={false}>
      <p className="edit-exams-modal-title">시험지 추가</p>
      <Link
        href={{
          pathname: '/exam/create',
          query: categoryId
            ? {
                categoryId,
              }
            : {},
        }}
      >
        <Button className="edit-exams-make-button" type="dashed" size="large">
          <PlusOutlined />
          <span>시험지 만들기</span>
        </Button>
      </Link>
      <div className="edit-exams-filter-box">
        <Select
          className="edit-exams-filter-select"
          defaultValue="me"
          options={[
            {
              label: '내 시험지',
              value: 'me',
            },
            {
              label: '저장된',
              value: 'bookmarked',
            },
          ]}
          onChange={(value) => handleSelectType(value as 'me' | 'bookmarked')}
        />
        <TextInput
          placeholder="시험지 필터링"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="edit-my-exams-list">
        {filteredData.map((exam) => (
          <EditExamItem key={exam.id} exam={exam} />
        ))}
      </div>
    </EditExamsModalBlock>
  );
};

export default EditExamsModal;
