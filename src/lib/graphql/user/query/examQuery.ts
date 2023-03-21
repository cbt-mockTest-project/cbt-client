import { gql } from '@apollo/client';

export const READ_EXAM_CATEGORIES_QUERY = gql`
  query ReadAllMockExamCategories {
    readAllMockExamCategories {
      categories {
        name
        id
        user {
          role
        }
      }
      error
      ok
    }
  }
`;

export const EDIT_EXAM_CATEGORY = gql`
  mutation EditMockExamCategory($input: EditMockExamCategoryInput!) {
    editMockExamCategory(input: $input) {
      error
      ok
    }
  }
`;

export const READ_MY_EXAM_CATEORIES_QUERY = gql`
  query ReadMyMockExamCategories {
    readMyMockExamCategories {
      categories {
        name
        id
      }
      error
      ok
    }
  }
`;

export const EDIT_MOCK_EXAM = gql`
  mutation EditMockExam($input: EditMockExamInput!) {
    editMockExam(input: $input) {
      error
      ok
    }
  }
`;

export const DELETE_MOCK_EXAM = gql`
  mutation DeleteMockExam($input: DeleteMockExamInput!) {
    deleteMockExam(input: $input) {
      error
      ok
    }
  }
`;

export const DELETE_MOCK_EXAM_CATEGORY = gql`
  mutation DeleteMockExamCategory($input: DeleteMockExamCategoryInput!) {
    deleteMockExamCategory(input: $input) {
      error
      ok
    }
  }
`;

export const CREATE_MOCK_EXAM_TITLE = gql`
  mutation CreateMockExam($input: CreateMockExamInput!) {
    createMockExam(input: $input) {
      error
      mockExam {
        id
        title
      }
      ok
    }
  }
`;

export const CREATE_MOCK_EXAM_CATEGORY = gql`
  mutation CreateMockExamCategory($input: CreateMockExamCategoryInput!) {
    createMockExamCategory(input: $input) {
      category {
        id
        name
      }
      error
      ok
    }
  }
`;

export const READ_EXAM_TITLES_QUERY = gql`
  query ReadMockExamTitlesByCateory($input: ReadMockExamTitlesByCateoryInput!) {
    readMockExamTitlesByCateory(input: $input) {
      titles {
        id
        title
        status
        role
      }
      ok
      error
    }
  }
`;

export const FIND_MY_EXAM_HISTORY_QUERY = gql`
  query FindMyExamHistory($input: FindMyExamHistoryInput!) {
    findMyExamHistory(input: $input) {
      error
      ok
      titleAndId {
        id
        title
      }
    }
  }
`;

export const READ_ALL_MOCK_EXAM = gql`
  query ReadAllMockExam($input: ReadAllMockExamsInput!) {
    readAllMockExam(input: $input) {
      error
      mockExams {
        id
      }
      ok
    }
  }
`;
