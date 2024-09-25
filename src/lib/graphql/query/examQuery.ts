import { gql } from '@apollo/client';

export const READ_EXAM_CATEGORIES_QUERY = gql`
  query ReadAllMockExamCategories($input: ReadAllMockExamCategoriesInput) {
    readAllMockExamCategories(input: $input) {
      categories {
        name
        id
        user {
          nickname
          role
        }
        partner {
          id
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
  query ReadMyMockExamCategories($input: ReadMyMockExamCategoriesInput) {
    readMyMockExamCategories(input: $input) {
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
        description
        isPublic
        urlSlug
        examType
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
        slug
        order
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

export const UPDATE_EXAM_ORDER = gql`
  mutation UpdateExamOrder($input: UpdateExamOrderInput!) {
    updateExamOrder(input: $input) {
      error
      ok
    }
  }
`;

export const CREATE_EXAM_CATEGORY_VIEWER = gql`
  mutation CreateExamCategoryViewer($input: CreateExamCategoryViewerInput!) {
    createExamCategoryViewer(input: $input) {
      error
      ok
      examViewer {
        isApprove
        id
        user {
          id
          nickname
        }
      }
    }
  }
`;

export const GET_EXAM_CATEGORY_VIEWERS = gql`
  query GetExamCategoryViewers($input: GetExamCategoryViewrsInput!) {
    getExamCategoryViewers(input: $input) {
      error
      ok
      examViewers {
        id
        isApprove
        user {
          email
          nickname
        }
      }
    }
  }
`;

export const DELETE_EXAM_CATEGORY_VIEWER = gql`
  mutation DeleteExamCategoryViewer($input: DeleteExamCategoryViewerInput!) {
    deleteExamCategoryViewer(input: $input) {
      error
      ok
    }
  }
`;

export const UPDATE_EXAM_VIEWER_APPROVE_STATE = gql`
  mutation UpdateExamViewerApproveState(
    $input: UpdateExamViewerApproveStateInput!
  ) {
    updateExamViewerApproveState(input: $input) {
      error
      ok
    }
  }
`;

export const GET_INVITED_EXAMS = gql`
  query GetInvitedExams {
    getInvitedExams {
      error
      ok
      examViewers {
        id
        isApprove
        examCategory {
          id
          name
          user {
            nickname
          }
        }
      }
    }
  }
`;

export const READ_EXAM_CATEGORY_BY_EXAM_ID = gql`
  query ReadMockExamCategoryByExamId(
    $input: ReadMockExamCategoryByExamIdInput!
  ) {
    readMockExamCategoryByExamId(input: $input) {
      error
      ok
      category {
        id
        name
      }
    }
  }
`;

export const READ_EXAM_CATEGORIES = gql`
  query ReadMockExamCategories($input: ReadMockExamCategoriesInput!) {
    readMockExamCategories(input: $input) {
      categories {
        id
        name
      }
    }
  }
`;

export const READ_EXAM_CATEGORY_IDS = gql`
  query ReadMockExamCategoryIds {
    readMockExamCategoryIds {
      error
      ids
      ok
    }
  }
`;

export const GET_CATEGORY_NAMES_AND_SLUGS = gql`
  query GetCategoryNamesAndSlugs($input: GetCategoryNamesAndSlugsInput!) {
    getCategoryNamesAndSlugs(input: $input) {
      urlSlugs
      ok
      names
      error
    }
  }
`;

export const READ_EXAM_CATEGORY_BY_ID = gql`
  query ReadMockExamCategoryByCategoryId(
    $input: ReadMockExamCategoryByCategoryIdInput!
  ) {
    readMockExamCategoryByCategoryId(input: $input) {
      category {
        hasAccess
        isBookmarked
        id
        source
        name
        description
        isPublic
        urlSlug
        revenueRequestForm {
          status
          reason
        }
        mockExam {
          slug
          title
          id
          accesibleRoleIds
          mockExamQuestion {
            id
          }
          user {
            profileImg
            id
            nickname
          }
          isBookmarked
        }
        user {
          profileImg
          id
          nickname
        }
      }
      error
      ok
    }
  }
