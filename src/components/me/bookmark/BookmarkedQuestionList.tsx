import SolutionModeCardItem from '@components/solutionMode/SolutionModeCardItem';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { App, Button, Empty, Spin, message } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { shallowEqual } from 'react-redux';
import { ClearOutlined } from '@ant-design/icons';
import ExamBookmarkStudyModal from './ExamBookmarkStudyModal';
import { useRouter } from 'next/router';
import { apolloClient } from '@modules/apollo';
import { RESET_QUESTION_BOOKMARK } from '@lib/graphql/query/questionBookmarkQuery';
import {
  ResetQuestionBookmarkMutation,
  ResetQuestionBookmarkMutationVariables,
} from '@lib/graphql/query/questionBookmarkQuery.generated';
import useQuestions from '@lib/hooks/useQuestions';

const BookmarkedQuestionListBlock = styled.div``;

interface BookmarkedQuestionListProps {}

const BookmarkedQuestionList: React.FC<BookmarkedQuestionListProps> = () => {
  const router = useRouter();
  const folderId = router.query.folderId as string;
  const { modal } = App.useApp();
  const { resetQuestions } = useQuestions();
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  const questionIds = useAppSelector(
    (state) => state.mockExam.questions.map((question) => question.id),
    shallowEqual
  );
  const handleClearBookmark = () => {
    modal.confirm({
      title: '북마크 초기화',
      content: '북마크를 초기화하시겠습니까?',
      okText: '초기화',
      cancelText: '취소',
      onOk: async () => {
        const res = await apolloClient.mutate<
          ResetQuestionBookmarkMutation,
          ResetQuestionBookmarkMutationVariables
        >({
          mutation: RESET_QUESTION_BOOKMARK,
          variables: {
            input: {
              questionBookmarkFolderId: Number(folderId),
            },
          },
        });
        if (res.data?.resetQuestionBookmark.ok) {
          resetQuestions();
          return;
        }
        message.error('북마크 초기화에 실패했습니다.');
      },
    });
  };

  return (
    <BookmarkedQuestionListBlock>
      <div>
        {questionIds.length > 0 && (
          <div className="mb-3 flex items-center gap-3">
            <Button
              size="large"
              type="primary"
              onClick={() => setIsStudyModalOpen(true)}
            >
              풀이모드
            </Button>
            <Button
              size="large"
              type="dashed"
              icon={<ClearOutlined />}
              onClick={handleClearBookmark}
            >
              초기화
            </Button>
          </div>
        )}
        <div className="flex flex-col gap-[50px]">
          {questionIds.slice(0, 30).map((questionId, index) => (
            <SolutionModeCardItem
              key={questionId}
              index={index}
              isAnswerAllHidden={false}
            />
          ))}
          {questionIds.length === 0 && (
            <div className="flex justify-center items-center">
              <Empty description="북마크한 문제가 없습니다." />
            </div>
          )}
        </div>
      </div>
      {isStudyModalOpen && (
        <ExamBookmarkStudyModal
          open={isStudyModalOpen}
          selectedFolderId={Number(folderId)}
          onCancel={() => setIsStudyModalOpen(false)}
          onClose={() => setIsStudyModalOpen(false)}
        />
      )}
    </BookmarkedQuestionListBlock>
  );
};

export default BookmarkedQuestionList;
