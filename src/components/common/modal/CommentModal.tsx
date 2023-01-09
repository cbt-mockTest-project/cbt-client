import palette from '@styles/palette';
import { Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal, { ModalProps } from './Modal';
import TextArea from 'antd/lib/input/TextArea';
import CommentCard from '../card/CommentCard';
import { responsive } from '@lib/utils/responsive';
import useInput from '@lib/hooks/useInput';
import {
  useCreateQuestionCommnet,
  useLazyReadQuestionComment,
} from '@lib/graphql/user/hook/useQusetionComment';
import { convertWithErrorHandlingFunc } from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import { READ_QUESTION_COMMENT } from '@lib/graphql/user/query/questionCommentQuery';
import { ReadMockExamQuestionCommentsByQuestionIdQuery } from '@lib/graphql/user/query/questionCommentQuery.generated';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { useRouter } from 'next/router';
interface CommentModalProps extends Omit<ModalProps, 'children'> {
  title: string;
  questionId: number;
  className?: string;
}

const CommentModal: React.FC<CommentModalProps> = ({
  onClose,
  open,
  title,
  questionId,
  className,
}) => {
  const router = useRouter();
  const client = useApollo({}, '');
  const [createCommentMutation, { loading }] = useCreateQuestionCommnet();
  const [submitButtonState, setSubmitButtonState] = useState(false);
  const [readQuestionComment, { data: commentQuery }] =
    useLazyReadQuestionComment();
  const {
    value: content,
    setValue: setContent,
    onChange: onChangeContent,
  } = useInput('');
  const { data: meQuery } = useMeQuery();
  useEffect(() => {
    if (content.length >= 1) {
      setSubmitButtonState(true);
    } else {
      setSubmitButtonState(false);
    }
  }, [content]);
  useEffect(() => {
    if (router.isReady && questionId && open) {
      readQuestionComment({ variables: { input: { questionId } } });
    }
  }, [router.isReady, questionId, open]);

  const requestCreateComment = async (questionId: number) => {
    const res = await createCommentMutation({
      variables: {
        input: { questionId, content },
      },
    });
    if (res.data?.createMockExamQuestionComment.ok) {
      setContent('');
      const newComment = res.data.createMockExamQuestionComment.comment;
      const queryResult =
        client.readQuery<ReadMockExamQuestionCommentsByQuestionIdQuery>({
          query: READ_QUESTION_COMMENT,
          variables: {
            input: { questionId },
          },
        });
      const prevComments =
        queryResult?.readMockExamQuestionCommentsByQuestionId.comments;
      if (queryResult && prevComments) {
        client.writeQuery({
          query: READ_QUESTION_COMMENT,
          data: {
            readMockExamQuestionCommentsByQuestionId: {
              ...queryResult.readMockExamQuestionCommentsByQuestionId,
              comments: [...prevComments, newComment],
            },
          },
          variables: { input: { questionId } },
        });
      }
      return message.success('댓글이 등록되었습니다.');
    }
    message.error(res.data?.createMockExamQuestionComment.error);
  };

  const tryCreateComment = (questionId: number) =>
    convertWithErrorHandlingFunc({
      callback: () => requestCreateComment(questionId),
    });
  const isLogedIn = Boolean(meQuery?.me.user);
  return (
    <CommentModalContainer
      onClose={onClose}
      open={open}
      className={className || ''}
    >
      <pre className="comment-title">{title}</pre>
      <div className="comment-input-wrapper">
        <TextArea
          autoSize={{ minRows: 3, maxRows: 3 }}
          onChange={onChangeContent}
          value={content}
          disabled={!isLogedIn}
          placeholder={!isLogedIn ? '로그인 후 이용해주세요' : ''}
        />
        <Button
          type="primary"
          onClick={tryCreateComment(questionId)}
          loading={loading}
          disabled={!submitButtonState}
        >
          댓글등록
        </Button>
      </div>
      <div className="comment-box">
        {commentQuery?.readMockExamQuestionCommentsByQuestionId.comments?.map(
          (comment) => (
            <CommentCard
              option={{
                likesCount: comment.likesCount,
                likeState: comment.likeState,
                nickname: comment.user.nickname,
                content: comment.content,
                id: comment.id,
                time: comment.created_at,
                questionId,
                userId: comment.user.id,
              }}
              key={comment.id}
            />
          )
        )}
      </div>
    </CommentModalContainer>
  );
};

export default CommentModal;

const CommentModalContainer = styled(Modal)`
  @keyframes slideFromBottom {
    from {
      transform: translateY(500px);
    }
    to {
      transform: translateY(0px);
    }
  }
  top: 0;
  bottom: 0;
  max-width: none;
  width: 500px;
  background-color: ${palette.gray_100};
  .comment-title {
    font-weight: bold;
    white-space: pre-line;
    display: block;
  }
  .modal-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 20px;
  }
  .comment-box {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    overflow-y: scroll;
  }

  .comment-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    button {
      border-radius: 5px;
      width: 100px;
      margin-left: auto;
    }
    textarea {
      border-radius: 5px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
  }
  @media (max-width: ${responsive.small}) {
    width: 100%;
    animation: slideFromBottom 0.5s;
    .comment-title {
      margin-top: 30px;
      font-size: 0.9rem;
    }
  }
`;
