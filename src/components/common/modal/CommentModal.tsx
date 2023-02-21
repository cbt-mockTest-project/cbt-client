import palette from '@styles/palette';
import { Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal, { Dimmed, ModalProps } from './Modal';
import TextArea from 'antd/lib/input/TextArea';
import { responsive } from '@lib/utils/responsive';
import useInput from '@lib/hooks/useInput';
import ClearIcon from '@mui/icons-material/Clear';
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
import QuestionCommentContainer from '../card/commentCard/QuestionCommentContainer';
import { addHours, format, parseISO } from 'date-fns';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import shortid from 'shortid';
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
  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.velocity.y > 100) {
      onClose();
    }
  };
  return (
    <div>
      <AnimatePresence>
        {open && (
          <>
            <CommentModalContainer
              className={className || ''}
              drag="y"
              dragConstraints={{
                bottom: 0,
                top: 0,
              }}
              dragElastic={1}
              initial={{ y: '100%' }}
              animate={{ y: '0', transition: { duration: 0.4 } }}
              exit={{ y: '100%', transition: { duration: 0.4 } }}
              onDragEnd={onDragEnd}
            >
              <div className="modal-wrapper">
                <span onClick={onClose} className="modal-close-button">
                  <ClearIcon />
                </span>
                <span onClick={onClose} className="modal-drag-position">
                  <DragHandleIcon />
                </span>
                <p className="comment-title">{title}</p>
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
                      <QuestionCommentContainer
                        option={{
                          likesCount: comment.likesCount,
                          likeState: comment.likeState,
                          nickname: comment.user.nickname,
                          content: comment.content,
                          id: comment.id,
                          time: format(
                            parseISO(comment.created_at),
                            'yy.MM.dd HH:mm'
                          ),
                          parrentId: questionId,
                          userId: comment.user.id,
                        }}
                        key={comment.id}
                      />
                    )
                  )}
                </div>
              </div>
            </CommentModalContainer>
            <Dimmed onClick={onClose} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommentModal;

const CommentModalContainer = styled(motion.div)`
  position: fixed;
  background-color: white;
  padding: 30px 50px;
  border-radius: 5px;
  margin: auto;
  top: 20%;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
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
  .modal-wrapper {
    position: relative;
    width: 100%;
  }
  .modal-close-button {
    position: absolute;
    user-select: none;
    top: -15px;
    right: -35px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.2s ease-in;
    :hover {
      color: ${palette.antd_blue_01};
    }
  }
  .modal-drag-position {
    display: none;
  }
  @media (max-width: ${responsive.medium}) {
    .comment-title {
      margin-top: 10px;
      font-size: 0.9rem;
    }

    .modal-drag-position {
      display: block;
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1.2rem;
      cursor: pointer;
      svg {
        font-size: 35px;
      }
    }
  }
  @media (max-width: ${responsive.small}) {
    width: 100% !important;
    padding-bottom: 0;
  }
`;
