import { gql } from '@apollo/client';

export const EDIT_NOTICE = gql`
  mutation EditNotice($input: EditNoticeInput!) {
    editNotice(input: $input) {
      error
      ok
    }
  }
`;

export const DELETE_NOTICE = gql`
  mutation DeleteNotice($input: DeleteNoticeInput!) {
    deleteNotice(input: $input) {
      error
      ok
    }
  }
`;

export const DELETE_ALL_NOTICE = gql`
  mutation DeleteAllNoticesOfMe {
    deleteAllNoticesOfMe {
      error
      ok
    }
  }
`;
