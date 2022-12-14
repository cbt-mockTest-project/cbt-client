import RoundCheckboxGroup, {
  RoundCheckboxGroupOnChangeValueType,
} from '@components/common/checkbox/RoundCheckboxGroup';
import Modal from '@components/common/modal/Modal';
import ExamAchievementResultList from '@components/exam/common/ExamAchievementResultList';
import {
  useLazyFindMyExamHistory,
  useReadExamCategories,
} from '@lib/graphql/user/hook/useExam';
import { useResetQuestionState } from '@lib/graphql/user/hook/useQuestionState';
import { FindMyExamHistoryQuery } from '@lib/graphql/user/query/examQuery.generated';
import { responsive } from '@lib/utils/responsive';
import {
  convertWithErrorHandlingFunc,
  extractKeysOfCache,
} from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import palette from '@styles/palette';
import { Button, message } from 'antd';
import { checkboxOption } from 'customTypes';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MockExamQuestionState, QuestionState } from 'types';
import RoundCheckboxGroupBlurTemplete from '../common/RoundBoxGroupBlurTemplete';

interface ExamHistoryProps {
  examHistoryQuery: FindMyExamHistoryQuery;
}

const ExamHistory: React.FC<ExamHistoryProps> = ({ examHistoryQuery }) => {
  const [resetQuestionStateMutate] = useResetQuestionState();
  const [findMyExamHistoryLazyQuery, { data: lazyExamHistoryQuery }] =
    useLazyFindMyExamHistory();
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
      message.success({ content: '???????????? ????????? ???????????????.' });
      return;
    }
    return message.error({ content: res.data?.resetMyExamQuestionState.error });
  };
  const tryResetQuestionState = convertWithErrorHandlingFunc({
    callback: requestResetQuestionState,
  });
  const onCategoryChange = async (
    values: RoundCheckboxGroupOnChangeValueType
  ) => {
    if (mounted && Array.isArray(values)) {
      const categoryIds = values.map((el) => Number(el));
      await findMyExamHistoryLazyQuery({
        variables: { input: { categoryIds } },
      });
    }
  };
  return (
    <ExamHistoryContainer>
      <RoundCheckboxGroupBlurTemplete
        options={categories}
        onChange={onCategoryChange}
        type="checkbox"
      />
      <div className="mypage-exam-list-wrapper">
        <ul>
          {(
            lazyExamHistoryQuery || examHistoryQuery
          ).findMyExamHistory.titleAndId?.map((el, idx) => (
            <li key={el.id}>
              <span>{el.title}</span>
              <div className="mypage-exam-list-button-wrapper">
                <Button onClick={() => el.id && onCheckAchievement(el.id)}>
                  ????????? ??????
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
                    ?????? ??????
                  </Link>
                </Button>
                <Button>
                  <Link href={`/exam/solution/${el.id}`}>??????/??????</Link>
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
        <ExamAchievementResultList
          examId={examId}
          className="achievement-modal-result-list"
        />
        <Button type="primary" onClick={tryResetQuestionState}>
          ????????? ?????????
        </Button>
      </Modal>
    </ExamHistoryContainer>
  );
};

export default ExamHistory;

const ExamHistoryContainer = styled.div`
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
  .achievement-modal-result-list {
    max-height: 350px;
  }
  .mypage-exam-list-wrapper {
    margin-top: 50px;
    li {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid ${palette.gray_200};
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
  @media (max-width: ${responsive.medium}) {
    padding: 0 15px;
    .mypage-exam-list-wrapper {
      margin-top: 20px;
      li {
        font-size: 0.9rem;
        flex-direction: column;
        border-color: ${palette.gray_300};
      }
    }
    .mypage-exam-list-button-wrapper {
      margin: 10px 0 !important;
      button {
        font-size: 0.7rem;
        font-weight: bold;
      }
    }
    .mypage-exam-check-box-group-wrapper {
      margin-top: 20px;
    }
  }
`;
