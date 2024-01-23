import {
  useCreateCategoryEvaluation,
  useGetCategoryEvaluation,
  useDeleteCategoryEvaluation,
  useUpdateCategoryEvaluation,
} from '@lib/graphql/hook/useCategoryEvaluation';
import { useMemo } from 'react';
import useAuth from './useAuth';
import { GetCategoryEvaluationQuery } from '@lib/graphql/query/categoryEvaluationQuery.generated';
import { GET_CATEGORY_EVALUATION_QUERY } from '@lib/graphql/query/categoryEvaluationQuery';
import { message } from 'antd';
import { cloneDeep } from 'lodash';

const useCategoryEvaluation = (categoryId: number) => {
  const { user, handleCheckLogin } = useAuth();
  const { data } = useGetCategoryEvaluation({
    categoryId,
  });
  const [createCategoryEvaluation] = useCreateCategoryEvaluation();
  const [updateCategoryEvaluation] = useUpdateCategoryEvaluation();
  const [deleteCategoryEvaluation] = useDeleteCategoryEvaluation();

  const categoryEvaluations =
    data?.getCategoryEvaluation.categoryEvaluations || [];
  const { scoreAverage, scoreCount, myEvaluation } = useMemo(() => {
    if (!categoryEvaluations || categoryEvaluations.length === 0)
      return { scoreAverage: 0, scoreCount: 0 };
    const scoreAverage =
      categoryEvaluations.reduce((acc, cur) => acc + cur.score, 0) /
      categoryEvaluations.length;
    const scoreCount = categoryEvaluations.length;
    const myEvaluation = categoryEvaluations.find(
      (categoryEvaluation) => categoryEvaluation.user.id === user?.id
    );
    return { scoreAverage, scoreCount, myEvaluation };
  }, [categoryEvaluations]);

  const handleCreateCategoryEvaluation = async (
    score: number,
    feedback: string = ''
  ) => {
    try {
      if (!handleCheckLogin()) return;
      const { data } = await createCategoryEvaluation({
        variables: {
          input: {
            categoryId,
            score,
            feedback,
          },
        },
        update(cache, { data: { createCategoryEvaluation } }) {
          const data = cloneDeep(
            cache.readQuery<GetCategoryEvaluationQuery>({
              query: GET_CATEGORY_EVALUATION_QUERY,
              variables: {
                input: {
                  categoryId,
                },
              },
            })
          );
          data.getCategoryEvaluation.categoryEvaluations = [
            createCategoryEvaluation.categoryEvaluation,
            ...data.getCategoryEvaluation.categoryEvaluations,
          ];
          cache.writeQuery<GetCategoryEvaluationQuery>({
            query: GET_CATEGORY_EVALUATION_QUERY,
            variables: {
              input: {
                categoryId,
              },
            },
            data,
          });
        },
      });
      if (data.createCategoryEvaluation.error) {
        return message.error(data.createCategoryEvaluation.error);
      }
      message.success('등록되었습니다.');
    } catch (e) {
      message.error('등록에 실패했습니다.');
    }
  };

  const handleUpdateCategoryEvaluation = async (
    score: number,
    feedback: string = ''
  ) => {
    try {
      if (!myEvaluation) return message.error('수정할 리뷰가 없습니다.');
      const { data } = await updateCategoryEvaluation({
        variables: {
          input: {
            id: myEvaluation.id,
            score,
            feedback,
          },
        },
        update(cache) {
          const data = cloneDeep(
            cache.readQuery<GetCategoryEvaluationQuery>({
              query: GET_CATEGORY_EVALUATION_QUERY,
              variables: {
                input: {
                  categoryId,
                },
              },
            })
          );
          const index =
            data.getCategoryEvaluation.categoryEvaluations.findIndex(
              (categoryEvaluation) => categoryEvaluation.id === myEvaluation.id
            );
          data.getCategoryEvaluation.categoryEvaluations[index] = {
            ...myEvaluation,
            score,
            feedback,
          };
          cache.writeQuery<GetCategoryEvaluationQuery>({
            query: GET_CATEGORY_EVALUATION_QUERY,
            variables: {
              input: {
                categoryId,
              },
            },
            data,
          });
        },
      });
      if (data.updateCategoryEvaluation.error) {
        return message.error(data.updateCategoryEvaluation.error);
      }
      message.success('수정되었습니다.');
    } catch (e) {
      message.error('수정에 실패했습니다.');
    }
  };

  const handleDeleteCategoryEvaluation = async () => {
    try {
      if (!myEvaluation) return message.error('삭제할 리뷰가 없습니다.');
      const { data } = await deleteCategoryEvaluation({
        variables: {
          input: {
            id: myEvaluation.id,
          },
        },
        update(cache) {
          const data = cloneDeep(
            cache.readQuery<GetCategoryEvaluationQuery>({
              query: GET_CATEGORY_EVALUATION_QUERY,
              variables: {
                input: {
                  categoryId,
                },
              },
            })
          );
          const index =
            data.getCategoryEvaluation.categoryEvaluations.findIndex(
              (categoryEvaluation) => categoryEvaluation.id === myEvaluation.id
            );
          data.getCategoryEvaluation.categoryEvaluations.splice(index, 1);
          cache.writeQuery<GetCategoryEvaluationQuery>({
            query: GET_CATEGORY_EVALUATION_QUERY,
            variables: {
              input: {
                categoryId,
              },
            },
            data,
          });
        },
      });
      if (data.deleteCategoryEvaluation.error) {
        return message.error(data.deleteCategoryEvaluation.error);
      }
      message.success('삭제되었습니다.');
    } catch (e) {
      message.error('삭제에 실패했습니다.');
    }
  };

  return {
    handleCreateCategoryEvaluation,
    handleUpdateCategoryEvaluation,
    handleDeleteCategoryEvaluation,
    categoryEvaluations,
    scoreAverage,
    scoreCount,
    myEvaluation,
  };
};

export default useCategoryEvaluation;
