import { READ_EXAM_CATEGORY_BY_ID } from '@lib/graphql/query/examQuery';
import { ReadMockExamCategoryByCategoryIdQuery } from '@lib/graphql/query/examQuery.generated';
import { READ_QUESTION } from '@lib/graphql/query/questionQuery';
import { ReadMockExamQuestionQuery } from '@lib/graphql/query/questionQuery.generated';
import { apolloClient } from '@modules/apollo';
import { queryOptions } from '@tanstack/react-query';
import { MockExamQuestion, ReadMockExamQuestionInput } from 'types';

export const getQuestionKey = (questionId: number) => [
  'getQuestion',
  questionId,
];

export const getQuestion = async (
  input: ReadMockExamQuestionInput
): Promise<MockExamQuestion> => {
  const response = await apolloClient.query<ReadMockExamQuestionQuery>({
    query: READ_QUESTION,
    variables: {
      input,
    },
    fetchPolicy: 'network-only',
  });
  const question = response.data?.readMockExamQuestion.mockExamQusetion;
  return question as MockExamQuestion;
};

export interface GetQuestionQueryOptionProps {
  queryKey: string[];
  input: ReadMockExamQuestionInput;
  enabled?: boolean;
}

export const getQuestionQueryOption = ({
  queryKey,
  input,
  enabled = true,
}: GetQuestionQueryOptionProps) =>
  queryOptions({ queryKey, queryFn: () => getQuestion(input), enabled });
