import Label from '@components/common/label/Label';
import ErrorText from '@components/common/layout/errorText/ErrorText';
import { TitlesAndCategories } from '@components/main/MainComponent';
import {
  circleIcon,
  clearIcon,
  loginModal,
  triangleIcon,
} from '@lib/constants';
import { useMeQuery } from '@lib/graphql/user/hook/useUser';
import { LocalStorage } from '@lib/utils/localStorage';
import { responsive } from '@lib/utils/responsive';
import palette from '@styles/palette';
import { Button, Checkbox, Input } from 'antd';
import { Option } from 'antd/lib/mentions';
import Select, { DefaultOptionType } from 'antd/lib/select';
import { checkboxOption } from 'customTypes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QuestionState, User, UserRole } from 'types';
import { Categories } from '../../../../pages/exam/randomselect';
import { useDispatch } from 'react-redux';
import { coreActions } from '@modules/redux/slices/core';
import { checkRole } from '@lib/utils/utils';

const states: checkboxOption[] = [
  { value: QuestionState.High, label: circleIcon },
  { value: QuestionState.Middle, label: triangleIcon },
  { value: QuestionState.Row, label: clearIcon },
  {
    value: QuestionState.Core,
    label: <div className="checkbox-label">안푼거</div>,
  },
];

interface RandomSelectComponentProps {
  categories: Categories[];
  titlesAndCategories: TitlesAndCategories[];
}

