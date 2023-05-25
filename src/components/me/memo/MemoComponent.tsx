import CardCategoryModal from '@components/common/modal/cardCategoryModal/CardCategoryModal';
import Portal from '@components/common/portal/Portal';
import {
  useDeleteQuestionCard,
  useLazyReadQuestionCards,
  useReadQuestionCardCategories,
  useUpdateQuestionCard,
} from '@lib/graphql/user/hook/useQuestionCard';
import useToggle from '@lib/hooks/useToggle';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Button, message, Select } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExamHistorySkeleton from '../examhistory/ExamHistorySkeleton';
import MemoCard, { OnUpdateQuestionCardArgs } from './MemoCard';
import { QuestionCard } from 'types';
import AddQuestionCardModal from '@components/common/modal/addQuestionCardModal/AddQuestionCardModal';
import { shuffle } from 'lodash';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { handleError } from '@lib/utils/utils';
import ConfirmModal from '@components/common/modal/ConfirmModal';
import PdfDownloadSelectModal from '@components/common/modal/PdfDownloadSelectModal';

export type OnDownloadPdfArgs = {
  hasSolution: boolean;
  pdfMake: any;
  pdfFonts: any;
};

interface MemoComponentProps {}

const MemoComponent: React.FC<MemoComponentProps> = () => {
  const [deleteQuestionCard] = useDeleteQuestionCard();
  const [updateQuestionCard] = useUpdateQuestionCard();
  const {
    value: cardCategoryModalState,
    onToggle: onToggleCardCategoryModalState,
  } = useToggle(false);
  const {
    value: addQuestionCardModalState,
    onToggle: onToggleAddQuestionCardModalState,
  } = useToggle(false);
  const {
    value: pdfDownloadConfirmModalState,
    onToggle: onTogglePdfDownloadConfirmModalState,
  } = useToggle(false);
  const { value: allSolutionVisible, onToggle: onToggleAllSolutionVisible } =
    useToggle(true);
  const [cardCategories, setCardCategories] = useState<DefaultOptionType[]>([]);
  const [questionCards, setQuestionCards] = useState<QuestionCard[]>([]);
  const [pdfDownloadLoading, setPdfDownloadLoading] = useState(false);
  const [selectedCardCategory, setSelectedCardCategory] =
    useState<DefaultOptionType>();
  const { data: categoriesData, loading: readCategoriesLoading } =
    useReadQuestionCardCategories();
  const [readQuestionCards, { data: questionCardsData }] =
    useLazyReadQuestionCards('cache-and-network');

  useEffect(() => {
    if (
      categoriesData?.readMyQuestionCardCategories.categories &&
      cardCategories.length === 0
    ) {
      setCardCategories(
        categoriesData.readMyQuestionCardCategories.categories.map(
          (category) => ({ value: category.id, label: category.name })
        )
      );
    }
  }, [categoriesData]);

  useEffect(() => {
    if (
      questionCardsData?.readMyQuestionCards.questionCards &&
      questionCards.length === 0
    ) {
      setQuestionCards(
        questionCardsData.readMyQuestionCards.questionCards as QuestionCard[]
      );
    }
  }, [questionCardsData]);

  if (readCategoriesLoading || !categoriesData) return <ExamHistorySkeleton />;

  const onChangeCategory = async (
    value: any,
    option: DefaultOptionType | DefaultOptionType[]
  ) => {
    setSelectedCardCategory(option as DefaultOptionType);
    const res = await readQuestionCards({
      variables: {
        input: {
          categoryId: value,
        },
      },
    });
    if (res.data?.readMyQuestionCards.questionCards) {
      setQuestionCards(
        res.data.readMyQuestionCards.questionCards as QuestionCard[]
      );
    }
  };

  const onDeleteQuestionCard = async (id: number) => {
    const confirmed = confirm('정말 삭제하시겠습니까?');
    if (!confirmed) return;
    const res = await deleteQuestionCard({
      variables: {
        input: {
          ids: [id],
        },
      },
    });
    if (res.data?.deleteQuestionCards.ok) {
      const newQuestionCards = questionCards.filter((item) => item.id !== id);
      setQuestionCards(newQuestionCards);
      return message.success('삭제되었습니다.');
    }
    return message.error('삭제에 실패했습니다.');
  };
  const onUpdateQuestionCard = async ({
    question,
    solution,
    id,
  }: OnUpdateQuestionCardArgs): Promise<boolean> => {
    const confirmed = confirm('정말 수정하시겠습니까?');
    if (!confirmed) return false;
    const res = await updateQuestionCard({
      variables: {
        input: {
          questionId: id,
          question,
          solution,
        },
      },
    });
    if (res.data?.updateQuestionCard.ok) {
      const newQuestionCards = questionCards.map((item) => {
        if (item.id === id) {
          return { ...item, question, solution };
        }
        return item;
      });
      setQuestionCards(newQuestionCards);
      message.success('수정되었습니다.');
      return true;
    }
    message.error('수정에 실패했습니다.');
    return false;
  };
  const onShuffleCards = () => {
    setQuestionCards(shuffle);
  };

  const onDownloadPdf = async ({
    hasSolution,
    pdfFonts,
    pdfMake,
  }: OnDownloadPdfArgs) => {
    try {
      setPdfDownloadLoading(true);
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      const title = selectedCardCategory?.label as string;
      const contents: any[] = [];
      questionCards.forEach((item, index) => {
        contents.push({
          text: `${index + 1}. ${item.question}`,
          background: '#f0f3f3',
          margin: [0, 20],
        });
        contents.push({
          text: '정답',
          style: 'subHeader',
          margin: [0, 0, 0, 5],
        });
        const solutionText = hasSolution
          ? item.solution
          : item.solution.replaceAll(/[^\n]/g, '') + '\n';
        contents.push({ text: solutionText, margin: [0, 0, 0, 20] });
      });
      const fonts = {
        NotoSans: {
          normal: 'NotoSansKR-Regular.otf',
          bold: 'NotoSansKR-Bold.otf',
        },
      };
      const docDefinition = {
        content: [{ text: title, style: 'header' }, ...contents],
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

  return (
    <MemoComponentContainer>
      <div className="memo-page-top-button-wrapper">
        <Button
          type="primary"
          htmlType="button"
          className="memo-page-category-management-button"
          onClick={onToggleCardCategoryModalState}
        >
          카테고리관리
        </Button>
        <Button
          type="primary"
          className="memo-page-add-question-button"
          onClick={onToggleAddQuestionCardModalState}
        >
          문제추가
        </Button>
        <Button
          onClick={() => {
            if (questionCards.length === 0)
              return message.error('문제가 없습니다. 문제를 추가해주세요.');
            onTogglePdfDownloadConfirmModalState();
          }}
          loading={pdfDownloadLoading}
          type="primary"
        >
          다운로드
        </Button>
      </div>

      {cardCategories.length === 0 && (
        <p className="memo-page-category-info-text">
          카테고리 등록 후, 이용해주세요.
        </p>
      )}
      <Select
        options={cardCategories}
        onChange={onChangeCategory}
        className="memo-page-category-select"
        placeholder="카테고리를 선택해주세요."
      />
      {questionCards.length >= 1 && (
        <div className="memo-page-top-second-button-wrapper">
          <Button
            type="primary"
            htmlType="button"
            className="memo-page-category-management-button"
            onClick={onToggleAllSolutionVisible}
          >
            {allSolutionVisible ? '정답 모두 가리기' : '정답 모두 보이기'}
          </Button>
          <Button
            type="primary"
            className="memo-page-add-question-button"
            onClick={onShuffleCards}
          >
            섞기
          </Button>
        </div>
      )}
      <ul className="memo-page-question-card-list">
        {!selectedCardCategory || questionCardsData ? (
          questionCards.length >= 1 &&
          questionCards.map((card) => (
            <MemoCard
              key={card.id}
              onDeleteQuestionCard={onDeleteQuestionCard}
              onUpdateQuestionCard={onUpdateQuestionCard}
              card={card as QuestionCard}
              defalueIsSolutionVisible={allSolutionVisible}
            />
          ))
        ) : (
          <ExamHistorySkeleton />
        )}
      </ul>
      <Portal>
        {cardCategoryModalState && (
          <CardCategoryModal
            open={cardCategoryModalState}
            onClose={onToggleCardCategoryModalState}
            cardCategories={cardCategories}
            setCardCategories={setCardCategories}
          />
        )}
        {addQuestionCardModalState && (
          <AddQuestionCardModal
            open={addQuestionCardModalState}
            onClose={onToggleAddQuestionCardModalState}
            cardCategories={cardCategories}
            setQuestionCards={setQuestionCards}
          />
        )}
        {pdfDownloadConfirmModalState && (
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
          />
        )}
      </Portal>
    </MemoComponentContainer>
  );
};

export default MemoComponent;

const MemoComponentContainer = styled.div`
  margin-bottom: 20px;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  .memo-page-category-select {
    margin-top: 20px;
    width: 100%;
    max-width: 500px;
  }
  .memo-page-category-info-text {
    margin-top: 5px;
    font-size: 0.9rem;
    color: ${palette.gray_700};
  }
  .memo-page-top-button-wrapper,
  .memo-page-top-second-button-wrapper {
    display: flex;
    gap: 10px;
  }
  .memo-page-top-second-button-wrapper {
    margin-top: 10px;
  }

  .memo-page-question-card-list {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  @media (max-width: ${responsive.medium}) {
    padding-top: 20px;
  }
`;
