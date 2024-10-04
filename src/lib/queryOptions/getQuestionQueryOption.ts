import { READ_QUESTION } from '@lib/graphql/query/questionQuery';
import { ReadMockExamQuestionQuery } from '@lib/graphql/query/questionQuery.generated';
import { apolloClient } from '@modules/apollo';
import { queryOptions } from '@tanstack/react-query';
import {
  MockExamQuestion,
  ReadMockExamQuestionInput,
  ReadMockExamQuestionOutput,
} from 'types';

export const getQuestionKey = (questionId: number) => [
  'getQuestion',
  questionId,
];

export const getQuestion = async (
  input: ReadMockExamQuestionInput
): Promise<ReadMockExamQuestionOutput> => {
  try {
    const response = await apolloClient.query<ReadMockExamQuestionQuery>({
      query: READ_QUESTION,
      variables: {
        input,
      },
      fetchPolicy: 'network-only',
    });
    if (!response.data?.readMockExamQuestion) {
      return null;
    }
    return response.data?.readMockExamQuestion as ReadMockExamQuestionOutput;
  } catch (error) {
    console.error(error);
    throw error;
  }
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