`;

export const GET_EXAM_CATEGORIES_FOR_ADMIN = gql`
  query GetExamCategoriesForAdmin {
    getExamCategoriesForAdmin {
      error
      ok
      categories {
        order
        created_at
        categoryEvaluations {
          score
        }
        isBookmarked
        id
        urlSlug
        name
        isPublic
        source
        user {
          profileImg
          id
          nickname
        }
        mockExam {
          id
          isPremium
        }
      }
    }
  }
`;

export const GET_EXAM_CATEGORIES_V2 = gql`
  query GetExamCategoriesV2($input: GetExamCategoriesInputV2!) {
    getExamCategoriesV2(input: $input) {
      ok
      error
      categories {
        examCount
        evaluationCount
        order
        created_at
        categoryEvaluations {
          score
        }
        examType
        isBookmarked
        id
        urlSlug
        name
        isPublic
        source
        user {
          profileImg
          id
          nickname
        }
      }
    }
  }
`;

export const GET_EXAM_CATEGORIES = gql`
  query GetExamCategories($input: GetExamCategoriesInput!) {
    getExamCategories(input: $input) {
      ok
      error
      categories {
        examCount
        evaluationCount
        order
        created_at
        categoryEvaluations {
          score
        }
        examType
        isBookmarked
        id
        urlSlug
        name
        isPublic
        source
        user {
          profileImg
          id
          nickname
        }
      }
    }
  }
`;

export const GET_MY_EXAMS = gql`
  query GetMyExams($input: GetMyExamsInput!) {
    getMyExams(input: $input) {
      error
      exams {
        id
        slug
        title
        isBookmarked
        mockExamQuestion {
          id
        }
        user {
          profileImg
          id
          nickname
        }
      }
      ok
    }
  }
`;

export const ADD_EXAM_TO_CATEGORY = gql`
  mutation AddExamToCategory($input: AddExamToCategoryInput!) {
    addExamToCategory(input: $input) {
      error
      ok
    }
  }
`;

export const REMOVE_EXAM_FROM_CATEGORY = gql`
  mutation RemoveExamFromCategory($input: RemoveExamFromCategoryInput!) {
    removeExamFromCategory(input: $input) {
      error
      ok
    }
  }
`;

export const GET_MY_EXAM_CATEGORIES = gql`
  query GetMyExamCategories {
    getMyExamCategories {
      error
      categories {
        id
        name
        isPublic
        user {
          id
          nickname
          profileImg
        }
      }
      ok
    }
  }
`;

export const READ_MOCK_EXAM = gql`
  query ReadMockExam($input: ReadMockExamInput!) {
    readMockExam(input: $input) {
      error
      ok
      mockExam {
        id
        title
        uuid
        approved
        mockExamQuestion {
          id
          orderId
          linkedQuestionIds
          question_img {
            url
            name
            uid
          }
          solution_img {
            url
            uid
            name
          }
          question
          solution
          objectiveData {
            answer
            content {
              content
              url
            }
          }
        }
      }
    }
  }
`;

export const SAVE_EXAM = gql`
  mutation SaveExam($input: SaveExamInput!) {
    saveExam(input: $input) {
      error
      ok
      examId
    }
  }
`;

export const GET_EXAM_CATEGORY_LEARNING_PROGRESS = gql`
  query GetExamCategoryLearningProgress(
    $input: GetExamCategoryLearningProgressInput!
  ) {
    getExamCategoryLearningProgress(input: $input) {
      error
      ok
      lowScoreCount
      highScoreCount
      totalQuestionCount
    }
  }
`;

export const GET_MY_ALL_EXAM_CATEGORIES_LEARNING_PROGRESS = gql`
  query GetMyAllExamCategoriesLearningProgress {
    getMyAllExamCategoriesLearningProgress {
      error
      highScoreCount
      lowScoreCount
      ok
      totalQuestionCount
    }
  }
`;

export const MOVE_EXAM_ORDER = gql`
  mutation MoveExamOrder($input: MoveExamOrderInput!) {
    moveExamOrder(input: $input) {
      error
      ok
    }
  }
`;
