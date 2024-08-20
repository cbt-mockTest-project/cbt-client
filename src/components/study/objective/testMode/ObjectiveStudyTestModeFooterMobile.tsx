import { useAppSelector } from '@modules/redux/store/configureStore';
import { App, Button, Pagination } from 'antd';
import { ObjectiveExamMode } from 'customTypes';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const ObjectiveStudyTestModeFooterMobileBlock = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.color('colorBorder')};
  background-color: ${({ theme }) => theme.color('colorFillAlter')};
  gap: 20px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  .objective-study-footer-pagination {
    align-items: center !important;
    justify-content: center !important;
    width: 100%;
    .ant-pagination-next,
    .ant-pagination-prev {
      height: 100% !important;
    }

    .ant-pagination-next {
      margin-left: auto !important;
    }

    .ant-pagination-prev {
      margin-right: auto !important;
    }
  }
`;

interface ObjectiveStudyTestModeFooterMobileProps {}

const ObjectiveStudyTestModeFooterMobile: React.FC<
  ObjectiveStudyTestModeFooterMobileProps
> = () => {
  const { modal } = App.useApp();
  const totalQuestions = useAppSelector(
    (state) => state.mockExam.questions?.length
  );
  const isExistNotSolvedQuestion = useAppSelector(
    (state) =>
      !!state.mockExam.questions.find((question) => !question.myObjectiveAnswer)
  );

  const router = useRouter();
  const page = router.query.p || 1;

  const handleSubmit = () => {
    if (isExistNotSolvedQuestion) {
      modal.confirm({
        title: '알림',
        content: '풀지 않은 문제가 있습니다. 제출하시겠습니까?',
        cancelText: '계속 풀기',
        okText: '제출',
        onOk: () => {
          router.replace({
            query: { ...router.query, step: 'end' },
          });
        },
      });
    } else {
      modal.confirm({
        title: '알림',
        content: '제출하시겠습니까?',
        onOk: () => {
          router.replace({
            query: { ...router.query, step: 'end' },
          });
        },
      });
    }
  };

  return (
    <ObjectiveStudyTestModeFooterMobileBlock>
      <Pagination
        className="objective-study-footer-pagination"
        simple
        total={totalQuestions}
        pageSize={1}
        nextIcon={<Button size="large">다음</Button>}
        prevIcon={<Button size="large">이전</Button>}
        onChange={(page) => {
          router.replace({
            pathname: router.pathname,
            query: { ...router.query, p: page },
          });
        }}
        current={Number(page)}
      />
      {/* <Button type="primary" onClick={handleSubmit} size="large">
        제출
      </Button> */}
    </ObjectiveStudyTestModeFooterMobileBlock>
  );
};

export default ObjectiveStudyTestModeFooterMobile;
