import { Button, Modal, ModalProps, Radio } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

const SelectExamTypeModalBlock = styled(Modal)`
  .select-exam-type-modal-inner {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    gap: 10px;
  }
`;

interface SelectExamTypeModalProps extends Omit<ModalProps, 'children'> {
  categoryId: number;
}

const SelectExamTypeModal: React.FC<SelectExamTypeModalProps> = (props) => {
  const { categoryId, ...modalProps } = props;
  const router = useRouter();
  const [examType, setExamType] = useState<'subjective' | 'objective'>(
    'subjective'
  );
  const onClickCreateButton = () => {
    router.push({
      pathname: '/exam/create',
      query: categoryId
        ? {
            categoryId,
            examType,
          }
        : {
            examType,
          },
    });
  };
  return (
    <SelectExamTypeModalBlock {...modalProps} footer={false}>
      <div className="select-exam-type-modal-inner">
        <div>시험지 유형을 선택해주세요.</div>
        <Radio.Group
          defaultValue="subjective"
          optionType="button"
          value={examType}
          onChange={(e) => {
            setExamType(e.target.value);
          }}
        >
          <Radio.Button value="subjective">주관식</Radio.Button>
          <Radio.Button value="objective">객관식</Radio.Button>
        </Radio.Group>
        <Button onClick={onClickCreateButton} type="primary">
          만들기
        </Button>
      </div>
    </SelectExamTypeModalBlock>
  );
};

export default SelectExamTypeModal;
