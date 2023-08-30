import { Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { ModalProps } from './Modal';
import TextArea from 'antd/lib/input/TextArea';
import useInput from '@lib/hooks/useInput';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ClearIcon from '@mui/icons-material/Clear';
import {
  useCreateQuestionCommnet,
  useLazyReadQuestionComment,
} from '@lib/graphql/user/hook/useQusetionComment';
import { useApollo } from '@modules/apollo';
import { READ_QUESTION_COMMENT } from '@lib/graphql/user/query/questionCommentQuery';
import { ReadMockExamQuestionCommentsByQuestionIdQuery } from '@lib/graphql/user/query/questionCommentQuery.generated';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { useRouter } from 'next/router';
import QuestionCommentContainer from '../card/commentCard/QuestionCommentContainer';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DragModal from './DragModal';
import { UserRole } from 'types';
import { convertToKST, handleError } from '@lib/utils/utils';

interface CommentModalProps extends Omit<ModalProps, 'children'> {
  title: string;
  questionId: number;
  className?: string;
  type?: 'modal' | 'newPage';
}

const CommentModal: React.FC<CommentModalProps> = ({
  onClose,
  open,
  title,
  questionId,
  className,
  type = 'modal',
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
    try {
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
    } catch (e) {
      handleError(e);
    }
  };

  const isLogedIn = Boolean(meQuery?.me.user);
  const onNewWindow = () => {
    onClose();
    window.open(
      `/comment?questionId=${questionId}&title=${title}`,
      '_blank',
      'toolbar=no,status=no,menubar=no,resizable=yes, location=no, top=100,left=100,width=380,height=380,scrollbars=true'
    );
  };
  return (
    <DragModal onClose={onClose} open={open} onNewWindow={onNewWindow}>
      <div className="modal-wrapper">
        <>
          <span onClick={onClose} className="modal-close-button">
            <ClearIcon />
          </span>
          <span onClick={onClose} className="modal-drag-position">
            <DragHandleIcon />
          </span>
        </>
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
            onClick={() => requestCreateComment(questionId)}
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
                  nickname: comment.user?.nickname as string,
                  content: comment.content,
                  role: comment.user?.role as UserRole,
                  id: comment.id,
                  time: convertToKST(comment.created_at, 'yy.MM.dd HH:mm'),
                  parrentId: questionId,
                  userId: comment.user?.id as number,
                }}
                key={comment.id}
              />
            )
          )}
        </div>
      </div>
    </DragModal>
  );
};

export default CommentModal;
