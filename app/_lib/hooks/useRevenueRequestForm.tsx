import { CREATE_REVENUE_REQUEST_FORM_MUTATION } from '../graphql/query/revenueRequestFormQuery';
import {
  CreateRevenueRequestFormMutation,
  CreateRevenueRequestFormMutationVariables,
} from '../graphql/query/revenueRequestFormQuery.generated';
import { apolloClient } from '../../_modules/apollo';
import { examCategoryActions } from '../../_modules/redux/slices/examCategory';
import { useAppDispatch } from '../../_modules/redux/store/configureStore';
import { useMutation } from '@tanstack/react-query';
import {
  CreateRevenueRequestFormInput,
  RevenueRequestForm,
  RevenueRequestFormStatus,
} from '../../types';

const useRevenueRequestForm = () => {
  const dispatch = useAppDispatch();
  const useCreateRevenueRequestForm = (categoryId: number) =>
    useMutation({
      mutationKey: ['createRevenueForm', categoryId],
      mutationFn: async (input: CreateRevenueRequestFormInput) => {
        const {
          data: { createRevenueRequestForm },
        } = await apolloClient.mutate<
          CreateRevenueRequestFormMutation,
          CreateRevenueRequestFormMutationVariables
        >({
          mutation: CREATE_REVENUE_REQUEST_FORM_MUTATION,
          variables: { input },
        });
        return createRevenueRequestForm;
      },
      onSuccess: (data) => {
        if (data.ok && data.revenueRequestForm) {
          dispatch(
            examCategoryActions.setCategoryRevenueRequestForm(
              data.revenueRequestForm as RevenueRequestForm
            )
          );
        }
      },
    });

  return {
    useCreateRevenueRequestForm,
  };
};

export default useRevenueRequestForm;
