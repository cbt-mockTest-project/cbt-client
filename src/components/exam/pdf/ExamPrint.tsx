import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import EditorStyle from '@styles/editorStyle';
import palette from '@styles/palette';
import { Button, Spin, App } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { checkIsEhsMasterExam, checkRole, handleError } from '@lib/utils/utils';
import { Print } from '@mui/icons-material';
import { fetchImageAsBase64 } from '@lib/apis/upload';
import useAuth from '@lib/hooks/useAuth';
import { useEditProfileMutation, useMeQuery } from '@lib/graphql/hook/useUser';
import { useRouter } from 'next/router';
import GridOnIcon from '@mui/icons-material/GridOn';
import StudySolveLimitInfoModal from '@components/study/StudySolveLimitInfoModal';
import ExcelJS from 'exceljs';
import { useAppSelector } from '@modules/redux/store/configureStore';
import { SessionStorage } from '@lib/utils/sessionStorage';
import {
  PUBLIC_CATEGORY_ID,
  PUBLIC_EXAM_ID,
} from '@lib/constants/sessionStorage';

const ExamPrintComponentBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 210mm;
  .hide {
    position: relative;
    ::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: white;
      top: 0;
      left: 0;
      z-index: 9999;
    }
  }
  .exam-print-button-wrapper {
    display: flex;
    width: 100%;
    gap: 10px;
    padding: 20px;
  }
  .exam-print-export-button {
    display: flex;
    gap: 10px;
  }
  .exam-print-export-button-icon {
    position: relative;
    top: 2px;
  }
  .exam-print-area {
    display: flex;
    flex-direction: column;
    width: 210mm;
  }
  .exam-print-question {
    padding: 20px;
  }
  .exam-print-question-content,
  .exam-print-solution-content {
    word-break: break-all;
    white-space: pre-wrap;
    ${EditorStyle}
  }
  .exam-print-question-number {
    border-bottom: 3px solid ${palette.antd_blue_01};
    width: 105px;
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.color('colorTextTertiary')};
  }
  .exam-print-question-content {
    background-color: ${palette.blue_100};
    padding: 10px;
  }
  .exam-print-solution-label {
    width: 35px;
    margin-top: 15px;
    font-weight: bold;
    margin-bottom: 5px;
    border-bottom: 2px solid ${palette.antd_blue_01};
  }
`;

const DimmedBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  .dimmed {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: white;
    gap: 20px;
    font-size: 20px;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    transition: background-color 0.3s;
  }
`;

interface ExamPrintComponentProps {}

function transformHtmlString(htmlStr: string) {
  const regex = /<p>(.*?)<\/p>/g;
  const transformedStr = htmlStr.replace(regex, (match, p1) => {
    const withoutTags = p1.replace(/<[^>]+>/g, '');
    return withoutTags + '\n';
  });

  return transformedStr;
}

