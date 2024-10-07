import { useMeQuery } from '@lib/graphql/hook/useUser';
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CreateExamForm, CreateQuestionForm } from 'customTypes';
import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { UserRole } from 'types';

const ExamObjectiveConvertorForAdminBlock = styled.div`
  margin: 20px;
`;

interface ExamObjectiveConvertorForAdminProps {
  question: CreateQuestionForm;
  setIsCoverted: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditorTextChange: (
    value: string,
    type: 'question' | 'solution'
  ) => void;
}

const ExamObjectiveConvertorForAdmin: React.FC<
  ExamObjectiveConvertorForAdminProps
> = ({ question, handleEditorTextChange, setIsCoverted }) => {
  const { data: meQuery } = useMeQuery();
  const { setValue, getValues } = useFormContext<CreateExamForm>();
  const [convertedText, setConvertedText] = useState<string>('');
  if (meQuery?.me.user.role !== UserRole.Admin) return null;
  const splitText = (text: string) => {
    let lines = text.split('\n').filter((line) => line.trim() !== '');
    const star = lines.shift();
    lines = lines.join('').split('?');
    const question = star + '<br/>' + lines.shift() + '?';

    const choicesLine = lines
      .join('')
      .split(/[①-④]|해설/)
      .slice(1) // 첫 번째 빈 요소 제거
      .map((choice) => choice.trim()) // 각 선택지 앞뒤 공백 제거
      .filter((choice) => choice !== '');
    const solution = choicesLine.pop();
    const answer = () => {
      const circleNumber = text.split('정답:')[1].trim();
      switch (circleNumber) {
        case '①':
          return 1;
        case '②':
          return 2;
        case '③':
          return 3;
        case '④':
          return 4;
      }
    };

    return {
      question,
      answer: answer(),
      solution: solution.split('정답:')[0],
      choices: choicesLine,
    };
  };
  return (
    <ExamObjectiveConvertorForAdminBlock>
      <TextArea
        placeholder="자동변환기"
        value={convertedText}
        onChange={(e) => setConvertedText(e.target.value)}
      />
      <Button
        onClick={() => {
          const splited = splitText(convertedText);
          console.log(splited);
          handleEditorTextChange(splited.question, 'question');
          handleEditorTextChange(splited.solution, 'solution');
          setValue(
            'questions',
            getValues('questions').map((v: CreateQuestionForm) => {
              if (v.orderId === question.orderId) {
                return {
                  ...v,
                  objectiveData: {
                    ...v.objectiveData,
                    answer: splited.answer,
                    content: v.objectiveData.content.map((v, index) => {
                      return {
                        ...v,
                        content: splited.choices[index],
                      };
                    }),
                  },
                };
              }
              return v;
            })
          );

          console.log(getValues('questions'));
          setIsCoverted((prev) => !prev);
        }}
      >
        변환
      </Button>
    </ExamObjectiveConvertorForAdminBlock>
  );
};

export default ExamObjectiveConvertorForAdmin;