const RandomSelectComponent: React.FC<RandomSelectComponentProps> = ({
  categories,
  titlesAndCategories,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const openLoginModal = () => dispatch(coreActions.openModal(loginModal));
  const storage = new LocalStorage();
  const [selectedExams, setSelectedExams] = useState<number[]>([]);
  const [checkedStates, setCheckedStates] = useState<QuestionState[]>([]);
  const [limit, setLimit] = useState(14);
  const [category, setCategory] = useState<string>();
  const [titles, setTitles] = useState<DefaultOptionType[]>([]);
  const [routeLoading, setRouteLoading] = useState(false);
  const { data: meQuery, loading: meQueryLoading } = useMeQuery();
  const isLoggedIn = meQuery?.me.user ? true : false;
  useEffect(() => {
    try {
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
      const savedRandomExamInfo = storage.get('randomExamInfo');
      if (savedRandomExamInfo) {
        const { category, selectedExams } = savedRandomExamInfo;
        if (category) {
          onChangeCategory(category);
        }
        if (Array.isArray(selectedExams) && selectedExams.length >= 1) {
          onChangeExam(selectedExams);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onChangeCategory = async (value: string) => {
    setSelectedExams([]);
    storage.set('randomExamInfo', { category: value, selectedExams: [] });
    setCategory(value);
    const filteredTitles = titlesAndCategories.filter(
      (el) => el.category === value
    );
    const titles: DefaultOptionType[] = filteredTitles[0].titles.map(
      (title) => ({
        value: title.id,
        label: title.slug || title.title,
      })
    );
    titles.unshift({ value: 0, label: '전체' });
    setTitles(titles);
  };

  const onChangeExam = (value: number[]) => {
    const savedRandomExamInfo = storage.get('randomExamInfo');
    if (value.includes(0)) {
      const allTitleIds = titles
        .map((title) => Number(title.value))
        .filter((el) => el !== 0);
      if (allTitleIds.length + 1 === value.length) {
        setSelectedExams([]);
        storage.set('randomExamInfo', {
          ...savedRandomExamInfo,
          selectedExams: [],
        });
        return;
      }
      setSelectedExams(allTitleIds);
      storage.set('randomExamInfo', {
        ...savedRandomExamInfo,
        selectedExams: allTitleIds,
      });
      return;
    }
    storage.set('randomExamInfo', {
      ...savedRandomExamInfo,
      selectedExams: value,
    });
    setSelectedExams(value);
  };

  const handleStart = (type: 'exam' | 'solution') => {
    if (!meQuery?.me.user) {
      openLoginModal();
      return;
    }
    if (!checkRole({ roleIds: [1, 2, 3], meQuery })) {
      router.push('/pricing');
      return;
    }
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
      pathname: type === 'exam' ? '/exam' : '/exam/solution',
      query: {
        es,
        s: JSON.stringify(checkedStates),
        l: limit,
        q: '1',
        r: false,
        t: '랜덤모의고사',
        c: category,
      },
    });
  };
  return (
    <RandomSelectComponentContainer>
      <div className="random-select-exam-wrapper">
        <Select
          value={category}
          onChange={onChangeCategory}
          size="large"
          placeholder="카테고리를 선택해주세요"
        >
          {categories.map((category) => (
            <Option
              key={category.value as string}
              value={category.value as string}
              style={{
                color:
                  category.authorRole === UserRole.Admin
                    ? 'black'
                    : palette.blue_600,
              }}
            >
              {category.label}
            </Option>
          ))}
        </Select>
        <div className="random-select-exam-selector-wrapper">
          <Select
            className="multiple-random-exam-selector"
            mode="multiple"
            size="large"
            options={titles}
            placeholder="시험을 추가해주세요."
            value={selectedExams}
            onChange={onChangeExam}
          />
        </div>
        <div className="random-select-exam-modal-setting-wrapper">
          <Label content={'성취도별 문항보기'} />
          <div className="random-select-exam-modal-setting-checkbox-wrapper">
            <Checkbox
              className="random-select-exam-modal-setting-checkbox-all"
              onClick={() => {
                if (checkedStates.length === 0) return;
                setCheckedStates([]);
              }}
              checked={checkedStates.length === 0}
            >
              전체
            </Checkbox>
            <Checkbox.Group
              className="random-select-exam-modal-setting-checkbox-group"
              options={states}
              value={checkedStates}
              disabled={!isLoggedIn}
              onChange={(values) => {
                setCheckedStates(values as QuestionState[]);
              }}
            />
          </div>
          {!meQueryLoading && !isLoggedIn && (
            <ErrorText
              content="로그인 후 이용가능합니다."
              className="random-select-exam-modal-error-text"
            />
          )}
          <div className="random-select-exam-modal-setting-count-wrapper">
            <Label content={'문제 수'} />
            <Input
              value={limit}
              type="number"
              max={100}
              min={1}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="random-select-exam-modal-setting-count-input"
            />
          </div>
        </div>
        <div className="random-select-exam-start-button-wrapper">
          <Button
            className="random-select-exam-start-button"
            onClick={() => handleStart('exam')}
            type="primary"
            loading={routeLoading}
            disabled={selectedExams.length < 1}
          >
            풀이모드
          </Button>
          <Button
            className="random-select-exam-start-button"
            onClick={() => handleStart('solution')}
            type="primary"
            loading={routeLoading}
            disabled={selectedExams.length < 1}
          >
            해설모드
          </Button>
        </div>
      </div>
    </RandomSelectComponentContainer>
  );
};

export default RandomSelectComponent;

const RandomSelectComponentContainer = styled.div`
  width: 100%;
  max-width: 350px;
  margin: 0px auto;
  padding: 0 15px 30px 15px;
  .random-select-exam-turn-label-wrapper {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  .random-select-exam-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 400px;
  }
  .random-select-exam-selector-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 5px;
    margin-top: 15px;
  }
  .random-select-exam-start-button-wrapper {
    display: flex;
    margin-top: 15px;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .random-select-exam-start-button {
    height: 40px;
  }
  .multiple-random-exam-selector {
    width: 100%;
    .ant-select-selector {
      max-height: 250px;
      overflow-y: auto;
    }
  }
  .random-select-exam-modal-setting-wrapper {
    display: flex;
    flex-direction: column;
  }
  .random-select-exam-modal-setting-checkbox-group {
    .ant-checkbox-wrapper {
      span:last-child {
        padding: 0 5px;
      }
    }
    .circle-icon {
      position: relative;
      width: 16px;
      height: 16px;
      bottom: 1px;
    }
    .triangle-icon {
      position: relative;
      width: 16px;
      height: 16px;
      bottom: 1px;
    }
    .clear-icon {
      position: relative;
      bottom: 2px;
      width: 20px !important;
      height: 20px;
    }
    .checkbox-label {
      position: relative;
      bottom: 3px;
      height: 16px;
    }
    .ant-checkbox-wrapper {
      align-items: center;
      span:last-child {
        height: 16px;
      }
    }
  }
  .random-select-exam-modal-setting-checkbox-wrapper {
    display: flex;
    align-items: flex-end;
    .ant-checkbox-group {
      .ant-checkbox-group-item:not(:last-child) {
        max-width: 50px;
      }
    }
  }
  .random-select-exam-modal-setting-checkbox-all {
    min-width: 70px;
    margin-top: 3px;
  }
  .random-select-exam-modal-setting-count-wrapper {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 10px;
  }
  .random-select-exam-modal-setting-count-input {
    top: 7px;
    width: 100px;
  }
  .random-select-exam-modal-error-text {
    font-size: 0.8rem;
  }
  .random-select-exam-category-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .random-select-category-color-box {
    width: 20px;
    height: 10px;
  }
  .random-select-category-color-box.admin {
    background-color: black;
  }
  .random-select-category-color-box.user {
    background-color: ${palette.blue_600};
  }

  @media (max-width: ${responsive.medium}) {
    position: fixed;
    margin-top: 60px;
    padding-top: 40px;
    bottom: 55px;
    height: calc(100vh - 115px);
    overflow-y: auto;
    left: 0;
    right: 0;
  }
`;
