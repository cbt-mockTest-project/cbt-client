import { PlusOutlined } from '@ant-design/icons';
import useExamCategory from '@lib/hooks/useExamCategory';
import palette from '@styles/palette';
import { Button, Modal, ModalProps, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EditExamItem from './EditExamItem';
import TextInput from '@components/common/input/TextInput';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppSelector } from '@modules/redux/store/configureStore';

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
  const { fetchMyExams, handleFilterMyExams } = useExamCategory();
  const myExams = useAppSelector((state) => state.examCategory.myExams);
  const { data: meQuery } = useMeQuery();
  const [examType, setExamType] = useState<'me' | 'bookmarked'>('me');
  const { categoryId, ...modalProps } = props;

  useEffect(() => {
    if (!meQuery?.me.user) return;
    fetchMyExams({
      isBookmarked: examType === 'bookmarked',
    });
  }, [meQuery, examType]);
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
          value={examType}
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
          onChange={setExamType}
        />
        <TextInput
          placeholder="시험지 필터링"
          onChange={(e) => handleFilterMyExams(e.target.value)}
        />
      </div>

      <div className="edit-my-exams-list">
        {myExams.map((exam) => (
          <EditExamItem key={exam.id} exam={exam} />
        ))}
      </div>
    </EditExamsModalBlock>
  );
};

export default EditExamsModal;
