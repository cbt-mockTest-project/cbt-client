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
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import SolutionComponentSkeleton from './SolutionComponentSkeleton';
import { OnDownloadPdfArgs } from '@components/me/memo/MemoComponent';
import axios from 'axios';
import {
  MockExamImageType,
  MockExamQuestionFeedback,
  ReadMockExamQuestionsByMockExamIdInput,
} from 'types';
import useToggle from '@lib/hooks/useToggle';
import { PdfDownloadSelectModalFooter } from '@components/common/modal/PdfDownloadSelectModal';
import { SearchOutlined } from '@ant-design/icons';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import Portal from '@components/common/portal/Portal';
import ContinueLearningModal from './ContinueLearningModal';
import MoveExamSelectorBox from './MoveExamSelectorBox';

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
  coAuthor,
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

  const onDownloadPdf = async ({
    hasSolution,
    pdfFonts,
    pdfMake,
  }: OnDownloadPdfArgs) => {
    try {
      if (isPremium)
        return message.error('해당 기능은 현재 사용할 수 없습니다.');
      setPdfDownloadLoading(true);
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      const contents: any[] = [];
      let number = 0;
      for await (const item of questions) {
        number += 1;
        const hasQuestionImage =
          item.question_img && item.question_img.length >= 1;
        const hasSolutionImage =
          item.solution_img && item.solution_img.length >= 1;

        contents.push({
          text: `Q${number}. ${item.question}`,
          margin: hasQuestionImage ? [0, 0] : [0, 20],
        });
        if (hasQuestionImage) {
          const { data } = await axios.get(
            `${
              (item.question_img as MockExamImageType[])[0].url
            }?not-from-cache-please`,
            {
              responseType: 'blob',
            }
          );
          const dataUrl = await blobToDataUrl(data);
          contents.push({
            image: dataUrl,
            width: 400,
            margin: [0, 10, 0, 20],
          });
        }
        contents.push({
          text: '정답',
          style: 'subHeader',
          margin: [0, 0, 0, 5],
        });
        const solutionText = hasSolution
          ? item.solution
          : item.solution?.replaceAll(/[^\n]/g, '') + '\n';
        contents.push({
          text: solutionText,
          margin: hasSolutionImage
            ? [0, 0, 0, 0]
            : [0, 0, 0, hasAdditionalAnswer ? 10 : 40],
        });
        if (hasSolutionImage && hasSolution) {
          const { data } = await axios.get(
            `${
              (item.solution_img as MockExamImageType[])[0].url
            }?not-from-cache-please`,
            {
              responseType: 'blob',
            }
          );
          const dataUrl = await blobToDataUrl(data);
          contents.push({
            image: dataUrl,
            width: 400,
            margin: [0, 10, 0, hasAdditionalAnswer ? 10 : 40],
          });
        }
        if (hasAdditionalAnswer) {
          const myFeedback: MockExamQuestionFeedback[] = [];
          const userFeedback: MockExamQuestionFeedback[] = [];
          let feedbackTotalCount = 0;
          item.mockExamQuestionFeedback.forEach((feedback) => {
            if (feedback.user.id === meQuery?.me.user?.id) {
              myFeedback.push(feedback as MockExamQuestionFeedback);
            } else {
              userFeedback.push(feedback as MockExamQuestionFeedback);
            }
          });
          if (meQuery?.me.user) {
            feedbackTotalCount = myFeedback.length + userFeedback.length;
          } else {
            feedbackTotalCount = userFeedback.length;
          }
          if (feedbackTotalCount > 0) {
            contents.push({
              text: '추가답안',
              style: 'subHeader',
              margin: [0, 0, 0, 5],
            });
            myFeedback.forEach((feedback) => {
              contents.push({
                text: `작성자: ${feedback.user.nickname}\n${feedback.content}\n추천: ${feedback.recommendationCount.good} 비추천: ${feedback.recommendationCount.bad}`,
                margin: [0, 0, 0, 10],
              });
            });
            userFeedback.forEach((feedback) => {
              contents.push({
                text: `작성자: ${feedback.user.nickname}\n${feedback.content}\n추천: ${feedback.recommendationCount.good} 비추천: ${feedback.recommendationCount.bad}`,
                margin: [0, 0, 0, 10],
              });
            });
          }
        }
      }
      const fonts = {
        NotoSans: {
          normal: 'NotoSansKR-Regular.otf',
          bold: 'NotoSansKR-Bold.otf',
        },
      };
      const docDefinition = {
        content: [
          {
            text: '실기시험 준비는 모두CBT! (https://moducbt.com)',
            link: 'https://moducbt.com',
            color: '#1890ff',
            fontSize: 12,
          },
          { text: title, style: 'header' },
          ...contents,
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          subHeader: {
            fontSize: 12,
            bold: true,
          },
        },
        defaultStyle: {
          font: 'NotoSans',
        },
      };
      const pdfDoc = await pdfMake.createPdf(docDefinition, null, fonts);
      await pdfDoc.download(
        `${title}${hasSolution ? '(정답포함)' : '(정답미포함)'}.pdf`
      );
      setPdfDownloadLoading(false);
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
          {!isPremium && (
            <Button
              onClick={onClickDownloadButton}
              className="exam-solution-page-solution-all-hide-button"
              type="primary"
            >
              다운로드
            </Button>
          )}
        </div>
        <h1 className="not-draggable">
          {convertExamTitle(title || '')} 문제/해설
        </h1>
        {!isRandomMode && (
          <p className="exam-solution-page-author-name">{`제작자: ${
            currentQuestionsQuery?.readMockExamQuestionsByMockExamId?.author
          }${coAuthor ? ', ' + coAuthor : ''}`}</p>
        )}
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
                      <GoogleAd type="feed" />
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
            onCancel={({ pdfMake, pdfFonts }) => {
              onDownloadPdf({ hasSolution: false, pdfMake, pdfFonts });
            }}
            onConfirm={({ pdfMake, pdfFonts }) => {
              onDownloadPdf({ hasSolution: true, pdfMake, pdfFonts });
            }}
            confirmButtonLoading={pdfDownloadLoading}
            cancelButtonLoading={pdfDownloadLoading}
            footerOptions={pdfDownloadSelectModalFooterOptions}
          />
        )}
      </Portal>
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
