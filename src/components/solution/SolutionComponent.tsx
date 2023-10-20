import ExamSolutionList from '@components/exam/solution/ExamSolutionList';
import { useLazyReadQuestionsByExamId } from '@lib/graphql/user/hook/useExamQuestion';
import { READ_QUESTIONS_BY_ID } from '@lib/graphql/user/query/questionQuery';
import { ReadMockExamQuestionsByMockExamIdQuery } from '@lib/graphql/user/query/questionQuery.generated';
import { responsive } from '@lib/utils/responsive';
import {
  blobToDataUrl,
  convertExamTitle,
  handleError,
  removeWhiteSpace,
} from '@lib/utils/utils';
import { useApollo } from '@modules/apollo';
import palette from '@styles/palette';
import { Button, Card, Input, message } from 'antd';
import { debounce, shuffle } from 'lodash';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import SolutionComponentSkeleton from './SolutionComponentSkeleton';
import { OnDownloadPdfArgs } from '@components/me/memo/MemoComponent';
import { ReadMockExamQuestionsByMockExamIdInput } from 'types';
import useToggle from '@lib/hooks/useToggle';
import { PdfDownloadSelectModalFooter } from '@components/common/modal/PdfDownloadSelectModal';
import { SearchOutlined } from '@ant-design/icons';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import Portal from '@components/common/portal/Portal';
import ContinueLearningModal from './ContinueLearningModal';
import MoveExamSelectorBox from './MoveExamSelectorBox';
import {
  직8딴_건설안전기사_리스트,
  직8딴_대기환경기사_리스트,
  직8딴_산업안전기사_리스트,
  직8딴_위험물산업기사_리스트,
} from '@lib/constants/exam';
import Dimmed from '@components/common/dimmed/Dimmed';
import Link from 'next/link';
import { pdf } from '@react-pdf/renderer';
import ExamPdf from '@components/common/pdfTemplete/ExamPdf';

const GoogleAd = dynamic(() => import('@components/common/ad/GoogleAd'), {
  ssr: false,
});

const PdfDownloadSelectModal = dynamic(
  () => import('@components/common/modal/PdfDownloadSelectModal'),
  { ssr: false }
);

interface SolutionComponentProps {
  questionsQuery?: ReadMockExamQuestionsByMockExamIdQuery;
  isPreview?: boolean;
  hasSearchInput?: boolean;
  isRandomMode?: boolean;
  hasNewWindowButton?: boolean;
  subDescription?: string;
  coAuthor?: string;
}

