import {
  DELETE_TEXT_HIGHLIGHT,
  DELETE_TEXT_HIGHLIGHTS,
  INSERT_TEXT_HIGHLIGHT,
} from '@lib/graphql/query/textHighlightQuery';
import {
  DeleteTextHighlightMutation,
  DeleteTextHighlightMutationVariables,
  DeleteTextHighlightsMutation,
  DeleteTextHighlightsMutationVariables,
  InsertTextHighlightMutation,
  InsertTextHighlightMutationVariables,
} from '@lib/graphql/query/textHighlightQuery.generated';
import { apolloClient } from '@modules/apollo';
import {
  DeleteTextHighlightInput,
  DeleteTextHighlightsInput,
  InsertTextHighlightInput,
} from 'types';

export const insertTextHighlightMutationFn = (
  input: InsertTextHighlightInput
) => {
  return apolloClient.mutate<
    InsertTextHighlightMutation,
    InsertTextHighlightMutationVariables
  >({
    mutation: INSERT_TEXT_HIGHLIGHT,
    variables: { input },
  });
};

export const deleteTextHighlightMutationFn = (
  input: DeleteTextHighlightInput
) => {
  return apolloClient.mutate<
    DeleteTextHighlightMutation,
    DeleteTextHighlightMutationVariables
  >({
    mutation: DELETE_TEXT_HIGHLIGHT,
    variables: { input },
  });
};

export const deleteTextHighlightsMutationFn = (
  input: DeleteTextHighlightsInput
) => {
  return apolloClient.mutate<
    DeleteTextHighlightsMutation,
    DeleteTextHighlightsMutationVariables
  >({
    mutation: DELETE_TEXT_HIGHLIGHTS,
    variables: { input },
  });
};
