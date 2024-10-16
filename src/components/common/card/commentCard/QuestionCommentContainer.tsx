import {
  useDeleteQuestionCommnet,
  useEditQuestionCommnet,
} from '@lib/graphql/hook/useQusetionComment';
import { useEditQuestionCommentLike } from '@lib/graphql/hook/useQusetionCommentLike';
import { useMeQuery } from '@lib/graphql/hook/useUser';
import { FULL_QUESTION_COMMENT_FRAGMENT } from '@lib/graphql/query/questionCommentFragment';
import { READ_QUESTION_COMMENT } from '@lib/graphql/query/questionCommentQuery';
import { ReadMockExamQuestionCommentsByQuestionIdQuery } from '@lib/graphql/query/questionCommentQuery.generated';
import useInput from '@lib/hooks/useInput';
import { handleError } from '@lib/utils/utils';
import { apolloClient } from '@modules/apollo';
import { App } from 'antd';
import React, { useState } from 'react';
import {
  CommentCardProps,
  QuestionCommentContainerProps,
} from './CommentCard.interface';
import CommentCardView from './CommentCardView';

const QuestionCommentContainer: React.FC<QuestionCommentContainerProps> = ({
  option,
  className,
}) => {
  const { message } = App.useApp();
  const { data: meQuery } = useMeQuery();
  const [editState, setEditState] = useState(false);
  const { value: content, onChange: onChangeContent } = useInput(
    option.content
  );
  const [deleteCommentMutation] = useDeleteQuestionCommnet();
  const [editCommentMutation, { loading: editLoading }] =
    useEditQuestionCommnet();
  const [editCommentLike, { loading: likeLoading }] =
    useEditQuestionCommentLike();
  const requestDelete = async () => {
    try {
      const confirmed = confirm('삭제하시겠습니까?');
      if (confirmed) {
        const res = await deleteCommentMutation({
          variables: { input: { id: option.id } },
        });
        if (res.data?.deleteMockExamQuestionComment.ok) {
          let queryResult =
            apolloClient.readQuery<ReadMockExamQuestionCommentsByQuestionIdQuery>(
              {
                query: READ_QUESTION_COMMENT,
                variables: {
                  input: { questionId: option.parrentId },
                },
              }
            );
          const prevComments =
            queryResult?.readMockExamQuestionCommentsByQuestionId.comments;
          if (queryResult && prevComments) {
            const newComments = prevComments.filter(
              (el) => el.id !== option.id
            );
            apolloClient.writeQuery({
              query: READ_QUESTION_COMMENT,
              data: {
                readMockExamQuestionCommentsByQuestionId: {
                  ...queryResult.readMockExamQuestionCommentsByQuestionId,
                  comments: newComments,
                },
              },
              variables: { input: { questionId: option.parrentId } },
            });
          }
          return message.success('댓글이 삭제됐습니다.');
        }
        return message.error(res.data?.deleteMockExamQuestionComment.error);
      }
    } catch (e) {
      handleError(e);
    }
  };
  const toggleEdit = () => {
    setEditState(!editState);
  };
  const requestEdit = async () => {
    try {
      const confirmed = confirm('수정하시겠습니까?');
      if (confirmed) {
        const res = await editCommentMutation({
          variables: { input: { content, id: option.id } },
        });
        if (res.data?.editMockExamQuestionComment.ok) {
          const currentComment = apolloClient.readFragment({
            id: `MockExamQuestionComment:${option.id}`,
            fragment: FULL_QUESTION_COMMENT_FRAGMENT,
          });
          apolloClient.writeFragment({
            id: `MockExamQuestionComment:${option.id}`,
            fragment: FULL_QUESTION_COMMENT_FRAGMENT,
            data: {
              ...currentComment,
              content,
            },
          });
          setEditState(false);
          return message.success('댓글이 수정됐습니다.');
        }
        return message.error(res.data?.editMockExamQuestionComment.error);
      }
    } catch (e) {
      handleError(e);
    }
  };
  const requestLike = async () => {
    try {
      if (!meQuery?.me.user) {
        return message.error('로그인이 필요합니다.');
      }
      const res = await editCommentLike({
        variables: { input: { commentId: option.id } },
      });
      if (res.data?.editMockExamQuestionCommentLike.ok) {
        const currentComment = apolloClient.readFragment({
          id: `MockExamQuestionComment:${option.id}`,
          fragment: FULL_QUESTION_COMMENT_FRAGMENT,
        });
        apolloClient.writeFragment({
          id: `MockExamQuestionComment:${option.id}`,
          fragment: FULL_QUESTION_COMMENT_FRAGMENT,
          data: {
            ...currentComment,
            likeState: res.data.editMockExamQuestionCommentLike.currentState,
            likesCount: res.data.editMockExamQuestionCommentLike.currentState
              ? option.likesCount + 1
              : option.likesCount - 1,
          },
        });
        return;
      }
      return message.error(res.data?.editMockExamQuestionCommentLike.error);
    } catch (e) {
      handleError(e);
    }
  };

  const commentCardProps: CommentCardProps = {
    option,
    meQuery,
    toggleEdit,
    requestDelete,
    requestEdit,
    requestLike,
    onChangeContent,
    content,
    editState,
    editLoading,
    likeLoading,
    className,
  };

  return <CommentCardView {...commentCardProps} />;
};

export default QuestionCommentContainer;