const SolutionComponent: React.FC<SolutionComponentProps> = ({
  questionsQuery,
  isPreview = false,
  hasNewWindowButton = true,
  hasSearchInput = false,
  isRandomMode = false,
  subDescription,
}) => {
  const { data: meQuery } = useMeQuery();
  const {
    value: pdfDownloadConfirmModalState,
    onToggle: onTogglePdfDownloadConfirmModalState,
  } = useToggle(false);
  const {
    value: continueLearningModalState,
    onToggle: onToggleContinueLearningModalState,
    setValue: setContinueLearningModalState,
  } = useToggle(false);
  const [pdfDownloadLoading, setPdfDownloadLoading] = useState(false);
  const [hasAdditionalAnswer, setHasAdditionalAnswer] = useState(true);
  const [filteredQuestions, setFilteredQuestions] = useState<
    | ReadMockExamQuestionsByMockExamIdQuery['readMockExamQuestionsByMockExamId']['questions']
    | null
  >(null);
  const [questions, setQuestions] = useState(
    questionsQuery?.readMockExamQuestionsByMockExamId.questions || null
  );
  const [
    readQuestions,
    { data: questionsQueryOnClientSide, refetch: refetchReadQuestions },
  ] = useLazyReadQuestionsByExamId('network-only');
  const [isSolutionAllHide, setIsSolutionAllHide] = useState(false);
  const client = useApollo({}, '');
  const router = useRouter();
  const title = questionsQuery
    ? questionsQuery.readMockExamQuestionsByMockExamId.title
    : questionsQueryOnClientSide?.readMockExamQuestionsByMockExamId.title;
  const isPremium = (questionsQuery || questionsQueryOnClientSide)
    ?.readMockExamQuestionsByMockExamId.isPremium;
  const examId = Number(String(router.query.Id));
  const examIds = router.query.es ? JSON.parse(String(router.query.es)) : null;

  const examPermissionCheck = (checkExamList: number[], roleId: number) => {
    if (
      checkExamList.includes(examId) ||
      (Array.isArray(examIds) &&
        examIds.some((id: number) => checkExamList.includes(id)))
    ) {
      if (
        meQuery?.me.user &&
        (!meQuery.me.user.userRoles.find((role) => role.role.id === roleId) ||
          meQuery.me.user.userRoles.length === 0)
      ) {
        return false;
      }
      if (meQuery && !meQuery.me.user) {
        // 비로그인시
        return false;
      }
    }
    return true;
  };

  const 직8딴_산업안전기사_권한체크 = useMemo(
    () => examPermissionCheck(직8딴_산업안전기사_리스트, 4),
    [examId, examIds, meQuery]
  );

  const 직8딴_건설안전기사_권한체크 = useMemo(
    () => examPermissionCheck(직8딴_건설안전기사_리스트, 5),
    [examId, examIds, meQuery]
  );

  const 직8딴_위험물산업기사_권한체크 = useMemo(
    () => examPermissionCheck(직8딴_위험물산업기사_리스트, 6),
    [examId, examIds, meQuery]
  );

  const 직8딴_대기환경기사_권한체크 = useMemo(
    () => examPermissionCheck(직8딴_대기환경기사_리스트, 7),
    [examId, examIds, meQuery]
  );

  const unAuthorizedExam = useMemo(
    () =>
      !직8딴_산업안전기사_권한체크 ||
      !직8딴_건설안전기사_권한체크 ||
      !직8딴_대기환경기사_권한체크 ||
      !직8딴_위험물산업기사_권한체크,
    [
      직8딴_산업안전기사_권한체크,
      직8딴_건설안전기사_권한체크,
      직8딴_위험물산업기사_권한체크,
      직8딴_대기환경기사_권한체크,
    ]
  );

  useEffect(() => {
    (async () => {
      if (router.query.Id) {
        const res = await readQuestions({
          variables: {
            input: { id: examId, isRandom: false },
          },
        });
        if (res.data?.readMockExamQuestionsByMockExamId.ok) {
          client.writeQuery<ReadMockExamQuestionsByMockExamIdQuery>({
            query: READ_QUESTIONS_BY_ID,
            data: {
              readMockExamQuestionsByMockExamId:
                res.data.readMockExamQuestionsByMockExamId,
            },
          });
        }
      } else if (router.query.es) {
        const ids = router.query.es
          ? JSON.parse(String(router.query.es))
          : null;
        const l = router.query.l ? Number(router.query.l) : null;
        const s = router.query.s ? JSON.parse(String(router.query.s)) : null;
        const readQuestionInput: ReadMockExamQuestionsByMockExamIdInput = {
          ids,
          isRandom: router.query.r === 'true' ? true : false,
          limit: l,
          states: s && s.length > 0 ? s : null,
        };
        const res = await readQuestions({
          variables: {
            input: readQuestionInput,
          },
        });
        if (res.data?.readMockExamQuestionsByMockExamId.ok) {
          client.writeQuery<ReadMockExamQuestionsByMockExamIdQuery>({
            query: READ_QUESTIONS_BY_ID,
            data: {
              readMockExamQuestionsByMockExamId:
                res.data.readMockExamQuestionsByMockExamId,
            },
          });
        }
      }
    })();

    return () => {
      setContinueLearningModalState(false);
    };
  }, [router.query]);
  const currentQuestionsQuery = (questionsQueryOnClientSide ||
    questionsQuery) as ReadMockExamQuestionsByMockExamIdQuery;

  useEffect(() => {
    setQuestions(
      currentQuestionsQuery?.readMockExamQuestionsByMockExamId.questions
    );
  }, [currentQuestionsQuery]);

  if (questions === null) return <SolutionComponentSkeleton />;

  const onToggleSolutionAllHide = () =>
    setIsSolutionAllHide(!isSolutionAllHide);

  const onShuffleQuestion = () => {
    setQuestions(shuffle);
  };

  const onDownloadPdf = async ({ hasSolution }: OnDownloadPdfArgs) => {
    try {
      setPdfDownloadLoading(true);
      const pdfBlob = await pdf(
        <ExamPdf mock={questions} isHideAnswer={!hasSolution} />
      ).toBlob();
      //pdf미리보기
      const dataUrl = await blobToDataUrl(pdfBlob);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${title}${
        hasSolution ? '(정답포함)' : '(정답미포함)'
      }.pdf`;
      link.click();
      setPdfDownloadLoading(false);
      return;
    } catch (e) {
      handleError(e);
      setPdfDownloadLoading(false);
      message.error('다운로드에 실패했습니다.');
    }
  };
  const onChangeSearchInput = (value: string) => {
    if (value === '') {
      setFilteredQuestions(null);
      return;
    }
    const filteredQuestions = questions.filter((question) => {
      return removeWhiteSpace(`Q${question.number}${question.question}`)
        .toLocaleLowerCase()
        .includes(removeWhiteSpace(value).toLocaleLowerCase());
    });
    setFilteredQuestions(filteredQuestions);
  };
  const debounceOnChange = debounce(onChangeSearchInput, 800);
  const pdfDownloadSelectModalFooterOptions: PdfDownloadSelectModalFooter = {
    onCheckboxChange: (e) => {
      setHasAdditionalAnswer(e.target.checked);
    },
    hasAdditionalAnswer,
  };
  const onClickDownloadButton = () => {
    onTogglePdfDownloadConfirmModalState();
  };
  return (
    <SolutionComponentContainer isPremium={isPremium || false}>
      <div className="solution-component-left-section">
        <div className="exam-solution-page-top-button-wrapper">
          <Button
            onClick={onToggleSolutionAllHide}
            className="exam-solution-page-solution-all-hide-button"
            type="primary"
          >
            {isSolutionAllHide ? '정답 모두 보이기' : '정답 모두 가리기'}
          </Button>
          <Button
            onClick={onShuffleQuestion}
            disabled={filteredQuestions !== null}
            className="exam-solution-page-solution-all-hide-button"
            type="primary"
          >
            섞기
          </Button>
          {/* {!isPremium && (
            <Button
              onClick={onClickDownloadButton}
              className="exam-solution-page-solution-all-hide-button"
              type="primary"
            >
              다운로드
            </Button>
          )} */}
        </div>
        <h1 className="not-draggable">
          {convertExamTitle(title || '')} 문제/해설
        </h1>
        {/* {!isRandomMode && (
          <p className="exam-solution-page-author-name">{`제작자: ${
            currentQuestionsQuery?.readMockExamQuestionsByMockExamId?.author
          }${coAuthor ? ', ' + coAuthor : ''}`}</p>
        )} */}
        {subDescription && (
          <p className="exam-solution-page-author-name">{subDescription}</p>
        )}
        {hasSearchInput && (
          <div className="exam-solution-page-search-input-wrapper">
            <Input
              size="large"
              prefix={<SearchOutlined />}
              placeholder="문제 내용을 검색해보세요."
              onChange={(e) => {
                debounceOnChange(e.target.value);
              }}
            />
          </div>
        )}
        <ul>
          {(filteredQuestions || questions)?.map((el, index) => {
            return (
              <div key={index}>
                <ExamSolutionList
                  hasStateBox={false}
                  questionSubDescription={
                    isRandomMode
                      ? `${el?.mockExam?.title}
              ${el?.number}번`
                      : ''
                  }
                  index={isRandomMode ? index + 1 : 0}
                  isSolutionAllHide={isSolutionAllHide}
                  question={el}
                  title={convertExamTitle(title || '')}
                  isPreview={isPreview}
                  hasNewWindowButton={hasNewWindowButton}
                />
                {questionsQueryOnClientSide &&
                  index % 4 === 0 &&
                  index + 1 !== questions.length && (
                    <div className="exam-solution-page-google-feed-ad-wrapper">
                      <GoogleAd type="display" />
                    </div>
                  )}
              </div>
            );
          })}
        </ul>

        {!isPreview && (
          <Button
            className="solution-component-continue-button"
            size="large"
            onClick={onToggleContinueLearningModalState}
          >
            이어서 학습하기
          </Button>
        )}
      </div>
      {!isPreview && !isRandomMode && (
        <div className="move-exam-content-card-wrapper">
          <Card className="move-exam-content-card">
            <MoveExamSelectorBox key={examId} examId={examId} />
          </Card>
        </div>
      )}
      <Portal>
        {continueLearningModalState &&
          !isPreview &&
          !isRandomMode &&
          !isRandomMode && (
            <ContinueLearningModal
              key={examId}
              title={title || ''}
              examId={examId}
              open={continueLearningModalState}
              onClose={onToggleContinueLearningModalState}
            />
          )}
        {pdfDownloadConfirmModalState && (examId || examIds) && (
          <PdfDownloadSelectModal
            open={pdfDownloadConfirmModalState}
            onClose={onTogglePdfDownloadConfirmModalState}
            onCancel={() => {
              onDownloadPdf({ hasSolution: false });
            }}
            onConfirm={() => {
              onDownloadPdf({ hasSolution: true });
            }}
            confirmButtonLoading={pdfDownloadLoading}
            cancelButtonLoading={pdfDownloadLoading}
            // footerOptions={pdfDownloadSelectModalFooterOptions}
          />
        )}
      </Portal>
      {unAuthorizedExam && (
        <Dimmed content="직8딴 플랜 구매후 이용가능 합니다.">
          <Link href="/pricing">
            <Button type="primary" size="large">
              구매하러 가기
            </Button>
          </Link>
        </Dimmed>
      )}
    </SolutionComponentContainer>
  );
};

export default SolutionComponent;

interface SolutionComponentContainerProps {
  isPremium: boolean;
}

const SolutionComponentContainer = styled.div<SolutionComponentContainerProps>`
  padding: 20px;
  display: flex;
  gap: 20px;
  ${(props) =>
    props.isPremium &&
    css`
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    `}

  .solution-component-left-section {
    width: 100%;
  }
  h1 {
    padding: 0px 20px 0px 0px;
    font-size: 1.3rem;
  }
  .exam-solution-page-top-button-wrapper {
    display: flex;
    gap: 10px;
  }
  .exam-solution-page-author-name {
    font-size: 0.9rem;
    color: ${palette.gray_700};
  }
  .exam-solution-page-add-wrapper {
    position: relative;
    margin-top: 20px;
  }
  .exam-solution-page-solution-all-hide-button {
    margin-bottom: 10px;
  }
  .exam-solution-page-google-display-ad-wrapper {
    margin-top: 20px;
  }
  .exam-solution-page-google-feed-ad-wrapper {
    margin-top: 20px;
  }
  .exam-solution-page-search-input-wrapper {
    margin-top: 10px;
    margin-bottom: -10px;
    z-index: 800;
  }
  .solution-component-continue-button {
    margin-top: 20px;
    width: 100%;
  }
  .move-exam-content-card-wrapper {
    height: 100%;
    top: 130px;
    position: sticky;
  }
  .move-exam-content-card {
    width: 245px;
  }
  .solution-component-continue-button {
    display: none;
  }
  @media (max-width: ${responsive.medium}) {
    h1 {
      font-size: 1.1rem;
    }
    .move-exam-content-card-wrapper {
      display: none;
    }
    .solution-component-continue-button {
      display: block;
    }
  }
  .solution-page-google-ad {
    margin-top: 20px;
  }
`;
