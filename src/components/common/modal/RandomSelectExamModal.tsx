import { ClearOutlined } from '@ant-design/icons';
import { TitlesAndCategories } from '@components/main/MainComponent';
import { convertExamTurn } from '@lib/utils/utils';
import palette from '@styles/palette';
import { Button, Tag } from 'antd';
import Select, { DefaultOptionType } from 'antd/lib/select';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Label from '../label/Label';
import Modal, { ModalProps } from './Modal';

interface RandomSelectExamModalProps extends Omit<ModalProps, 'children'> {
  categories: DefaultOptionType[];
  titles: DefaultOptionType[];
  titlesAndCategories: TitlesAndCategories[];
}

const RandomSelectExamModal: React.FC<RandomSelectExamModalProps> = ({
  onClose,
  open,
  categories,
  titlesAndCategories,
}) => {
  const router = useRouter();
  const [selectedExams, setSelectedExams] = useState<number[]>([]);
  const [category, setCategory] = useState('');
  const [titles, setTitles] = useState<DefaultOptionType[]>([]);
  const [routeLoading, setRouteLoading] = useState(false);
  useEffect(() => {
    if (open) {
      const multipleSelector = document.querySelector(
        '.multiple-random-exam-selector'
      );
      if (multipleSelector) {
        const multipleSelectorInput: HTMLInputElement | null =
          multipleSelector.querySelector('.ant-select-selection-search-input');
        if (multipleSelectorInput) {
          multipleSelectorInput.inputMode = 'none';
        }
      }
    }
  }, [open]);
  const onChangeCategory = async (value: string) => {
    setSelectedExams([]);
    setCategory(value);
    const filteredTitles = titlesAndCategories.filter(
      (el) => el.category === value
    );
    const titles: DefaultOptionType[] = filteredTitles[0].titles.map(
      (title) => ({
        value: title.id,
        label: convertExamTurn(title.title),
      })
    );
    titles.unshift({ value: 0, label: '전체' });
    setTitles(titles);
  };

  const onChangeExam = (value: number[]) => {
    if (value.includes(0)) {
      setSelectedExams([0]);
      return;
    }
    setSelectedExams(value);
  };

  const onClearExams = () => {
    setSelectedExams([]);
  };

  const onStartRandomExam = () => {
    let es: string;
    const isAllSelected = selectedExams.includes(0);
    if (isAllSelected) {
      const titleIds = titles.map((title) => title.value);
      titleIds.shift();
      es = JSON.stringify(titleIds);
    } else {
      es = JSON.stringify(selectedExams);
    }
    setRouteLoading(true);
    router.push({
      pathname: '/exam',
      query: {
        es,
        q: '1',
        r: false,
        t: '랜덤모의고사',
        c: category,
      },
    });
  };

  return (
    <RandomSelectExamModalContainer open={open} onClose={onClose}>
      <div className="random-select-exam-wrapper">
        <div className="random-select-exam-selector-wrapper">
          <Label content={'시험선택'} />
          <Select
            options={categories}
            onChange={onChangeCategory}
            value={category}
          />
        </div>
        <div className="random-select-exam-selector-wrapper">
          <div className="random-select-exam-turn-label-wrapper">
            <Label content={'회차추가'} />
            <button
              className="random-select-exam-turn-clear-button"
              onClick={onClearExams}
            >
              <ClearOutlined />
            </button>
          </div>
          <Select
            className="multiple-random-exam-selector"
            mode="multiple"
            options={titles}
            value={selectedExams}
            onChange={onChangeExam}
          />
        </div>
        <Button
          className="random-select-exam-start-button"
          onClick={onStartRandomExam}
          type="primary"
          loading={routeLoading}
          disabled={selectedExams.length < 1}
        >
          랜덤모의고사 시작
        </Button>
      </div>
    </RandomSelectExamModalContainer>
  );
};

export default RandomSelectExamModal;

const RandomSelectExamModalContainer = styled(Modal)`
  max-width: 500px;
  .random-select-exam-turn-label-wrapper {
    display: flex;
    gap: 15px;
    align-items: center;
  }
  .random-select-exam-turn-clear-button {
    position: relative;
    top: 5px;
    :hover {
      svg {
        color: ${palette.antd_blue_01};
      }
    }
  }
  .random-select-exam-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 400px;
  }
  .random-select-exam-selector-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .random-select-exam-start-button {
    margin-top: 20px;
  }
  .multiple-random-exam-selector {
    .ant-select-selector {
      max-height: 250px;
      overflow-y: auto;
    }
  }
`;
