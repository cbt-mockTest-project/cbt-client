import RoundCheckboxGroup from '@components/common/checkbox/RoundCheckboxGroup';
import Modal from '@components/common/modal/Modal';
import ExamAchievementResultList from '@components/exam/common/ExamAchievementResultList';
import {
  useLazyFindMyExamHistory,
  useReadExamCategories,
} from '@lib/graphql/user/hook/useExam';
import { useResetQuestionState } from '@lib/graphql/user/hook/useQuestionState';
import { FindMyExamHistoryQuery } from '@lib/graphql/user/query/examQuery.generated';
import {
  convertWithErrorHandlingFunc,
  extractKeysOfCache,
} from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import palette from '@styles/palette';
import { Button, message } from 'antd';
import { checkboxOption } from 'customTypes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MockExamQuestionState, QuestionState } from 'types';

interface MypageComponentProps {
  examHistoryQuery: FindMyExamHistoryQuery;
}

const MypageComponent: React.FC<MypageComponentProps> = ({
  examHistoryQuery,
}) => {
  const [resetQuestionStateMutate] = useResetQuestionState();
  const [findMyExamHistoryLazyQuery] = useLazyFindMyExamHistory();
  const { data: categoriesQueryData } = useReadExamCategories();
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<checkboxOption[]>([]);
  const [achieveModalState, setAchieveModalState] = useState(false);
  const [examId, setExamId] = useState(0);
  const client = useApollo({}, '');
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (categoriesQueryData) {
      const categoires =
        categoriesQueryData.readAllMockExamCategories.categories;
      setCategories(categoires.map((el) => ({ value: el.id, label: el.name })));
    }
  }, [categoriesQueryData]);

  const onCheckAchievement = (examId: number) => {
    setExamId(examId);
    onToggleAchieveModalState();
  };
  const onToggleAchieveModalState = () => {
    setAchieveModalState(!achieveModalState);
  };
  const requestResetQuestionState = async () => {
    const res = await resetQuestionStateMutate({
      variables: {
        input: {
          examId,
        },
      },
    });
    if (res.data?.resetMyExamQuestionState.ok) {
      const questionKeys = extractKeysOfCache(client, 'MockExamQuestion:');
      questionKeys.forEach((el) => {
        client.cache.modify({
          id: el,
          fields: {
            state(state) {
              if (
                state.length === 1 &&
                state[0].exam.__ref === `MockExam:${examId}`
              ) {
                return state.map((state: MockExamQuestionState) => ({
                  ...state,
                  state: QuestionState.Core,
                }));
              }
              return state;
            },
          },
        });
      });
      message.success({ content: '성취도가 초기화 되었습니다.' });
      return;
    }
    return message.error({ content: res.data?.resetMyExamQuestionState.error });
  };
  const tryResetQuestionState = convertWithErrorHandlingFunc({
    callback: requestResetQuestionState,
  });
  const onCategoryChange = (values: checkboxOption['value'][]) => {
    if (mounted) {
      const categoryIds = values.map((el) => Number(el));
      findMyExamHistoryLazyQuery({
        variables: { input: { categoryIds } },
      });
    }
  };
  return (
    <MypageComponentContainer>
      <div className="mypage-exam-check-box-group-wrapper">
        <RoundCheckboxGroup options={categories} onChange={onCategoryChange} />
        <div className="blur" />
      </div>
      <div className="mypage-exam-list-wrapper">
        <ul>
          {examHistoryQuery.findMyExamHistory.titleAndId?.map((el, idx) => (
            <li key={el.id}>
              <span>{el.title}</span>
              <div className="mypage-exam-list-button-wrapper">
                <Button onClick={() => el.id && onCheckAchievement(el.id)}>
                  성취도 확인
                </Button>
                <Button>
                  <Link
                    href={{
                      pathname: '/exam',
                      query: {
                        q: 1,
                        t: el.title,
                        e: el.id,
                        r: false,
                      },
                    }}
                  >
                    다시 풀기
                  </Link>
                </Button>
                <Button>
                  <Link
                    href={{
                      pathname: '/exam/solution',
                      query: {
                        e: el.id,
                        t: el.title,
                      },
                    }}
                  >
                    문제/해설
                  </Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Modal
        open={achieveModalState}
        onClose={onToggleAchieveModalState}
        className="achievement-modal-wrapper"
      >
        <ExamAchievementResultList examId={examId} />
        <Button type="primary" onClick={tryResetQuestionState}>
          성취도 초기화
        </Button>
      </Modal>
    </MypageComponentContainer>
  );
};

export default MypageComponent;

const MypageComponentContainer = styled.div`
  .mypage-exam-check-box-group-wrapper {
    position: relative;
    white-space: nowrap;
    overflow-x: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
    .blur {
      background-color: white;
      position: absolute;
      width: 30px;
      right: 0;
      top: 0;
      bottom: 0;
      filter: blur(6px);
    }
  }
  .mypage-exam-list-wrapper {
    margin-top: 50px;
    li {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid ${palette.gray_500};
    }
    .mypage-exam-list-button-wrapper {
      margin-left: auto;
      button {
        + button {
          margin-left: 20px;
        }
      }
    }
  }
  .achievement-modal-wrapper {
    button {
      margin-top: 20px;
      width: 100%;
    }
  }
`;
