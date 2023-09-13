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
import { Button, Checkbox, Input, Radio, RadioChangeEvent } from 'antd';
import Select, { DefaultOptionType } from 'antd/lib/select';
import { checkboxOption } from 'customTypes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QuestionState } from 'types';
import { Categories } from '../../../../pages/exam/randomselect';
import { useDispatch } from 'react-redux';
import { coreActions } from '@modules/redux/slices/core';
import { checkRole } from '@lib/utils/utils';
import { EXAM_TYPE } from '@components/main/Main.type';
import RandomMyExamSelector from './RandomMyExamSelector';
import Link from 'next/link';
import RandomPartnerExamSelector from './RandomPartnerExamSelector';

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
  const [checkedStates, setCheckedStates] = useState<QuestionState[]>([]);
  const [examType, setExamType] = useState<EXAM_TYPE>(EXAM_TYPE.MODUCBT_EXAM);
  const [limit, setLimit] = useState(14);

  const [selectedModucbtCategory, setSelectedModucbtCategory] =
    useState<DefaultOptionType | null>(null);
  const [selectedModucbtTitles, setSelectedModucbtTitles] = useState<number[]>(
    []
  );

  const [selectedMyCategory, setSelectedMyCategory] =
    useState<DefaultOptionType | null>(null);

  const [selectedMyTitles, setSelectedMyTitles] = useState<number[]>([]);
  const [selectedPartnerTitles, setSelectedPartnerTitles] = useState<number[]>(
    []
  );
  const [selectedPartnerCategory, setSelectedPartnerCategory] =
    useState<DefaultOptionType | null>(null);

  const [titles, setTitles] = useState<DefaultOptionType[]>([]);
  const [routeLoading, setRouteLoading] = useState(false);
  const { data: meQuery, loading: meQueryLoading } = useMeQuery();
  const isLoggedIn = meQuery?.me.user ? true : false;

  const notYetSelectedExam =
    !!(examType === EXAM_TYPE.MY_EXAM && selectedMyTitles.length < 1) ||
    !!(examType === EXAM_TYPE.EHS_MASTER && selectedPartnerTitles.length < 1) ||
    !!(examType === EXAM_TYPE.MODUCBT_EXAM && selectedModucbtTitles.length < 1);

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
        const { category, selectedModucbtTitles } = savedRandomExamInfo;
        if (category) {
          onChangeCategory(category);
        }
        if (
          Array.isArray(selectedModucbtTitles) &&
          selectedModucbtTitles.length >= 1
        ) {
          onChangeExam(selectedModucbtTitles);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onChangeCategory = async (category: DefaultOptionType) => {
    setSelectedModucbtTitles([]);
    storage.set('randomExamInfo', {
      category: category,
      selectedModucbtTitles: [],
    });
    setSelectedModucbtCategory(category);
    const filteredTitles = titlesAndCategories.filter(
      (el) => el.category === category.label
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
        setSelectedModucbtTitles([]);
        storage.set('randomExamInfo', {
          ...savedRandomExamInfo,
          selectedModucbtTitles: [],
        });
        return;
      }
      setSelectedModucbtTitles(allTitleIds);
      storage.set('randomExamInfo', {
        ...savedRandomExamInfo,
        selectedModucbtTitles: allTitleIds,
      });
      return;
    }
    storage.set('randomExamInfo', {
      ...savedRandomExamInfo,
      selectedModucbtTitles: value,
    });
    setSelectedModucbtTitles(value);
  };

  const handleStart = (type: 'exam' | 'solution') => {
    if (!meQuery?.me.user) {
      openLoginModal();
      return;
    }
    if (
      !checkRole({ roleIds: [1, 2, 3], meQuery }) &&
      examType !== EXAM_TYPE.EHS_MASTER
    ) {
      router.push('/pricing');
      return;
    }
    let es: string;
    es = JSON.stringify(
      examType === EXAM_TYPE.MY_EXAM
        ? selectedMyTitles
        : examType === EXAM_TYPE.EHS_MASTER
        ? selectedPartnerTitles
        : selectedModucbtTitles
    );
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
        c:
          examType === EXAM_TYPE.MY_EXAM
            ? (selectedMyCategory?.label as string)
            : examType === EXAM_TYPE.EHS_MASTER
            ? (selectedPartnerCategory?.label as string)
            : (selectedModucbtCategory?.label as string),
      },
    });
  };
  const onChangeExamType = (e: RadioChangeEvent) => {
    setExamType(e.target.value);
  };
  return (
    <RandomSelectComponentContainer>
      <div className="random-select-exam-wrapper">
        <div className="random-select-exam-selector-wrapper">
          <Radio.Group
            onChange={onChangeExamType}
            defaultValue={EXAM_TYPE.MODUCBT_EXAM}
          >
            <Radio.Button value={EXAM_TYPE.MODUCBT_EXAM}>모두CBT</Radio.Button>
            <Radio.Button value={EXAM_TYPE.EHS_MASTER}>
              직8딴(중복소거)
            </Radio.Button>
            <Radio.Button value={EXAM_TYPE.MY_EXAM}>내 시험지</Radio.Button>
          </Radio.Group>
          {examType === EXAM_TYPE.MY_EXAM && (
            <Link href="/exam/write">
              <Button type="primary" size="large" style={{ width: '100%' }}>
                시험지 만들기
              </Button>
            </Link>
          )}
          {examType === EXAM_TYPE.MY_EXAM && (
            <RandomMyExamSelector
              selectedMyCategory={selectedMyCategory}
              selectedMyTitles={selectedMyTitles}
              setSelectedMyCategory={setSelectedMyCategory}
              setSelectedMyTitles={setSelectedMyTitles}
            />
          )}
          {examType === EXAM_TYPE.EHS_MASTER && (
            <RandomPartnerExamSelector
              selectedPartnerCategory={selectedPartnerCategory}
              selectedPartnerTitles={selectedPartnerTitles}
              setSelectedPartnerCategory={setSelectedPartnerCategory}
              setSelectedPartnerTitles={setSelectedPartnerTitles}
            />
          )}
          {examType === EXAM_TYPE.MODUCBT_EXAM && (
            <>
              <Select
                value={selectedModucbtCategory?.value}
                onChange={(value, option) =>
                  onChangeCategory(option as DefaultOptionType)
                }
                options={categories}
                size="large"
                placeholder="카테고리를 선택해주세요"
              />
              <Select
                className="multiple-random-exam-selector"
                mode="multiple"
                size="large"
                options={titles}
                placeholder="시험을 추가해주세요."
                value={selectedModucbtTitles}
                onChange={onChangeExam}
              />
            </>
          )}
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
            disabled={notYetSelectedExam}
          >
            풀이모드
          </Button>
          <Button
            className="random-select-exam-start-button"
            onClick={() => handleStart('solution')}
            type="primary"
            loading={routeLoading}
            disabled={notYetSelectedExam}
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
    flex-direction: column;
    width: 100%;
    gap: 15px;
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
