import { gql } from '@apollo/client';

export const READ_QUESTION_CARD_CATEGORIES = gql`
  query ReadMyQuestionCardCategories {
    readMyQuestionCardCategories {
      error
      ok
      categories {
        created_at
        id
        name
        updated_at
      }
    }
  }
`;

export const CREATE_QUESTION_CARD_CATEGORY = gql`
  mutation CreateQuestionCardCategory(
    $input: CreateQuestionCardCategoryInput!
  ) {
    createQuestionCardCategory(input: $input) {
      category {
        name
        id
        created_at
        updated_at
      }
      error
      ok
    }
  }
`;

export const UPDATE_QUESTION_CARD_CATEGORY = gql`
  mutation UpdateQuestionCardCategory(
    $input: UpdateQuestionCardCategoryInput!
  ) {
    updateQuestionCardCategory(input: $input) {
      error
      ok
      category {
        created_at
        updated_at
        id
        name
      }
    }
  }
`;

export const DELETE_QUESTION_CARD_CATEGORY = gql`
  mutation DeleteQuestionCardCategory(
    $input: DeleteQuestionCardCategoryInput!
  ) {
    deleteQuestionCardCategory(input: $input) {
      error
      ok
    }
  }
`;

export const READ_QUESTION_CARDS = gql`
  query ReadMyQuestionCards($input: ReadMyQuestionCardsInput!) {
    readMyQuestionCards(input: $input) {
      error
      ok
      questionCards {
        created_at
        id
        question
        solution
        updated_at
      }
    }
  }
`;

export const CREATE_QUESTION_CARD = gql`
  mutation CreateQuestionCard($input: CreateQuestionCardInput!) {
    createQuestionCard(input: $input) {
      error
      ok
      questionCard {
        id
        question
        solution
        updated_at
        created_at
      }
    }
  }
`;

export const UPDATE_QUESTION_CARD = gql`
  mutation UpdateQuestionCard($input: UpdateQuestionCardInput!) {
    updateQuestionCard(input: $input) {
      error
      ok
      questionCard {
        id
        question
        solution
      }
    }
  }
`;

export const DELETE_QUESTION_CARD = gql`
  mutation DeleteQuestionCards($input: DeleteQuestionCardsInput!) {
    deleteQuestionCards(input: $input) {
      error
      ok
    }
  }
`;
