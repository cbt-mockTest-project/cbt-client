import SolutionModeCardItem from '@components/solutionMode/SolutionModeCardItem';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { App, Button, Empty, message } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
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
import ObjectiveStudyAutoModeItem from '@components/study/objective/autoMode/ObjectiveStudyAutoModeItem';
import GoogleAd from '@components/common/ad/GoogleAd';

const BookmarkedQuestionListBlock = styled.div`
  .objective-study-mode-item-wrapper {
    padding: 16px 10px;
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.color('colorBorder')};
  }
`;

interface BookmarkedQuestionListProps {}

const BookmarkedQuestionList: React.FC<BookmarkedQuestionListProps> = () => {
  const router = useRouter();
  const folderId = router.query.folderId as string;
  const { modal } = App.useApp();
  const { resetQuestions } = useQuestions();
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  const questionIds = useAppSelector(
    (state) =>
      state.mockExam.questions.map((question) => ({
        id: question.id,
        isObjective: question.objectiveData ? true : false,
      })),
    (left, right) =>
      left.length === right.length &&
      left.every((item, index) => item.id === right[index].id)
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
          {questionIds.slice(0, 30).map(({ id, isObjective }, index) =>
            isObjective ? (
              <div key={id} className="objective-study-mode-item-wrapper">
                <ObjectiveStudyAutoModeItem questionId={id} index={index + 1} />
              </div>
            ) : (
              <>
                <SolutionModeCardItem key={id} index={index} />
                {index % 4 === 0 && <GoogleAd />}
              </>
            )
          )}
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
