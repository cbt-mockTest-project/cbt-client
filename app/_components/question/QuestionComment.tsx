import QuestionCommentContainer from '../common/card/commentCard/QuestionCommentContainer';
import {
  useCreateQuestionCommnet,
  useLazyReadQuestionComment,
} from '../../_lib/graphql/hook/useQusetionComment';
import { useMeQuery } from '../../_lib/graphql/hook/useUser';
import { READ_QUESTION_COMMENT } from '../../_lib/graphql/query/questionCommentQuery';
import { ReadMockExamQuestionCommentsByQuestionIdQuery } from '../../_lib/graphql/query/questionCommentQuery.generated';
import useInput from '../../_lib/hooks/useInput';
import { convertServerTimeToKST, handleError } from '../../_lib/utils/utils';
import { useApollo } from '../../_modules/apollo';
import { Button, App } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface QuestionCommentProps {
  questionId: number;
}

const QuestionComment: React.FC<QuestionCommentProps> = ({ questionId }) => {
  const { message } = App.useApp();
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
    if (router.isReady && questionId) {
      readQuestionComment({ variables: { input: { questionId } } });
    }
  }, [router.isReady, questionId]);
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

  return (
    <QuestionCommentBlock>
      <p className="question-comment-title">댓글</p>
      <div className="question-comment-input-wrapper">
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
              className="question-comment-item"
              option={{
                likesCount: comment.likesCount,
                likeState: comment.likeState,
                nickname: comment.user.nickname,
                content: comment.content,
                role: comment.user.role,
                id: comment.id,
                time: convertServerTimeToKST(
                  comment.created_at,
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
    </QuestionCommentBlock>
  );
};

export default QuestionComment;

const QuestionCommentBlock = styled.div`
  margin-top: 30px;
  .question-comment-item {
    margin-top: 30px;
  }
  .question-comment-title {
    font-weight: bold;
    margin-bottom: 5px;
  }
  .question-comment-input-wrapper {
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
`;
