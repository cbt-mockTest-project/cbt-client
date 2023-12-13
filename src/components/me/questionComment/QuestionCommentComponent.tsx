import {
  useReadExamTitleAndIdByComment,
  useLazyReadMyQuestionComments,
} from '@lib/graphql/hook/useQusetionComment';
import { ReadMyQuestionCommentsQuery } from '@lib/graphql/query/questionCommentQuery.generated';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Select } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import parse from 'html-react-parser';
import ExamHistorySkeleton from '../examhistory/ExamHistorySkeleton';
import EditorStyle from '@styles/editorStyle';

interface QuestionCommentComponentProps {}

const QuestionCommentComponent: React.FC<
  QuestionCommentComponentProps
> = () => {
  const { data: examTitleAndIdData } = useReadExamTitleAndIdByComment();
  const [
    readQuestionComments,
    { data: readQuestionCommentsData, loading: readQuestionCommentsLoading },
  ] = useLazyReadMyQuestionComments();
  const [selectedExamId, setSelectedExamId] = useState<number>(0);
  const [titleAndIds, setTitleAndIds] = useState<DefaultOptionType[]>([
    { label: '전체', value: 0 },
  ]);
  const [questions, setQuestions] = useState<
    ReadMyQuestionCommentsQuery['readMyQuestionComments']['questions']
  >([]);
  useEffect(() => {
    readQuestionComments({
      variables: {
        input: {
          examId: selectedExamId,
        },
      },
    });
  }, [selectedExamId]);
  useEffect(() => {
    if (
      readQuestionCommentsData &&
      readQuestionCommentsData.readMyQuestionComments.ok
    ) {
      setQuestions(readQuestionCommentsData.readMyQuestionComments.questions);
    }
  }, [readQuestionCommentsData]);
  useEffect(() => {
    if (
      examTitleAndIdData &&
      examTitleAndIdData.readExamTitleAndIdByQuestionComment.examTitleAndId &&
      titleAndIds.length === 1
    ) {
      const titleAndIds: DefaultOptionType[] =
        examTitleAndIdData.readExamTitleAndIdByQuestionComment.examTitleAndId?.map(
          (exam) => ({
            label: exam.title,
            value: exam.id,
          })
        );
      setTitleAndIds([{ label: '전체', value: 0 }, ...titleAndIds]);
    }
  }, [examTitleAndIdData]);
  if (!examTitleAndIdData) return <ExamHistorySkeleton />;
  return (
    <QuestionCommentComponentContainer>
      <Select
        className="my-question-comment-select"
        options={titleAndIds}
        value={selectedExamId}
        onChange={(value) => setSelectedExamId(value as number)}
      />
      {readQuestionCommentsLoading ? (
        <ExamHistorySkeleton />
      ) : (
        <ul className="my-question-comment-list">
          {questions?.map((question) => (
            <li className="my-question-comment-list-item" key={question.id}>
              <div className="my-question-comment-list-item-question-wrapper">
                <a
                  href={
                    process.env.NEXT_PUBLIC_CLIENT_URL +
                    `/question/${question.id}`
                  }
                  target="_blank"
                  className="my-question-comment-list-item-label-wrapper"
                  rel="noreferrer"
                >
                  <p className="my-question-comment-list-item-label">문제</p>
                  <OpenInNewIcon />
                </a>
                <p className="my-question-comment-list-item-question">
                  {parse(question.question || '')}
                </p>
              </div>
              <div className="my-question-comment-list-item-comment-wrapper">
                <p className="my-question-comment-list-item-label">
                  내가 쓴 댓글
                </p>
                <ul className="my-question-comment-list-item-comment-list">
                  {question.mockExamQuestionComment.map((comment, index) => (
                    <li key={comment.id}>
                      <p className="my-question-comment-list-item-comment">
                        {question.mockExamQuestionComment.length > 1
                          ? `${index + 1}. ${comment.content}`
                          : comment.content}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </QuestionCommentComponentContainer>
  );
};

export default QuestionCommentComponent;

const QuestionCommentComponentContainer = styled.div`
  font-size: 0.9rem;
  .my-question-comment-select {
    width: 100%;
    max-width: 500px;
  }
  .my-question-comment-list {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  .my-question-comment-list-item-label {
    color: ${palette.gray_700};
  }
  .my-question-comment-list-item-question-wrapper {
    padding: 10px;
    background-color: ${palette.gray_100};
    border-radius: 5px;
    ${EditorStyle}
  }
  .my-question-comment-list-item-comment-wrapper {
    padding: 0 10px;
    margin-top: 10px;
  }
  .my-question-comment-list-item-comment-list {
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .my-question-comment-list-item-label-wrapper {
    display: flex;
    gap: 5px;
    align-items: center;
    .my-question-comment-list-item-label,
    svg {
      transition: 0.2s;
    }
    :hover {
      .my-question-comment-list-item-label,
      svg {
        color: ${palette.antd_blue_01};
      }
    }
    svg {
      font-size: 1.1rem;
    }
  }
  @media (max-width: ${responsive.medium}) {
    margin-top: 20px;
    padding: 0 20px;
  }
`;
