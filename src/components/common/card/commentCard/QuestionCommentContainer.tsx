import React, { useState } from 'react';
import { message } from 'antd';
import {
  useDeleteQuestionCommnet,
  useEditQuestionCommnet,
} from '@lib/graphql/user/hook/useQusetionComment';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import { READ_QUESTION_COMMENT } from '@lib/graphql/user/query/questionCommentQuery';
import { ReadMockExamQuestionCommentsByQuestionIdQuery } from '@lib/graphql/user/query/questionCommentQuery.generated';
import useInput from '@lib/hooks/useInput';
import { FULL_QUESTION_COMMENT_FRAGMENT } from '@lib/graphql/user/query/questionCommentFragment';
import { useEditQuestionCommentLike } from '@lib/graphql/user/hook/useQusetionCommentLike';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import CommentCardView from './CommentCardView';
import {
  CommentCardProps,
  QuestionCommentContainerProps,
} from './CommentCard.interface';

const QuestionCommentContainer: React.FC<QuestionCommentContainerProps> = ({
  option,
  className,
}) => {
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
  const client = useApollo({}, '');
  const requestDelete = async () => {
    const confirmed = confirm('삭제하시겠습니까?');
    if (confirmed) {
      const res = await deleteCommentMutation({
        variables: { input: { id: option.id } },
      });
      if (res.data?.deleteMockExamQuestionComment.ok) {
        let queryResult =
          client.readQuery<ReadMockExamQuestionCommentsByQuestionIdQuery>({
            query: READ_QUESTION_COMMENT,
            variables: {
              input: { questionId: option.parrentId },
            },
          });
        const prevComments =
          queryResult?.readMockExamQuestionCommentsByQuestionId.comments;
        if (queryResult && prevComments) {
          const newComments = prevComments.filter((el) => el.id !== option.id);
          client.writeQuery({
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
  };
  const tryDelete = convertWithErrorHandlingFunc({ callback: requestDelete });
  const toggleEdit = () => {
    setEditState(!editState);
  };
  const requestEdit = async () => {
    const confirmed = confirm('수정하시겠습니까?');
    if (confirmed) {
      const res = await editCommentMutation({
        variables: { input: { content, id: option.id } },
      });
      if (res.data?.editMockExamQuestionComment.ok) {
        client.writeFragment({
          id: `MockExamQuestionComment:${option.id}`,
          fragment: FULL_QUESTION_COMMENT_FRAGMENT,
          data: {
            content,
          },
        });
        setEditState(false);
        return message.success('댓글이 수정됐습니다.');
      }
      return message.error(res.data?.editMockExamQuestionComment.error);
    }
  };
  const tryEdit = convertWithErrorHandlingFunc({ callback: requestEdit });
  const requestLike = async () => {
    const res = await editCommentLike({
      variables: { input: { commentId: option.id } },
    });
    if (res.data?.editMockExamQuestionCommentLike.ok) {
      client.writeFragment({
        id: `MockExamQuestionComment:${option.id}`,
        fragment: FULL_QUESTION_COMMENT_FRAGMENT,
        data: {
          likeState: res.data.editMockExamQuestionCommentLike.currentState,
          likesCount: res.data.editMockExamQuestionCommentLike.currentState
            ? option.likesCount + 1
            : option.likesCount - 1,
        },
      });
      return;
    }
    return message.error(res.data?.editMockExamQuestionCommentLike.error);
  };
  const tryLike = convertWithErrorHandlingFunc({ callback: requestLike });

  const commentCardProps: CommentCardProps = {
    option,
    meQuery,
    toggleEdit,
    tryDelete,
    tryEdit,
    tryLike,
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