const ExamPrintComponent: React.FC<ExamPrintComponentProps> = ({}) => {
  const { message } = App.useApp();
  const router = useRouter();
  const sessionStorage = new SessionStorage();
  const examId = Number(router.query.Id);
  const categoryId = Number(router.query.categoryId);
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
  const { handleCheckLogin, handleUpdateUserCache } = useAuth();
  const { data: meQuery } = useMeQuery();
  const [editProfileMutation] = useEditProfileMutation();
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [isPrintLimitModalOpen, setIsPrintLimitModalOpen] = useState(false);
  const [isPrintLoading, setIsPrintLoading] = useState<boolean>(false);
  const [isExcelLoading, setIsExcelLoading] = useState<boolean>(false);
  const [isSolutionHide, setIsSolutionHide] = useState<boolean>(false);
  const [isContentLoaded, setIsContentLoaded] = useState<boolean>(false);
  const [prevPageHeight, setPrevPageHeight] = useState<number>(0);
  const [base64Images, setBase64Images] = useState<{
    [key: string]: string;
  }>({});

  const questions = useAppSelector((state) => state.mockExam.questions);
  const isPrivate = useAppSelector((state) => state.mockExam[0]?.isPrivate);
  const printAreaRef = useRef<HTMLDivElement>(null);
  const handleExportPdf = async () => {
    try {
      if (!handleCheckLogin()) return;
      if (!meQuery?.me) return;
      const isEhsExam = checkIsEhsMasterExam([examId]);
      if (isEhsExam) return;
      const isBasicPlanUser = checkRole({ roleIds: [1, 2, 3], meQuery });
      if (meQuery.me.user.printLimit <= -1 && !isBasicPlanUser) {
        setIsPrintLimitModalOpen(true);
        return;
      }

      setIsPrintLoading(true);
      if (!printAreaRef.current) return;
      console.log('1');
      const canvas = await html2canvas(printAreaRef.current, { useCORS: true });
      console.log('2');
      const imgData = canvas.toDataURL('image/png');
      console.log('3');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      console.log('4');

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let position = 0;
      console.log('5');
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      const pageCount = Math.ceil(imgHeight / pdfHeight);
      let currentPage = 1;
      console.log('6');
      while (currentPage < pageCount) {
        position = -(pdfHeight * currentPage);
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        currentPage += 1;
      }
      console.log('7');
      const pdfBlob = pdf.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      window.open(url, '_blank');
      console.log('8');
      editProfileMutation({
        variables: {
          input: {
            printLimit: meQuery.me.user.printLimit - 1,
          },
        },
      });
      console.log('9');
    } catch (e) {
      console.log('pdf-error', e);
      handleError(e);
    } finally {
      setIsPrintLoading(false);
    }
  };

  const handleExportExcel = async () => {
    try {
      if (!handleCheckLogin()) return;
      if (!meQuery.me) return;
      const isEhsExam = checkIsEhsMasterExam([examId]);
      if (isEhsExam) return;
      const isBasicPlanUser = checkRole({ roleIds: [1, 2, 3], meQuery });

      if (meQuery.me.user.printLimit <= -1 && !isBasicPlanUser) {
        setIsPrintLimitModalOpen(true);
        return;
      }

      setIsExcelLoading(true);
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('sheet1');

      // 열 설정 조정
      worksheet.columns = [
        { header: '문제', key: 'question', width: 50 },
        { header: '정답', key: 'solution', width: 50 },
      ];

      await Promise.all(
        questions.map(async (question, index) => {
          await worksheet.addRow({
            question: transformHtmlString(question.question),
            solution: transformHtmlString(question.solution),
          });
        })
      );

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      setIsExcelLoading(false);
    } catch (e) {
      console.log(e);
      handleError(e);
    }
  };

  useEffect(() => {
    if (questions.length <= 0) return;
    try {
      const convertImagesToBase64 = async () => {
        const images: {
          [key: string]: string;
        } = {};

        await Promise.all(
          questions.map(async (question) => {
            if (question.question_img && question.question_img.length >= 1) {
              images[question.question_img[0].url] = await fetchImageAsBase64(
                question.question_img[0].url
              );
            }
            if (question.solution_img && question.solution_img.length >= 1) {
              images[question.solution_img[0].url] = await fetchImageAsBase64(
                question.solution_img[0].url
              );
            }
            return '';
          })
        );
        setBase64Images(images);
        setIsPageLoaded(true);
      };
      convertImagesToBase64();
    } catch (e) {
      handleError(e);
    }
  }, [questions]);

  useEffect(() => {
    try {
      if (!router.isReady) return;
      const publicExamId = sessionStorage.get(PUBLIC_EXAM_ID);
      const publicCategoryId = sessionStorage.get(PUBLIC_CATEGORY_ID);
      if (publicExamId && Number(publicExamId) === examId) {
        setHasAccess(true);
        return;
      }
      if (publicCategoryId && Number(publicCategoryId) === categoryId) {
        setHasAccess(true);
        return;
      }
      message.error('잘못된 접근입니다.');
      router.replace('/');
    } catch {
      router.replace('/');
    }
  }, [meQuery, isPrivate, examId, categoryId]);

  useEffect(() => {
    if (!isPageLoaded || !printAreaRef.current) return;
    if (prevPageHeight !== printAreaRef.current.clientHeight) {
      setPrevPageHeight(printAreaRef.current.clientHeight);
      return;
    }
    if (prevPageHeight === printAreaRef.current.clientHeight) {
      let initialHeight = 0;
      const A4_HEIGHT = 297 * 3.7795275591;
      const virtualQuestionElements = document.querySelectorAll(
        '.exam-print-question'
      );
      const newQuestionElements: any[] = [];
      virtualQuestionElements.forEach((element) => {
        initialHeight = initialHeight + element.clientHeight;
        if (initialHeight > A4_HEIGHT) {
          const heightLeft = A4_HEIGHT - (initialHeight - element.clientHeight);
          const blankBlock = document.createElement('div');
          blankBlock.style.height = `${heightLeft}px`;
          blankBlock.style.position = 'relative';
          newQuestionElements.push(blankBlock);
          initialHeight = element.clientHeight;
        }
        newQuestionElements.push(element);
      });

      printAreaRef.current.innerHTML = '';
      printAreaRef.current.append(...newQuestionElements);
    }
    setIsContentLoaded(true);
  }, [isPageLoaded, printAreaRef.current?.clientHeight, prevPageHeight]);

  if (questions.length <= 0 || !isPageLoaded || !hasAccess) return <Dimmed />;
  return (
    <ExamPrintComponentBlock>
      <div className="exam-print-button-wrapper">
        <Button
          onClick={() => setIsSolutionHide(!isSolutionHide)}
          className="exam-print-export-button"
          size="large"
        >
          <span>정답가리기</span>
        </Button>
        <Button
          onClick={handleExportPdf}
          loading={isPrintLoading}
          className="exam-print-export-button"
          size="large"
        >
          <span className="exam-print-export-button-icon">
            <Print />
          </span>
          <span>PDF</span>
        </Button>
        <Button
          onClick={handleExportExcel}
          loading={isExcelLoading}
          className="exam-print-export-button"
          size="large"
        >
          <span className="exam-print-export-button-icon">
            <GridOnIcon />
          </span>
          <span>Excel</span>
        </Button>
      </div>
      <div ref={printAreaRef} className="exam-print-area">
        {questions.map((question, index) => (
          <div className="exam-print-question" key={question.id}>
            <div className="exam-print-question-number">{index + 1}번 문제</div>
            <pre className="exam-print-question-content">
              {parse(question.question)}
            </pre>
            {question.question_img && question.question_img.length >= 1 && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={base64Images[question.question_img[0].url]}
                alt="문제이미지"
                style={{ maxWidth: '50%', height: 'auto' }}
              />
            )}
            <div className="exam-print-solution-label">정답</div>
            <div
              className={`exam-print-solution-content-wrapper ${
                isSolutionHide ? 'hide' : ''
              }`}
            >
              <pre className="exam-print-solution-content">
                {parse(question.solution || '')}
              </pre>
              {question.solution_img && question.solution_img.length >= 1 && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={base64Images[question.solution_img[0].url]}
                  alt="정답이미지"
                  style={{ maxWidth: '50%', height: 'auto' }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {!isContentLoaded && <Dimmed />}
      {isPrintLimitModalOpen && (
        <StudySolveLimitInfoModal
          title="출력이용권을 모두 사용하셨습니다 😊"
          open={isPrintLimitModalOpen}
          onCancel={() => setIsPrintLimitModalOpen(false)}
        />
      )}
    </ExamPrintComponentBlock>
  );
};

export default ExamPrintComponent;

const Dimmed = () => {
  return (
    <DimmedBlock>
      <div className="dimmed">
        <Spin size="large" />
        <p>출력 페이지 제작중...</p>
      </div>
    </DimmedBlock>
  );
};
