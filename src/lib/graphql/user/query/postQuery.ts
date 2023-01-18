import { FULL_POST_FRAGMENT } from './postFragment';
import { gql } from '@apollo/client';

export const READ_POST = gql`
  query ReadPost($input: ReadPostInput!) {
    readPost(input: $input) {
      error
      ok
      post {
        ...PostParts
      }
    }
  }
  ${FULL_POST_FRAGMENT}
`;

export const READ_POSTS = gql`
  query ReadPosts($input: ReadPostsInput!) {
    readPosts(input: $input) {
      count
      error
      ok
      posts {
        ...PostParts
      }
    }
  }
  ${FULL_POST_FRAGMENT}
`;

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      error
      ok
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($input: DeletePostInput!) {
    deletePost(input: $input) {
      error
      ok
    }
  }
`;

export const EDIT_POST = gql`
  mutation EditPost($input: EditPostInput!) {
    editPost(input: $input) {
      content
      error
      ok
      title
    }
  }
`;

export const VIEW_POST = gql`
  mutation ViewPost($input: ViewPostInput!) {
    viewPost(input: $input) {
      error
      ok
    }
  }
`;
