import { gql } from '@apollo/client';

export const TOGGLE_EXAM_CATEGORY_BOOKMARK = gql`
  mutation ToggleExamCategorieBookmark(
    $input: ToggleExamCategoryBookmarkInput!
  ) {
    toggleExamCategorieBookmark(input: $input) {
      error
      isBookmarked
      ok
    }
  }
`;

export const GET_EXAM_CATEROGY_SUBSCRIBERS = gql`
  query GetExamCategorySubscribers($input: GetExamCategorySubscribersInput!) {
    getExamCategorySubscribers(input: $input) {
      error
      ok
      users {
        email
        nickname
        id
      }
    }
  }
`;

export const DELETE_EXAM_CATEGORY_BOOKMARK = gql`
  mutation DeleteExamCategoryBookmark(
    $input: DeleteExamCategoryBookmarkInput!
  ) {
    deleteExamCategoryBookmark(input: $input) {
      error
      ok
    }
  }
`;

export const CHECK_IS_ACCESSIBLE_CATEGORY = gql`
  mutation CheckIsAccessibleCategory($input: CheckIsAccessibleCategoryInput!) {
    checkIsAccessibleCategory(input: $input) {
      error
      ok
    }
  }
`;

export const CHECK_HAS_CATEGORY_ACCESS = gql`
  mutation CheckHasCategoryAccess($input: CheckHasCategoryAccessInput!) {
    checkHasCategoryAccess(input: $input) {
      error
      ok
    }
  }
`;
