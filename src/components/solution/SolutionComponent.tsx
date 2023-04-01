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
import { Button, Input, message } from 'antd';
import { debounce, shuffle, throttle } from 'lodash';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import SolutionComponentSkeleton from './SolutionComponentSkeleton';
import { OnDownloadPdfArgs } from '@components/me/memo/MemoComponent';
import axios from 'axios';
import { MockExamImageType } from 'types';
import useToggle from '@lib/hooks/useToggle';
import PdfDownloadSelectModal from '@components/common/modal/PdfDownloadSelectModal';
import { SearchOutlined } from '@ant-design/icons';

const GoogleAd = dynamic(() => import('@components/common/ad/GoogleAd'), {
  ssr: false,
});

interface SolutionComponentProps {
  questionsQuery?: ReadMockExamQuestionsByMockExamIdQuery;
  isPreview?: boolean;
  hasSearchInput?: boolean;
  hasNewWindowButton?: boolean;
  subDescription?: string;
  coProducer?: string;
}

const SolutionComponent: React.FC<SolutionComponentProps> = ({
  questionsQuery,
  isPreview = false,
  hasNewWindowButton = true,
  hasSearchInput = false,
  subDescription,
  coProducer,
}) => {
  const {
    value: pdfDownloadConfirmModalState,
    onToggle: onTogglePdfDownloadConfirmModalState,
  } = useToggle(false);
  const [pdfDownloadLoading, setPdfDownloadLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
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
  const examId = Number(String(router.query.Id));
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
      }
    })();
  }, [router.query.Id]);
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
    setFilteredQuestions(shuffle);
  };

  const onDownloadPdf = async ({ hasSolution }: OnDownloadPdfArgs) => {
    try {
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
          margin: hasSolutionImage ? [0, 0, 0, 0] : [0, 0, 0, 40],
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
            margin: [0, 10, 0, 40],
          });
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
      console.log(e);
      setPdfDownloadLoading(false);
      message.error('다운로드에 실패했습니다.');
    }
  };
  const onChangeSearchInput = (value: string) => {
    const filteredQuestions = questions.filter((question) => {
      return removeWhiteSpace(`Q${question.number}${question.question}`)
        .toLocaleLowerCase()
        .includes(removeWhiteSpace(value).toLocaleLowerCase());
    });
    setFilteredQuestions(filteredQuestions);
    window.scrollTo(0, 250);
  };
  const debounceOnChange = debounce(onChangeSearchInput, 800);

  return (
    <SolutionComponentContainer>
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
          className="exam-solution-page-solution-all-hide-button"
          type="primary"
        >
          섞기
        </Button>
        <Button
          onClick={onTogglePdfDownloadConfirmModalState}
          className="exam-solution-page-solution-all-hide-button"
          type="primary"
        >
          다운로드
        </Button>
      </div>
      <h1 className="not-draggable">
        {convertExamTitle(title || '')} 문제/해설
      </h1>
      <p className="exam-solution-page-author-name">{`제작자: ${
        currentQuestionsQuery?.readMockExamQuestionsByMockExamId?.author
      }${coProducer ? ', ' + coProducer : ''}`}</p>
      {subDescription && (
        <p className="exam-solution-page-author-name">{subDescription}</p>
      )}
      {hasSearchInput && (
        <div className="exam-solution-page-search-input-wrapper">
          <Input
            prefix={<SearchOutlined />}
            placeholder="문제 내용을 검색해보세요."
            onChange={(e) => {
              debounceOnChange(e.target.value);
            }}
          />
          {searchLoading && <div>검색중입니다..</div>}
        </div>
      )}
      <ul>
        {(filteredQuestions || questions)?.map((el, index) => {
          return (
            <div key={index}>
              <ExamSolutionList
                isSolutionAllHide={isSolutionAllHide}
                question={el}
                title={convertExamTitle(title || '')}
                refetch={refetchReadQuestions}
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

      {pdfDownloadConfirmModalState && (
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
        />
      )}
    </SolutionComponentContainer>
  );
};

export default SolutionComponent;

const SolutionComponentContainer = styled.div`
  padding: 20px;
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
    position: sticky;
    top: 59px;
    z-index: 999;
    margin-left: -20px;
    margin-right: -20px;
    input {
      height: 30px;
    }
  }
  @media (max-width: ${responsive.medium}) {
    h1 {
      font-size: 1.1rem;
    }
  }
  .solution-page-google-ad {
    margin-top: 20px;
  }
`;
