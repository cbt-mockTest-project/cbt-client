import { gql } from '@apollo/client';

export const READ_VISIT_COUNT = gql`
  query ReadVisitCount {
    readVisitCount {
      count
      error
      ok
    }
  }
`;

export const CREATE_VISIT = gql`
  mutation CreateVisit {
    createVisit {
      error
      ok
    }
  }
`;
