import { PlusOutlined } from '@ant-design/icons';
import useExamCategory from '@lib/hooks/useExamCategory';
import palette from '@styles/palette';
import { Button, Divider, Modal, ModalProps, Select } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import EditExamItem from './EditExamItem';
import TextInput from '@components/common/input/TextInput';

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
      color: ${palette.textColor};
    }
  }
  .edit-my-exams-list {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .edit-exams-filter-box {
    margin-bottom: 10px;
    display: flex;
    align-items: flex-end;
    gap: 10px;
  }
`;

interface EditExamsModalProps extends Omit<ModalProps, 'children'> {}

const EditExamsModal: React.FC<EditExamsModalProps> = (props) => {
  const { fetchMyExams, myExams, handleFilterMyExams } = useExamCategory();
  const { ...modalProps } = props;

  useEffect(() => {
    fetchMyExams();
  }, []);
  return (
    <EditExamsModalBlock {...modalProps} footer={false}>
      <p className="edit-exams-modal-title">시험지 추가</p>
      <Button className="edit-exams-make-button" type="dashed" size="large">
        <PlusOutlined />
        <span>시험지 만들기</span>
      </Button>
      <div className="edit-exams-filter-box">
        <Select
          className="edit-exams-filter-select"
          defaultValue="내 시험지"
          options={[
            {
              label: '내 시험지',
              value: '내 시험지',
            },
            {
              label: '저장된',
              value: '저장된',
            },
          ]}
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
