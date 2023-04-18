import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { READ_QUESTION_STATE_QUERY } from '@lib/graphql/user/query/questionStateQuery';
import { ReadMyExamQuestionStateQuery } from '@lib/graphql/user/query/questionStateQuery.generated';
import { handleError } from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import { checkboxOption } from 'customTypes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QuestionState } from 'types';
import SquareSelectbox from './SquareSelectbox';

interface SquareSelectboxGroupProps {
  options: checkboxOption[];
  gap?: number;
  onClick: (value: checkboxOption['value']) => void;
  currentQuestionId: number;
}

interface SquareSelectboxGroupCssProps
  extends Pick<SquareSelectboxGroupProps, 'gap'> {}

const SquareSelectboxGroup: React.FC<SquareSelectboxGroupProps> = ({
  options,
  onClick,
  gap = 10,
  currentQuestionId,
}) => {
  const router = useRouter();
  const client = useApollo({}, '');
  const { data: meQuery } = useMeQuery();
  const [selectedState, setSelectedState] = useState<string>(
    QuestionState.Core
  );

  const requestReadQuestions = async () => {
    try {
      if (!currentQuestionId || !meQuery?.me.user) {
        return;
      }
      const stateQuery = await client.query<ReadMyExamQuestionStateQuery>({
        query: READ_QUESTION_STATE_QUERY,
        variables: {
          input: {
            questionId: currentQuestionId,
          },
        },
        fetchPolicy: 'network-only',
      });

      if (stateQuery.data.readMyExamQuestionState.ok) {
        setSelectedState(stateQuery.data.readMyExamQuestionState.state.state);
      } else {
        setSelectedState(QuestionState.Core);
      }
    } catch (e) {
      handleError(e);
    }
  };

  useEffect(() => {
    requestReadQuestions();
  }, [router.query.q]);
  const requestOnclick = (value: string) => {
    try {
      onClick(value);
      setSelectedState(value);
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <SquareSelectboxGroupContainer gap={gap} id="square-select-box-group">
      {options.map((option, index) => {
        return (
          <SquareSelectbox
            option={option}
            key={index}
            selected={option.value === selectedState}
            onClick={() => requestOnclick(String(option.value))}
          />
        );
      })}
    </SquareSelectboxGroupContainer>
  );
};

export default SquareSelectboxGroup;

const SquareSelectboxGroupContainer = styled.div<SquareSelectboxGroupCssProps>`
  display: flex;
  gap: ${(props) => props.gap}px;
`;
