import palette from '@styles/palette';
import React, { useState } from 'react';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Mode';
import ArrowUpIcon from '@mui/icons-material/KeyboardControlKey';
import BasicBox from '../box/BasicBox';
import TextArea from 'antd/lib/input/TextArea';
import { Button, message } from 'antd';
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
import { addHours, format, parseISO } from 'date-fns';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';

interface CommentCardOption {
  nickname: string;
  content: string;
  time: string;
  id: number;
  likeState: boolean;
  likesCount: number;
  questionId: number;
  userId: number;
}

interface CommentCardProps {
  option: CommentCardOption;
}

const CommentCard: React.FC<CommentCardProps> = ({ option }) => {
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
  // const tryLike = () => setLikedState(!likedState);
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
              input: { questionId: option.questionId },
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
            variables: { input: { questionId: option.questionId } },
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
  return (
    <CommentCardContainer>
      <div className="comment-card-left-section">
        <div className="comment-card-top-section">
          <div className="comment-card-user-name">{option.nickname}</div>
          <div className="comment-card-time">
            {format(addHours(parseISO(option.time), 9), 'yyyy-MM-dd hh:mm')}
          </div>
          {meQuery?.me.user?.id === option.userId && (
            <>
              <button onClick={toggleEdit}>
                <EditIcon />
              </button>
              <button onClick={tryDelete}>
                <DeleteIcon />
              </button>
            </>
          )}
        </div>
        {editState && (
          <>
            <TextArea
              autoSize={{ minRows: 2, maxRows: 10 }}
              className="comment-card-edit-section"
              value={content}
              onChange={onChangeContent}
            />
            <Button
              className="comment-card-edit-button"
              type="primary"
              loading={editLoading}
              onClick={tryEdit}
            >
              댓글수정
            </Button>
          </>
        )}
        {!editState && (
          <pre className="comment-card-content-section">{option.content}</pre>
        )}
      </div>
      <div className="comment-card-right-section">
        <button disabled={likeLoading} onClick={tryLike}>
          <BasicBox
            className={`comment-card-like-box ${option.likeState && 'active'}`}
          >
            <ArrowUpIcon />
            <span className="comment-card-like-count">{option.likesCount}</span>
          </BasicBox>
        </button>
      </div>
    </CommentCardContainer>
  );
};

export default CommentCard;

const CommentCardContainer = styled.div`
  display: flex;
  border-radius: 5px;
  background-color: white;
  padding: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .comment-card-top-section {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    word-break: break-all;
    .comment-card-time {
      font-size: 0.8rem;
      font-weight: bold;
      color: ${palette.gray_700};
      margin: 0 10px;
    }
    button {
      + button {
        margin-left: 5px;
      }
    }
    svg {
      transition: color 0.2s ease-in;
      cursor: pointer;
      font-size: 0.8rem;
      :hover {
        color: ${palette.antd_blue_01};
      }
    }
  }
  .comment-card-content-section {
    white-space: pre-wrap;
    word-break: break-all;
    margin-top: 10px;
    font-size: 0.9rem;
  }
  .comment-card-edit-section {
    margin-top: 10px;
  }
  .comment-card-edit-button {
    margin-top: 10px;
    width: 80px;
    border-radius: 5px;
    display: block;
    margin-left: auto;
  }
  .comment-card-left-section {
    flex: 8;
  }
  .comment-card-right-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 2;
    .comment-card-like-box {
      font-weight: bold;
      font-size: 1.1rem;
      height: 60px;
      width: 50px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all 0.2s ease-in;
      svg {
        position: relative;
        top: 5px;
        font-weight: bold;
      }
    }
    .comment-card-like-box.active {
      border-color: ${palette.antd_blue_01};
      color: ${palette.antd_blue_01};
    }
  }
  .comment-card-like-count {
    position: relative;
    bottom: 5px;
  }
`;
