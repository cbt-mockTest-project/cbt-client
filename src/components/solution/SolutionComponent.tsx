import ExamSolutionList from '@components/exam/solution/ExamSolutionList';
import { useLazyReadQuestionsByExamId } from '@lib/graphql/user/hook/useExamQuestion';
import { READ_QUESTIONS_BY_ID } from '@lib/graphql/user/query/questionQuery';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { responsive } from '@lib/utils/responsive';
import { convertExamTitle } from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import { Button } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
const ClickMonAd = dynamic(() => import('@components/common/ad/ClickMonAd'), {
  ssr: false,
});

interface SolutionComponentProps {
  questionsQuery: ReadMockExamQuestionsByMockExamIdQuery;
}

const SolutionComponent: React.FC<SolutionComponentProps> = ({
  questionsQuery,
}) => {
  const [readQuestions, { data: questionsQueryOnClientSide }] =
    useLazyReadQuestionsByExamId('network-only');
  const [isSolutionAllHide, setIsSolutionAllHide] = useState(false);
  const client = useApollo({}, '');
  const router = useRouter();
  const title = questionsQuery.readMockExamQuestionsByMockExamId.title;
  useEffect(() => {
    (async () => {
      if (router.query.Id) {
        const res = await readQuestions({
          variables: {
            input: { id: Number(String(router.query.Id)), isRandom: false },
          },
        });
        if (res.data?.readMockExamQuestionsByMockExamId.ok) {
          client.writeQuery<ReadMockExamQuestionsByMockExamIdQuery>({
            query: READ_QUESTIONS_BY_ID,
            data: {
              readMockExamQuestionsByMockExamId:
                res.data.readMockExamQuestionsByMockExamId,
            },
          });
        }
      }
    })();
  }, [router.query.Id]);
  const questions = (questionsQueryOnClientSide || questionsQuery)
    .readMockExamQuestionsByMockExamId.questions;
  const onToggleSolutionAllHide = () =>
    setIsSolutionAllHide(!isSolutionAllHide);
  return (
    <SolutionComponentContainer>
      <Button
        onClick={onToggleSolutionAllHide}
        className="exam-solution-page-solution-all-hide-button"
        type="primary"
      >
        {isSolutionAllHide ? '정답 모두 보이기' : '정답 모두 가리기'}
      </Button>
      <h1 className="not-draggable">{convertExamTitle(title)} 문제/해설</h1>
      <ul>
        {questions.map((el, index) => {
          return (
            <div key={index}>
              <ExamSolutionList
                isSolutionAllHide={isSolutionAllHide}
                question={el}
                title={convertExamTitle(title)}
              />
              {index % 3 === 1 && questions.length - 1 !== index && (
                <ClickMonAd />
              )}
            </div>
          );
        })}
      </ul>
    </SolutionComponentContainer>
  );
};

export default SolutionComponent;

const SolutionComponentContainer = styled.div`
  margin-bottom: 50px;
  padding: 20px;
  h1 {
    padding: 0px 20px 0px 20px;
    font-size: 1.3rem;
  }
  .exam-solution-page-solution-all-hide-button {
    margin: 0 0 10px 15px;
  }
  @media (max-width: ${responsive.medium}) {
    h1 {
      font-size: 1.1rem;
    }
  }
  .solution-page-google-ad {
    margin-top: 20px;
  }
`;
