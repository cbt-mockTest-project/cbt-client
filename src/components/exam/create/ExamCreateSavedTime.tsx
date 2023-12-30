import { convertToKST } from '@lib/utils/utils';
import palette from '@styles/palette';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

const ExamCreateSavedTimeBlock = styled.div`
  font-size: 12px;
  color: ${palette.colorSubText};
  transition: all 0.3s;
`;

interface ExamCreateSavedTimeProps {}

const ExamCreateSavedTime: React.FC<ExamCreateSavedTimeProps> = () => {
  const [time, setTime] = useState('');
  const { formState } = useFormContext();
  useEffect(() => {
    if (formState.isSubmitSuccessful && !formState.isSubmitting) {
      setTime(new Date().toISOString());
    }
  }, [formState]);
  return (
    <ExamCreateSavedTimeBlock>
      {time ? `${convertToKST(time, 'yy-MM-dd hh:mm:ss')} 저장됨` : ''}
    </ExamCreateSavedTimeBlock>
  );
};

export default React.memo(ExamCreateSavedTime);
