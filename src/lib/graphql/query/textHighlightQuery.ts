import { gql } from '@apollo/client';

export const INSERT_TEXT_HIGHLIGHT = gql`
  mutation InsertTextHighlight($input: InsertTextHighlightInput!) {
    insertTextHighlight(input: $input) {
      error
      ok
      textHighlight {
        data {
          memo
          endOffset
          endContainer
          color
          startContainer
          startOffset
          text
          type
        }
        id
      }
    }
  }
`;

export const DELETE_TEXT_HIGHLIGHT = gql`
  mutation DeleteTextHighlight($input: DeleteTextHighlightInput!) {
    deleteTextHighlight(input: $input) {
      error
      ok
    }
  }
`;

export const DELETE_TEXT_HIGHLIGHTS = gql`
  mutation DeleteTextHighlights($input: DeleteTextHighlightsInput!) {
    deleteTextHighlights(input: $input) {
      error
      ok
    }
  }
`;
