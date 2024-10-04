import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, ModalProps, Pagination, Select } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import EditExamItem from './EditExamItem';
import TextInput from '@components/common/input/TextInput';
import Link from 'next/link';
import { useAppSelector } from '@modules/redux/store/configureStore';
import useSearchFilterMyExamList from './hooks/useSearchFilterMyExamList';
import { useRouter } from 'next/router';

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
  .edit-exams-pagination {
    margin-top: 30px;
  }
`;

interface EditExamsModalProps extends Omit<ModalProps, 'children'> {
  categoryId: number;
}

const EditExamsModal: React.FC<EditExamsModalProps> = (props) => {
  const router = useRouter();
  const isObjective = router.pathname.includes('mcq');
  const [page, setPage] = useState(1);
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
          pathname: isObjective ? '/mcq/exam/create' : '/exam/create',
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
        {filteredData.slice((page - 1) * 10, page * 10).map((exam) => (
          <EditExamItem key={exam.id} exam={exam} />
        ))}
      </div>
      <Pagination
        simple
        className="edit-exams-pagination"
        current={page}
        total={filteredData.length}
        onChange={(page) => setPage(page)}
      />
    </EditExamsModalBlock>
  );
};

export default EditExamsModal;
