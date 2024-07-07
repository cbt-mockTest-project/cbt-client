import {
  EDIT_EXAM_CATEGORY,
  MOVE_EXAM_ORDER,
} from '@lib/graphql/query/examQuery';
import {
  EditMockExamCategoryMutation,
  EditMockExamCategoryMutationVariables,
  MoveExamOrderMutation,
  MoveExamOrderMutationVariables,
} from '@lib/graphql/query/examQuery.generated';
import { handleError } from '@lib/utils/utils';
import { apolloClient } from '@modules/apollo';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import {
  EditMockExamCategoryInput,
  MockExam,
  MockExamCategory,
  MoveExamOrderInput,
} from 'types';
import { queryClient } from '../../../pages/_app';
import { DropResult } from 'react-beautiful-dnd';

export interface EditCategoryMutationInput {
  mutationInput: EditMockExamCategoryInput;
  onSuccess?: () => void;
}

export interface MoveExamOrderMutationInput {
  mutationInput: MoveExamOrderInput;
  dropResult: DropResult;
  exams: MockExam[];
  onError?: () => void;
}

const useCategoryMutation = (urlSlug: string) => {
  const editCategoryMutation = useMutation({
    mutationFn: async (input: EditCategoryMutationInput) => {
      const response = await apolloClient.mutate<
        EditMockExamCategoryMutation,
        EditMockExamCategoryMutationVariables
      >({
        mutation: EDIT_EXAM_CATEGORY,
        variables: {
          input: input.mutationInput,
        },
      });
      return response.data.editMockExamCategory;
    },
    onError: (error) => {
      handleError(error);
      message.error('암기장 수정에 실패했습니다.');
    },
    onSuccess: (data, input) => {
      if (data.error) {
        return message.error(data.error);
      }
      queryClient.setQueryData<MockExamCategory>(
        ['getCategory', urlSlug],
        (prev) => {
          return {
            ...prev,
            ...input.mutationInput,
          };
        }
      );
      if (input.onSuccess) {
        input.onSuccess();
      }
    },
  });

  const moveExamOrderMutation = useMutation({
    mutationFn: async (input: MoveExamOrderMutationInput) => {
      try {
        const response = await apolloClient.mutate<
          MoveExamOrderMutation,
          MoveExamOrderMutationVariables
        >({
          mutation: MOVE_EXAM_ORDER,
          variables: {
            input: input.mutationInput,
          },
        });
        if (response.data.moveExamOrder.error) {
          if (input.onError) {
            input.onError();
          }
          return message.error(response.data.moveExamOrder.error);
        }
        return response.data.moveExamOrder;
      } catch (error) {
        throw error;
      }
    },
    onError: (error, input) => {
      if (input.onError) {
        input.onError();
      }
      handleError(error);
      message.error('암기장 순서 변경에 실패했습니다.');
    },
  });
  return { editCategoryMutation, moveExamOrderMutation };
};

export default useCategoryMutation;
