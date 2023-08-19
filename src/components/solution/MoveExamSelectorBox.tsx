import {
  useLazyReadExamCategoryByExamId,
  useReadExamTitles,
} from '@lib/graphql/user/hook/useExam';
import palette from '@styles/palette';
import { Button, Spin, Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MoveExamSelectorBoxBlock = styled.div`
  .move-exam-content-category-select,
  .move-exam-content-title-select {
    width: 100%;
  }
  .move-exam-content-modal {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .move-exam-content-label {
    font-size: 14px;
    color: ${palette.gray_500};
  }
  .move-exam-content-title {
    font-size: 16px;
  }
  .move-exam-content-button-wrapper {
    display: flex;
    gap: 10px;
    button {
      width: 100%;
    }
  }
  .move-exam-content-spin-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 104px;
  }
`;

interface MoveExamSelectorBoxProps {
  examId: number;
}

const MoveExamSelectorBox: React.FC<MoveExamSelectorBoxProps> = (props) => {
  const { examId } = props;
  const [readCategory, { data: categoryQuery }] =
    useLazyReadExamCategoryByExamId();
  const router = useRouter();
  const [readTitles, { loading: readTitlesLoading }] = useReadExamTitles();
  const [gotoSolutionPageLoading, setGotoSolutionPageLoading] = useState(false);
  const [titles, setTitles] = useState<DefaultOptionType[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<DefaultOptionType | null>(
    null
  );
  const handleChangeTitles = (
    value: number,
    option: DefaultOptionType | DefaultOptionType[]
  ) => {
    console.log(option);
    setSelectedTitle(option as DefaultOptionType);
  };

  const gotoSolutionPage = () => {
    setGotoSolutionPageLoading(true);
    router.push({
      pathname: `/exam/solution/${selectedTitle?.value}`,
    });
  };

  useEffect(() => {
    if (!examId) return;
    readCategory({
      variables: {
        input: {
          examId,
        },
      },
    });
  }, [examId]);

  useEffect(() => {
    if (categoryQuery?.readMockExamCategoryByExamId.ok) {
      const category = categoryQuery.readMockExamCategoryByExamId.category;
      if (!category) return;
      (async () => {
        const res = await readTitles({
          variables: {
            input: {
              name: category.name,
              all: true,
            },
          },
        });
        if (res.data?.readMockExamTitlesByCateory.ok) {
          const newTitles = res.data.readMockExamTitlesByCateory.titles.map(
            (title) => ({
              label: title.slug || title.title,
              value: title.id,
            })
          );
          setTitles(newTitles);
          console.log(newTitles);
        }
      })();
    }
  }, [categoryQuery]);

  useEffect(() => {
    console.log(titles);
    if (titles.length > 0) {
      const defualtTitle = titles.find((title) => {
        console.log(title.value, Number(examId));
        return title.value === Number(examId);
      });
      if (defualtTitle) setSelectedTitle(defualtTitle);
    }
  }, [titles]);

  return (
    <MoveExamSelectorBoxBlock>
      {readTitlesLoading ? (
        <div className="move-exam-content-spin-wrapper">
          <Spin />
        </div>
      ) : (
        <div className="move-exam-content-modal">
          <p className="move-exam-content-label">회차 이동</p>
          <Select
            options={titles}
            value={selectedTitle?.value as number}
            size="large"
            loading={readTitlesLoading}
            onChange={handleChangeTitles}
            placeholder="시험을 선택해주세요."
            className="move-exam-content-title-select"
          />

          <Button
            size="large"
            type="primary"
            loading={gotoSolutionPageLoading}
            onClick={gotoSolutionPage}
          >
            이동하기
          </Button>
        </div>
      )}
    </MoveExamSelectorBoxBlock>
  );
};

export default MoveExamSelectorBox;
